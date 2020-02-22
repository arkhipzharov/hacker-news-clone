<!-- eslint-disable prettier/prettier -->
<template>
  <div class="post">
    <div class="post__inner">
      <VCard
        class="post__post card--responsive"
        :isUnderlineExist="false"
      >
        <a
          class="post__title"
          :href="data.url"
          target="_blank"
        >
          {{ data.title || '...' }}
        </a>
        <span class="post__url">{{ data.url }}</span>
        <VImage
          :href="data.url"
          :alt="'post image'"
        />
        <p
          v-if="data.text"
          class="post__text"
        >
          {{ $stripHtml(data.text) }}
        </p>
        <VButton
          v-if="data.url"
          class="post__go-to-original-button"
          :href="data.url"
        >
          ORIGINAL POST
        </VButton>
      </VCard>
      <VCard
        class="post__by card--comment-by"
        :isUnderlineExist="false"
      >
        <template v-slot:header>
          <div class="post__by-header">
            <router-link
              :to="`/user/${data.by}`"
              class="post__by-username"
            >
              {{ data.by || '...' }}
            </router-link>
            <span class="post__by-karma">
              {{ `Karma: ${userKarma || '...'}` }}
            </span>
          </div>
        </template>
        <template v-slot:default>
          <div class="post__by-bottom-space">
            <VAvatar class="post__by-avatar" />
          </div>
        </template>
      </VCard>
      <span class="post__comments-title">Comments</span>
      <div class="post__comments">
        <TheComments :children="commentsTreeData" />
        <TheInfiniteLoading
          :loadFun="loadCommentsTreeDataBranch"
          :noDataText="'comments'"
        />
      </div>
    </div>
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import mixins from 'vue-typed-mixins';
  import resetFactory from '@/mixins/reset-factory';
  import resetDynamicRoute from '@/mixins/reset-dynamic-route';
  import request from '@/ts/helpers/request';
  import scrollTopStartup from '@/mixins/scroll-top-startup';
  import ItemData, { UserData } from '@/ts/interfaces/api-data';
  import StateParam from '@/ts/interfaces/infinite-loading';
  import isItemDataValid from '@/ts/helpers/is-item-data-valid';
  import TheInfiniteLoading from '@/components/TheInfiniteLoading';
  import TheComments from './TheComments';

  interface CommentData extends ItemData {
    nestingLevel: number;
    children: CommentData[];
    // hardcoding index signature because interface cannot extend two interfaces
    [key: string]: any;
  }

  interface Data {
    resetMixinNoDataOptionFix: undefined;
  }

  const data: Data = {
    resetMixinNoDataOptionFix: undefined,
  };

  interface DataToReset {
    commentsTreeData: CommentData[];
    currentCommentsTreeDataBranchFlat: CommentData[];
    data: ItemData;
    userKarma: number;
    isReEnteredPage: boolean;
    commentNestingLevelAsyncCallStackFixCount: number;
    isLoadingComments: boolean;
    isLeftPage: boolean;
  }

  const dataToReset: DataToReset = {
    commentsTreeData: [],
    currentCommentsTreeDataBranchFlat: [],
    data: {} as ItemData,
    userKarma: 0,
    isReEnteredPage: false,
    commentNestingLevelAsyncCallStackFixCount: 0,
    isLoadingComments: false,
    isLeftPage: false,
  };

  export default mixins(
    resetFactory<DataToReset>(dataToReset),
    resetDynamicRoute,
    scrollTopStartup,
  ).extend({
    data() {
      return data;
    },
    components: {
      TheInfiniteLoading,
      TheComments,
    },
    async mounted() {
      if (this.isLeftPage) {
        // reset data for use in async functions execution to avoid errors
        this.isLeftPage = false;
        this.isLoadingComments = false;
        this.currentCommentsTreeDataBranchFlat = [];
        this.commentNestingLevelAsyncCallStackFixCount = 0;
      }
      const postId = this.data?.id?.toString();
      if (postId) {
        this.isReEnteredPage = true;
        if (postId !== this.$route.params.id) {
          this.reset();
          this.$evBus.$emit('re-render-infinite-loading-component');
        }
      }
    },
    beforeDestroy() {
      this.isLeftPage = true;
    },
    methods: {
      async loadCommentsTreeDataBranch($state: StateParam) {
        // if scrolling to bottom, infinite loading component triggers this
        // function second time and breaking things
        if (!this.isLoadingComments) {
          this.isLoadingComments = true;
          let postData = this.data;
          const commentsTreeData = this.commentsTreeData;
          if (!this.userKarma) {
            const postId = this.$route.params.id;
            postData = await request(`item/${postId}.json`);
            const userData: UserData = await request(
              `user/${postData.by}.json`,
            );
            this.userKarma = userData.karma;
          } else if (
            this.isReEnteredPage &&
            commentsTreeData.length > 0 &&
            postData.kids
          ) {
            let rootCommentDataIds = postData.kids;
            const lastRootCommentData = commentsTreeData
              .slice()
              .reverse()
              .find((data) => data.nestingLevel === 0)!;
            rootCommentDataIds = rootCommentDataIds.slice(
              rootCommentDataIds.findIndex((id: number) => {
                return id === lastRootCommentData.id;
              }) + 1,
            );
            postData.kids = rootCommentDataIds;
          }
          this.data = postData;
          if (postData.kids?.length! > 0) {
            await this.loadCommentsTreeDataBranchItemsRecursive(
              $state,
              postData,
            );
            this.commentNestingLevelAsyncCallStackFixCount = 0;
          } else {
            if (commentsTreeData.length > 0) {
              $state.loaded();
            }
            $state.complete();
          }
          this.isLoadingComments = false;
        }
      },
      async loadCommentsTreeDataBranchItemsRecursive(
        $state: StateParam,
        postOrCommentData: ItemData,
      ) {
        const kidCommentDataIds = postOrCommentData.kids;
        if (kidCommentDataIds && kidCommentDataIds.length > 0) {
          for (const id of kidCommentDataIds) {
            const kidCommentData: CommentData = await request(
              `item/${id}.json`,
            );
            let isNotPushingInvalidCommentData = false;
            if (!isItemDataValid(kidCommentData)) {
              if (kidCommentData?.kids) {
                kidCommentData.text = 'Deleted';
              } else {
                isNotPushingInvalidCommentData = true;
              }
            }
            if (!isNotPushingInvalidCommentData) {
              let commentNestingLevelAsyncCallStackFixCount = this
                .commentNestingLevelAsyncCallStackFixCount;
              if (commentNestingLevelAsyncCallStackFixCount > 8) {
                commentNestingLevelAsyncCallStackFixCount = 8;
              }
              kidCommentData.nestingLevel = commentNestingLevelAsyncCallStackFixCount;
              this.currentCommentsTreeDataBranchFlat.push(kidCommentData);
              // with async functions call stack must be empty before start,
              // and we can't get function stack trace in not deprecated
              // and efficient way
              this.commentNestingLevelAsyncCallStackFixCount++;
              await this.loadCommentsTreeDataBranchItemsRecursive(
                $state,
                kidCommentData,
              );
              if (this.isLeftPage) {
                // we load entire comments branch at once, so some async
                // functions can still run after leaving page, which leads to
                // "cannot read property '...' of undefined"
                break;
              }
              this.commentNestingLevelAsyncCallStackFixCount--;
            }
          }
        }
        if (this.commentNestingLevelAsyncCallStackFixCount === 1) {
          this.pushCommentDataToBranchRefreshLoadingState(
            $state,
            postOrCommentData,
          );
        }
      },
      pushCommentDataToBranchRefreshLoadingState(
        $state: StateParam,
        commentData: ItemData,
      ) {
        const rootCommentDataIds = this.data.kids!;
        const currentRootCommentDataInd = rootCommentDataIds.findIndex(
          (id) => id === commentData.id,
        );
        if (currentRootCommentDataInd !== -1) {
          const currentCommentsTreeDataBranch = this.convertFlatCommentsDataArrayToTree(
            this.currentCommentsTreeDataBranchFlat,
          );
          if (currentRootCommentDataInd < rootCommentDataIds.length - 1) {
            this.commentsTreeData.push(...currentCommentsTreeDataBranch);
            $state.loaded();
          } else {
            if (
              this.commentsTreeData.length > 0 ||
              (rootCommentDataIds.length === 1 && !commentData.kids)
            ) {
              this.commentsTreeData.push(...currentCommentsTreeDataBranch);
              $state.loaded();
            }
            $state.complete();
          }
          this.currentCommentsTreeDataBranchFlat = [];
        }
      },
      // https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript
      convertFlatCommentsDataArrayToTree(flatCommentsData: CommentData[]) {
        const map = {} as CommentData;
        const rootCommentsData: CommentData[] = [];
        let commentData = {} as CommentData;
        for (let i = 0; i < flatCommentsData.length; i += 1) {
          map[flatCommentsData[i].id] = i;
          flatCommentsData[i].children = [];
        }
        for (let i = 0; i < flatCommentsData.length; i += 1) {
          commentData = flatCommentsData[i];
          if (commentData.parent !== this.data.id) {
            flatCommentsData[map[commentData.parent!]].children.push(
              commentData,
            );
          } else {
            rootCommentsData.push(commentData);
          }
        }
        return rootCommentsData;
      },
    },
  });
