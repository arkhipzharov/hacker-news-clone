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
  import resetFactory from '@/mixins/reset-factory';
  import resetDynamicRoute from '@/mixins/reset-dynamic-route';
  import isItemDataValid from '@/ts/helpers/is-item-data-valid';
  import request from '@/ts/helpers/request';
  import ItemData from '@/ts/interfaces/api-data';
  import StateParam from '@/ts/interfaces/infinite-loading';
  import TheInfiniteLoading from '@/components/TheInfiniteLoading';
  import RptWallPost from './RptWallPost';

  interface Data {
    postDataIdsChunkSize: number;
  }

  const data: Data = {
    postDataIdsChunkSize: 3,
  };

  interface DataToReset {
    postsData: ItemData[];
    postDataIdsChunked: number[][];
    wallPostsType: string;
    loadedPostsDataChunksCount: number;
    isReEnteredPage: boolean;
  }

  const dataToReset: DataToReset = {
    postsData: [],
    postDataIdsChunked: [],
    wallPostsType: '',
    loadedPostsDataChunksCount: 0,
    isReEnteredPage: false,
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
      if (wallPostsType) {
        this.isReEnteredPage = true;
        if (wallPostsType !== this.$route.params.wallPostsType) {
          this.reset();
          this.$evBus.$emit('re-render-infinite-loading-component');
        }
      }
    },
    methods: {
      async loadPostsDataChunk($state: StateParam) {
        let postDataIdsChunked = this.postDataIdsChunked;
        if (postDataIdsChunked.length === 0) {
          const wallPostsType = this.$route.params.wallPostsType;
          let postDataIds = await request(`${wallPostsType}stories.json`);
          const postsData = this.postsData;
          if (this.isReEnteredPage && postsData.length > 0) {
            postDataIds = postDataIds.slice(
              postDataIds.findIndex((id: number) => {
                return id === postsData[postsData.length - 1].id;
              }) + 1,
            );
          }
          this.wallPostsType = wallPostsType;
          const postDataIdsChunkSize = this.postDataIdsChunkSize;
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
          if (postDataIdsChunked.length === 0) {
            $state.complete();
            return;
          }
          this.postDataIdsChunked = postDataIdsChunked;
        }
        const loadedPostsDataChunksCount = this.loadedPostsDataChunksCount;
        let postsDataChunk: (ItemData | null)[] = [];
        postsDataChunk = await Promise.all(
          postDataIdsChunked[loadedPostsDataChunksCount].map((id) => {
            return request(`item/${id}.json`);
          }),
        );
        postsDataChunk = postsDataChunk.filter((data) => {
          return isItemDataValid(data);
        });
        if (postsDataChunk.length > 0) {
          this.postsData.push(...(postsDataChunk as ItemData[]));
        } else if (loadedPostsDataChunksCount < postDataIdsChunked.length - 1) {
          this.loadedPostsDataChunksCount++;
          await this.loadPostsDataChunk($state);
        }
        if (loadedPostsDataChunksCount < postDataIdsChunked.length - 1) {
          this.loadedPostsDataChunksCount++;
          if (this.postsData.length > 0) {
            $state.loaded();
          } else {
            $state.complete();
          }
        } else {
          if (this.postsData.length > 0) {
            $state.loaded();
          }
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
