<!-- eslint-disable prettier/prettier -->
<template>
  <div class="wall">
    <RptWallPost
      v-for="(data, index) in postsData"
      :key="index"
      class="wall__post"
      :data="data"
    />
    <TheInfiniteLoading :loadFun="loadPostsDataChunk" />
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import mixins from 'vue-typed-mixins';
  import TheInfiniteLoading from '@/components/TheInfiniteLoading';
  import RptWallPost from './RptWallPost';
  import resetFactory from '@/mixins/reset-factory';
  import resetDynamicRoute from '@/mixins/reset-dynamic-route';
  import isItemDataInvalid from '@/ts/helpers/is-item-data-invalid';
  import request from '@/ts/helpers/request';
  import ItemData from '@/ts/interfaces/api-data';

  interface Data {
    postDataIdsChunkSize: number;
  }

  const data: Data = {
    postDataIdsChunkSize: 3,
  };

  interface DataToReset {
    postsData: ItemData[];
    postDataIdsChunked: number[][];
    postsDataChunkWithoutErrors: ItemData[];
    wallPostsType: string;
    loadedPostsDataChunksCount: number;
    postsDataChunkErrorsNum: number;
    isPostsDataLoaded: boolean;
  }

  const dataToReset: DataToReset = {
    postsData: [],
    postDataIdsChunked: [],
    postsDataChunkWithoutErrors: [],
    wallPostsType: '',
    loadedPostsDataChunksCount: 0,
    postsDataChunkErrorsNum: 0,
    isPostsDataLoaded: false,
  };

  export default mixins(
    resetFactory<DataToReset>(dataToReset),
    resetDynamicRoute,
  ).extend({
    components: {
      RptWallPost,
      TheInfiniteLoading,
    },
    data() {
      return data;
    },
    mounted() {
      const wallPostsType = this.wallPostsType;
      if (wallPostsType && wallPostsType !== this.$route.params.wallPostsType) {
        this.reset();
        this.$evBus.$emit('re-render-infinite-loading-component');
      }
    },
    methods: {
      async loadPostsDataChunk($state: {
        loaded: () => void;
        complete: () => void;
      }) {
        if (!this.isPostsDataLoaded) {
          const postDataIdsChunkSize = this.postDataIdsChunkSize;
          let postDataIdsChunked = this.postDataIdsChunked;
          if (postDataIdsChunked.length === 0) {
            const wallPostsType = this.$route.params.wallPostsType;
            const postDataIds = await request(`${wallPostsType}stories.json`);
            this.wallPostsType = wallPostsType;
            postDataIdsChunked = postDataIds.reduce(
              (ids: number[][], _id: number, i: number) => {
                const postDataIdsChunk = postDataIds.slice(
                  i * postDataIdsChunkSize,
                  (i + 1) * postDataIdsChunkSize,
                );
                if (postDataIdsChunk.length > 0) {
                  ids.push(postDataIdsChunk);
                }
                return ids;
              },
              [],
            );
            this.postDataIdsChunked = postDataIdsChunked;
          }
          const loadedPostsDataChunksCount = this.loadedPostsDataChunksCount;
          const postsDataChunkErrorsNum = this.postsDataChunkErrorsNum;
          let postsDataChunk: (ItemData | null)[] = [];
          if (
            loadedPostsDataChunksCount < postDataIdsChunked.length &&
            postsDataChunkErrorsNum === 0
          ) {
            postsDataChunk = await Promise.all(
              postDataIdsChunked[
                postsDataChunkErrorsNum > 0
                  ? loadedPostsDataChunksCount + 1
                  : loadedPostsDataChunksCount
              ].reduce((proms: Promise<ItemData | null>[], id: number) => {
                if (postsDataChunkErrorsNum > 0) {
                  if (proms.length < postsDataChunkErrorsNum) {
                    proms.push(request(`item/${id}.json`));
                  }
                } else {
                  proms.push(request(`item/${id}.json`));
                }
                return proms;
              }, []),
            );
          }
          if (postsDataChunkErrorsNum > 0) {
            this.postsDataChunkErrorsNum = 0;
          }
          if (postsDataChunk.some(isItemDataInvalid())) {
            const postsDataChunkWithoutErrors = postsDataChunk.filter(
              isItemDataInvalid(true),
            );
            this.postsDataChunkErrorsNum =
              postDataIdsChunkSize - postsDataChunkWithoutErrors.length;
            this.postsDataChunkWithoutErrors = postsDataChunkWithoutErrors as ItemData[];
            await this.loadPostsDataChunk($state);
            return;
          }
          const postsDataChunkWithoutErrors = this.postsDataChunkWithoutErrors;
          this.postsData.push(
            ...postsDataChunkWithoutErrors,
            ...(postsDataChunk as ItemData[]),
          );
          if (postsDataChunkWithoutErrors.length > 0) {
            this.postsDataChunkWithoutErrors = [];
          }
          if (loadedPostsDataChunksCount < postDataIdsChunked.length - 1) {
            this.loadedPostsDataChunksCount++;
            $state.loaded();
          } else {
            this.isPostsDataLoaded = true;
            if (this.postsData.length > 0) {
              $state.loaded();
            }
            $state.complete();
          }
        } else {
          $state.loaded();
          $state.complete();
        }
      },
    },
  });
</script>

<style lang="scss">
  .wall {
    margin-top: 40px;
    padding: 0 15px;

    > .wall__post {
      margin-bottom: 40px;

      &:nth-last-child(2) {
        margin-bottom: 0;
      }
    }
  }
</style>
