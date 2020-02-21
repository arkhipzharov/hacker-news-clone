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
      <VCard
        v-if="user.about || (actionsData.length > 0 && false)"
        class="user__about"
      >
        <template>
          <span class="user__about-title">About me</span>
          <p class="user__about-text">
            {{ $stripHtml(user.about || '...') }}
          </p>
        </template>
      </VCard>
      <span class="user__actions-title">Recent Activity</span>
      <VTransition
        isGroup
        :name="'zoom'"
      >
        <VCard
          v-for="data in actionsData"
          :key="data.id"
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
      </VTransition>
      <TheInfiniteLoading
        :loadFun="loadActionsDataChunk"
        :noDataTextsData="{ noMore: 'activities', no: 'activity' }"
      />
    </div>
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import mixins from 'vue-typed-mixins';
  import resetFactory from '@/mixins/reset-factory';
  import resetDynamicRoute from '@/mixins/reset-dynamic-route';
  import scrollTopStartup from '@/mixins/scroll-top-startup';
  import unixToDate from '@/mixins/unix-to-date';
  import request from '@/ts/helpers/request';
  import isItemDataValid from '@/ts/helpers/is-item-data-valid';
  import ItemData, { UserData } from '@/ts/interfaces/api-data';
  import StateParam from '@/ts/interfaces/infinite-loading';
  import TheInfiniteLoading from '@/components/TheInfiniteLoading';

  interface CommentData extends ItemData {
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
    actionDataIds: number[];
    actionDataIdsChunked: number[][];
    loadedActionsDataChunksCount: number;
    isReEnteredPage: boolean;
    currentCommentParentData: ItemData;
  }

  const dataToReset: DataToReset = {
    user: {} as UserData,
    actionsData: [],
    actionDataIds: [],
    actionDataIdsChunked: [],
    loadedActionsDataChunksCount: 0,
    isReEnteredPage: false,
    currentCommentParentData: {} as ItemData,
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
      if (this.loadedActionsDataChunksCount > 0) {
        this.loadedActionsDataChunksCount = 0;
      }
      const username = this.user?.id;
      if (username) {
        this.isReEnteredPage = true;
        if (username !== this.$route.params.username) {
          this.reset();
          this.$evBus.$emit('re-render-infinite-loading-component');
        }
      }
    },
    methods: {
      async loadActionsDataChunk($state: StateParam) {
        const actionsData = this.actionsData;
        let actionDataIds = this.actionDataIds;
        if (!this.user?.id) {
          const username = this.$route.params.username;
          const userData: UserData = await request(`user/${username}.json`);
          this.user = userData;
          actionDataIds = userData.submitted;
        } else if (
          this.isReEnteredPage &&
          actionsData.length > 0 &&
          actionDataIds.length > 0
        ) {
          actionDataIds = actionDataIds.slice(
            actionDataIds.findIndex((id) => {
              return id === actionsData[actionsData.length - 1].id;
            }) + 1,
          );
        }
        this.actionDataIds = actionDataIds;
        if (actionDataIds.length === 0) {
          if (actionsData.length > 0) {
            $state.loaded();
          }
          $state.complete();
          return;
        }
        const actionDataIdsChunkSize = this.actionDataIdsChunkSize;
        const actionDataIdsChunked = actionDataIds.reduce(
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
        const loadedActionsDataChunksCount = this.loadedActionsDataChunksCount;
        let actionsDataChunk: (
          | CommentData
          | ItemData
          | null
          | undefined
        )[] = [];
        actionsDataChunk = await Promise.all(
          actionDataIdsChunked[
            actionDataIdsChunked.length > 1 ? loadedActionsDataChunksCount : 0
          ].map((id) => {
            return this.fetchActionData(id);
          }),
        );
        actionsDataChunk = actionsDataChunk.filter((data) => {
          return isItemDataValid(data);
        });
        if (actionsDataChunk.length > 0) {
          this.actionsData.push(
            ...(actionsDataChunk as (ItemData | CommentData)[]),
          );
        } else if (
          loadedActionsDataChunksCount <
          actionDataIdsChunked.length - 1
        ) {
          this.loadedActionsDataChunksCount++;
          await this.loadActionsDataChunk($state);
          return;
        }
        if (loadedActionsDataChunksCount < actionDataIdsChunked.length - 1) {
          this.loadedActionsDataChunksCount++;
          if (this.actionsData.length > 0) {
            $state.loaded();
          } else {
            $state.complete();
          }
        } else {
          if (this.actionsData.length > 0) {
            $state.loaded();
          }
          $state.complete();
        }
      },
      async fetchActionData(id: number) {
        const actionData: CommentData = await request(`item/${id}.json`);
        if (isItemDataValid(actionData)) {
          await this.fetchCommentParentPostData(actionData);
          const commentParentPostData = this.currentCommentParentData;
          if (commentParentPostData) {
            actionData.parentPostTitle = commentParentPostData.title!;
            actionData.parentPostId = commentParentPostData.id;
          }
          return actionData;
        }
      },
      async fetchCommentParentPostData(actionData: CommentData) {
        const commentParentId = actionData.parent;
        if (commentParentId) {
          const commentParentData: CommentData = await request(
            `item/${commentParentId}.json`,
          );
          if (isItemDataValid(commentParentData)) {
            await this.fetchCommentParentPostData(commentParentData);
          }
        } else {
          this.currentCommentParentData = actionData;
        }
      },
    },
  });
</script>

<style lang="scss">
  .user {
    flex: 1 1 0;

    &__account-info {
      display: flex;
      flex-direction: column;
      padding: 0 15px;
      background-color: $bg-orange-dark;
    }

    .user__avatar {
      margin: 55px 0 40px;
    }

    .user__about {
      // setting this to hide shadow from upper block
      position: relative;
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
      background-color: $bg-orange;
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

      &:last-child {
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
