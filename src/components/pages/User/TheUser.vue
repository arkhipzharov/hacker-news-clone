<!-- eslint-disable prettier/prettier -->
<template>
  <div class="user">
    <div class="user__account-info">
      <VAvatar class="user__avatar" />
      <span class="user__username">{{ user && user.id || '...' }}</span>
      <div class="user__karma-and-created-timestamp">
        <div class="user__karma-and-created-timestamp-item">
          <span>{{ user.karma || '...' }}</span>
          <span>Karma</span>
        </div>
        <div class="user__karma-and-created-timestamp-item">
          <span>
            {{
              user.created
                ? $moment(unixToDate(user.created)).format('YYYY-MM-DD')
                : '...'
            }}
          </span>
          <span>Created</span>
        </div>
      </div>
    </div>
    <div class="user__inner">
      <VCard class="user__about">
        <template v-if="user.about || (actionsData.length > 0 && false)">
          <span class="user__about-title">About me</span>
          <p class="user__about-text">
            {{ $stripHtml(user.about || '...') }}
          </p>
        </template>
      </VCard>
      <span class="user__actions-title">Recent Activity</span>
      <VCard
        v-for="(data, index) in actionsData"
        :key="index"
        :class="[
          'user__action', { 'card--submitted': data.type !== 'comment' }
        ]"
      >
        <template v-slot:header>
          <router-link
            class="user__action-header"
            :to="
              `/post/${
                (data.type !== 'comment' && data.id) || data.parentPostId
              }`
            "
          >
            {{
              `
                ${data.type === 'comment' ? 'Commented: ' : 'Submitted: '}
                "${
                data.type === 'comment' ? data.parentPostTitle : data.title
              }"
              `
            }}
          </router-link>
        </template>
        <template v-slot:default>
          {{ $stripHtml(data.text || '') | truncate(180) }}
        </template>
      </VCard>
      <TheInfiniteLoading :loadFun="loadActionsDataChunk" />
    </div>
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import mixins from 'vue-typed-mixins';
  import TheInfiniteLoading from '@/components/TheInfiniteLoading';
  import resetFactory from '@/mixins/reset-factory';
  import resetDynamicRoute from '@/mixins/reset-dynamic-route';
  import scrollTopStartup from '@/mixins/scroll-top-startup';
  import unixToDate from '@/mixins/unix-to-date';
  import request from '@/ts/helpers/request';
  import isItemDataInvalid from '@/ts/helpers/is-item-data-invalid';
  import ItemData, { UserData } from '@/ts/interfaces/api-data';

  interface ActionData extends ItemData {
    parentPostTitle: string;
    parentPostId: number;
  }

  interface Data {
    actionDataIdsChunkSize: number;
  }

  const data: Data = {
    actionDataIdsChunkSize: 3,
  };

  interface DataToReset {
    user: UserData;
    actionsData: ItemData[];
    actionDataIdsChunked: number[][];
    actionsDataChunkWithoutErrors: ItemData[];
    loadedActionsDataChunksCount: number;
    actionsDataChunkErrorsNum: number;
    isActionsDataLoaded: boolean;
  }

  const dataToReset: DataToReset = {
    user: {} as UserData,
    actionsData: [],
    actionDataIdsChunked: [],
    actionsDataChunkWithoutErrors: [],
    loadedActionsDataChunksCount: 0,
    actionsDataChunkErrorsNum: 0,
    isActionsDataLoaded: false,
  };

  export default mixins(
    resetFactory<DataToReset>(dataToReset),
    resetDynamicRoute,
    scrollTopStartup,
    unixToDate,
  ).extend({
    components: {
      TheInfiniteLoading,
    },
    data() {
      return data;
    },
    mounted() {
      const username = this.user?.id;
      if (username && username !== this.$route.params.username) {
        this.reset();
        this.$evBus.$emit('re-render-infinite-loading-component');
      }
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
          let actionsDataChunk: (ItemData | null)[] = [];
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
          if (actionsDataChunk.some(isItemDataInvalid())) {
            const actionsDataChunkWithoutErrors = actionsDataChunk.filter(
              isItemDataInvalid(true),
            );
            this.actionsDataChunkErrorsNum =
              actionDataIdsChunkSize - actionsDataChunkWithoutErrors.length;
            this.actionsDataChunkWithoutErrors = actionsDataChunkWithoutErrors as ItemData[];
            await this.loadActionsDataChunk($state);
            return;
          }
          const actionsDataChunkWithoutErrors = this
            .actionsDataChunkWithoutErrors;
          const actionsData = this.actionsData;
          actionsData.push(
            ...actionsDataChunkWithoutErrors,
            ...(actionsDataChunk as ItemData[]),
          );
          this.actionsData = actionsData;
          if (actionsDataChunkWithoutErrors.length > 0) {
            this.actionsDataChunkWithoutErrors = [];
          }
          if (loadedActionsDataChunksCount < actionDataIdsChunked.length - 1) {
            this.loadedActionsDataChunksCount++;
            $state.loaded();
          } else {
            this.isActionsDataLoaded = true;
            if (this.actionsData.length > 0) {
              $state.loaded();
            }
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
              const commentParentPostData = await this.fetchCommentParentPostData(
                commentParentData,
              );
              if (
                commentParentPostData !== null &&
                commentParentPostData !== undefined
              ) {
                actionData.parentPostTitle = commentParentPostData.title!;
                actionData.parentPostId = commentParentPostData.id;
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
      async fetchCommentParentPostData(commentParentData: ActionData) {
        const commentParentId = commentParentData.parent;
        if (commentParentId) {
          commentParentData = await request(`item/${commentParentId}.json`);
          if (commentParentData !== null) {
            await this.fetchCommentParentPostData(commentParentData);
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

    .user__avatar {
      margin: 55px 0 40px;
    }

    .user__about {
      border-radius: 0 0 3px 3px;
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
      align-items: center;
      justify-content: space-around;
      padding: 20px 15px;
      background-color: $block-orange;
      border-radius: 3px 3px 0 0;
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

      > span:last-child {
        font-size: 15px;
      }
    }

    &__inner {
      padding: 0 15px;
    }

    &__about-title {
      display: block;
      margin-bottom: 15px;
      color: $text-orange-pink;
      font-size: 30px;
    }

    &__about-text {
      font-size: 15px;
      line-height: 26px;
    }

    &__actions-title {
      display: block;
      margin: 25px 0 30px;
      color: $text-orange-pink;
      font-size: 36px;
      text-align: center;
    }

    .user__action {
      margin-bottom: 40px;

      &:nth-last-child(2) {
        margin-bottom: 0;
      }
    }

    &__action-header {
      display: block;
      padding: 15px 20px;
      color: $text-white;
      line-height: 20px;
    }
  }
</style>
