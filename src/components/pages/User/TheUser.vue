<!-- eslint-disable prettier/prettier -->
<template>
  <div class="user">
    <div class="user__account-info">
      <div class="user__avatar">
        <img
          src="~@/assets/img/decorations/avatars/working-table.png"
          alt="user avatar"
        >
      </div>
      <span class="user__username">{{ user.id }}</span>
      <div class="user__karma-and-created-timestamp">
        <div class="user__karma-and-created-timestamp-item">
          <span>{{ user.karma }}</span>
          <span>Karma</span>
        </div>
        <div class="user__karma-and-created-timestamp-item">
          <span>
            {{
              $moment(convertUnixTimestampToDate(user.created)).format(
                'YYYY-MM-DD',
              )
            }}
          </span>
          <span>Created</span>
        </div>
      </div>
    </div>
    <span class="user__actions-title">Recent Activity</span>
    <div class="user__actions">
      <VCard
        v-for="(data, index) in actionsData"
        :key="index"
        :class="['user__action', { 'card--purple': data.type !== 'comment' }]"
        :headerText="`
          ${data.type === 'comment' ? 'Commented: ' : 'Submitted: '}
          \'\'${data.type === 'comment' ? data.parentArticleTitle : data.title}\'\'
        `"
      >
        {{ $stripHtml(data.text || '') | truncate(180) }}
      </VCard>
      <TheInfiniteLoading
        :itemsData="actionsData"
        :handler="loadActionsDataChunk"
      />
    </div>
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import mixins from 'vue-typed-mixins';
  import request from '@/ts/helpers/request';
  import TheInfiniteLoading from '@/components/TheInfiniteLoading';
  import resetFactory from '@/mixins/reset-factory';
  import convertUnixTimestampToDate from '@/mixins/convert-unix-timestamp-to-date';
  import ItemData, { UserData } from '@/ts/interfaces/api-data';

  interface ActionData extends ItemData {
    parentArticleTitle: string;
  }

  interface Data {
    actionDataIdsChunkSize: number;
    user: UserData;
  }

  const data: Data = {
    actionDataIdsChunkSize: 3,
    user: {} as UserData,
  };

  interface DataToReset {
    actionsData: ItemData[];
    actionDataIdsChunked: number[][];
    actionsDataChunkWithoutErrors: ItemData[];
    loadedActionsDataChunksCount: number;
    actionsDataChunkErrorsNum: number;
    isActionsDataLoaded: boolean;
  }

  const dataToReset: DataToReset = {
    actionsData: [],
    actionDataIdsChunked: [],
    actionsDataChunkWithoutErrors: [],
    loadedActionsDataChunksCount: 0,
    actionsDataChunkErrorsNum: 0,
    isActionsDataLoaded: false,
  };

  export default mixins(
    convertUnixTimestampToDate,
    resetFactory(dataToReset),
  ).extend({
    components: {
      TheInfiniteLoading,
    },
    data() {
      return data;
    },
    watch: {
      $route: {
        immediate: true,
        async handler() {
          if (this.actionsData.length > 0) {
            this.reset();
          }
        },
      },
    },
    methods: {
      async loadActionsDataChunk($state: {
        loaded: () => void;
        complete: () => void;
      }) {
        if (!this.isActionsDataLoaded) {
          const actionDataIdsChunkSize = this.actionDataIdsChunkSize;
          let actionDataIdsChunked = this.actionDataIdsChunked;
          if (actionDataIdsChunked.length === 0) {
            const username = this.$route.params.username;
            const userData: UserData = await request(`user/${username}.json`);
            this.user = userData;
            const actionDataIds = userData.submitted;
            actionDataIdsChunked = actionDataIds.reduce(
              (ids: number[][], _id: number, i: number) => {
                const actionDataIdsChunk = actionDataIds.slice(
                  i * actionDataIdsChunkSize,
                  (i + 1) * actionDataIdsChunkSize,
                );
                if (actionDataIdsChunk.length > 0) {
                  ids.push(actionDataIdsChunk);
                }
                return ids;
              },
              [],
            );
            this.actionDataIdsChunked = actionDataIdsChunked;
          }
          const loadedActionsDataChunksCount = this
            .loadedActionsDataChunksCount;
          const actionsDataChunkErrorsNum = this.actionsDataChunkErrorsNum;
          let actionsDataChunk: ItemData[] = [];
          if (
            loadedActionsDataChunksCount < actionDataIdsChunked.length &&
            actionsDataChunkErrorsNum === 0
          ) {
            actionsDataChunk = await Promise.all(
              actionDataIdsChunked[
                actionsDataChunkErrorsNum > 0
                  ? loadedActionsDataChunksCount + 1
                  : loadedActionsDataChunksCount
              ].reduce((proms: Promise<ItemData | null>[], id: number) => {
                if (actionsDataChunkErrorsNum > 0) {
                  if (proms.length < actionsDataChunkErrorsNum) {
                    proms.push(this.fetchActionData(id));
                  }
                } else {
                  proms.push(this.fetchActionData(id));
                }
                return proms;
              }, []),
            );
          }
          if (actionsDataChunkErrorsNum > 0) {
            this.actionsDataChunkErrorsNum = 0;
          }
          if (
            actionsDataChunk.some(
              (data) => data === null || data.deleted || data.dead,
            )
          ) {
            const actionsDataChunkWithoutErrors = actionsDataChunk.filter(
              (data) => data !== null && !data.deleted && !data.dead,
            );
            this.actionsDataChunkErrorsNum =
              actionDataIdsChunkSize - actionsDataChunkWithoutErrors.length;
            this.actionsDataChunkWithoutErrors = actionsDataChunkWithoutErrors;
            await this.loadActionsDataChunk($state);
            return;
          }
          const actionsDataChunkWithoutErrors = this
            .actionsDataChunkWithoutErrors;
          this.actionsData.push(
            ...actionsDataChunkWithoutErrors,
            ...actionsDataChunk,
          );
          if (actionsDataChunkWithoutErrors.length > 0) {
            this.actionsDataChunkWithoutErrors = [];
          }
          if (loadedActionsDataChunksCount < actionDataIdsChunked.length - 1) {
            this.loadedActionsDataChunksCount++;
            $state.loaded();
          } else {
            this.isActionsDataLoaded = true;
            $state.loaded();
            $state.complete();
          }
        } else {
          $state.loaded();
          $state.complete();
        }
      },
      async fetchActionData(id: number) {
        const actionData: ActionData = await request(`item/${id}.json`);
        if (actionData !== null) {
          const commentParentId = actionData.parent;
          if (commentParentId) {
            const commentParentData: ActionData = await request(
              `item/${commentParentId}.json`,
            );
            if (commentParentData !== null) {
              const commentParentArticleData = await this.fetchCommentParentArticleData(
                commentParentData,
              );
              if (
                commentParentArticleData !== null &&
                commentParentArticleData !== undefined
              ) {
                actionData.parentArticleTitle = commentParentArticleData.title!;
              } else {
                return null;
              }
            } else {
              return null;
            }
          }
        }
        return actionData;
      },
      async fetchCommentParentArticleData(commentParentData: ActionData) {
        const commentParentId = commentParentData.parent;
        if (commentParentId) {
          commentParentData = await request(`item/${commentParentId}.json`);
          if (commentParentData !== null) {
            await this.fetchCommentParentArticleData(commentParentData);
            return;
          }
          return null;
        }
        return commentParentData;
      },
    },
  });
</script>

<style lang="scss">
  .user {
    &__account-info {
      display: flex;
      flex-direction: column;
      padding: 0 15px;
      background-color: $block-orange-dark;
    }

    &__avatar {
      align-self: center;
      width: 160px;
      height: 160px;
      margin: 55px 0 40px;
      overflow: hidden;
      border: 3px solid $border-grey;
      border-radius: 50%;
      box-shadow: rgba($shadow, 0.14) 0 6px 10px 0,
        rgba($shadow, 0.12) 0 1px 18px 0, rgba($shadow, 0.2) 0 3px 5px -1px;

      > img {
        width: 100%;
        height: 100%;
      }
    }

    &__username {
      display: block;
      margin-bottom: 55px;
      color: $text-white;
      font-size: 36px;
      text-align: center;
    }

    &__karma-and-created-timestamp {
      display: flex;
      justify-content: space-around;
      padding: 20px 15px;
      background-color: $block-orange;
      box-shadow: rgba($shadow, 0.14) 0 2px 2px 0,
        rgba($shadow, 0.2) 0 3px 1px -2px, rgba($shadow, 0.12) 0 1px 5px 0;
    }

    &__karma-and-created-timestamp-item {
      > span {
        display: block;
        color: $text-white;
        text-align: center;
      }

      > span:first-child {
        margin-bottom: 18px;
        font-size: 24px;
      }
    }

    &__actions-title {
      display: block;
      margin: 25px 0 30px;
      color: $text-orange-pink;
      font-size: 36px;
      text-align: center;
    }

    &__actions {
      padding: 0 15px;
    }

    .user__action {
      margin-bottom: 40px;

      &:nth-last-child(2) {
        margin-bottom: 0;
      }
    }
  }
</style>