</script>

<style lang="scss">
  .post {
    flex: 1 1 0;
    margin-top: 40px;

    &__inner {
      @include page-width-media;
    }

    .post__post {
      margin-bottom: 20px;
    }

    &__title {
      display: block;
      margin-bottom: 15px;
      color: $text-orange-pink;
      font-size: 36px;
      line-height: 43.2px;
    }

    &__url {
      display: block;
      margin-bottom: 40px;
      font-size: 15px;
    }

    &__text {
      margin-top: 40px;
      font-size: 15px;
      line-height: 26px;
    }

    .post__go-to-original-button {
      margin: 50px 0 10px;
    }

    .post__by {
      margin-bottom: 50px;

      .card__header {
        background-color: $bg-blue;
      }
    }

    &__by-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 214px;
    }

    &__by-username {
      margin-top: 40px;
      color: $text-white;
      font-size: 24px;
      line-height: 28.8px;
      text-align: center;
    }

    &__by-karma {
      font-size: 15px;
      line-height: 26px;
      text-align: center;
    }

    &__by-bottom-space {
      position: relative;
      height: 20px;
    }

    .post__by-avatar {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 120px;
      height: 120px;
      transform: translateX(-50%);
    }

    &__comments-title {
      display: block;
      margin-bottom: 30px;
      color: $text-orange-pink;
      font-size: 30px;
      line-height: 36px;
    }

    &__comments {
      display: flex;
      flex-direction: column;
    }
  }
</style>
