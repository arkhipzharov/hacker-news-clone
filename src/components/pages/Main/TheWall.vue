<!-- eslint-disable prettier/prettier -->
<template>
  <div class="wall">
    <VTransition
      isGroup
      :name="'zoom'"
      :duration="600"
      class="wall__inner"
    >
      <VWallPost
        v-for="data in postsData"
        :key="data.id"
        class="wall__post"
        :data="data"
      />
    </VTransition>
    <TheInfiniteLoading
      :loadFun="loadPostsDataChunk"
      :noDataText="'posts'"
    />
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
  import VWallPost from './VWallPost';

  interface Data {
    postDataIdsChunkSize: number;
  }

  const data: Data = {
    postDataIdsChunkSize: 3,
  };

  interface DataToReset {
    postsData: ItemData[];
    postDataIds: number[];
    postDataIdsChunked: number[][];
    wallPostsType: string;
    loadedPostsDataChunksCount: number;
    isReEnteredPage: boolean;
  }

  const dataToReset: DataToReset = {
    postsData: [],
    postDataIds: [],
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
      VWallPost,
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
        const postsData = this.postsData;
        let postDataIds = this.postDataIds;
        if (!this.wallPostsType) {
          const wallPostsType = this.$route.params.wallPostsType;
          this.wallPostsType = wallPostsType;
          postDataIds = await request(`${wallPostsType}stories.json`);
        } else if (
          this.isReEnteredPage &&
          postsData.length > 0 &&
          postDataIds.length > 0
        ) {
          postDataIds = postDataIds.slice(
            postDataIds.findIndex((id: number) => {
              return id === postsData[postsData.length - 1].id;
            }) + 1,
          );
        }
        this.postDataIds = postDataIds;
        if (postDataIds.length === 0) {
          if (postsData.length > 0) {
            $state.loaded();
          }
          $state.complete();
          return;
        }
        const postDataIdsChunkSize = this.postDataIdsChunkSize;
        let postDataIdsChunked = this.postDataIdsChunked;
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
        const loadedPostsDataChunksCount = this.loadedPostsDataChunksCount;
        let postsDataChunk: (ItemData | null)[] = [];
        postsDataChunk = await Promise.all(
          postDataIdsChunked[
            postDataIdsChunked.length > 1 ? loadedPostsDataChunksCount : 0
          ].map((id) => {
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
          return;
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

    &__inner {
      @include page-width-media;
    }

    .wall__post {
      margin-bottom: 40px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
