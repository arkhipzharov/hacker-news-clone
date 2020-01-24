<!-- eslint-disable prettier/prettier -->
<template>
  <div class="articles">
    <RptArticle
      v-for="(data, index) in articlesData"
      :key="index"
      class="articles__article"
      :data="data"
    />
    <TheInfiniteLoading
      :itemsData="articlesData"
      :handler="loadArticlesDataChunk"
    />
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import mixins from 'vue-typed-mixins';
  import request from '@/ts/helpers/request';
  import RptArticle from '@/components/RptArticle';
  import TheInfiniteLoading from '@/components/TheInfiniteLoading';
  import resetFactory from '@/mixins/reset-factory';
  import ItemData from '@/ts/interfaces/api-data';

  interface Data {
    articleDataIdsChunkSize: number;
  }

  const data: Data = {
    articleDataIdsChunkSize: 3,
  };

  interface DataToReset {
    articlesData: ItemData[];
    articleDataIdsChunked: number[][];
    articlesDataChunkWithoutErrors: ItemData[];
    loadedArticlesDataChunksCount: number;
    articlesDataChunkErrorsNum: number;
    isArticlesDataLoaded: boolean;
  }

  const dataToReset: DataToReset = {
    articlesData: [],
    articleDataIdsChunked: [],
    articlesDataChunkWithoutErrors: [],
    loadedArticlesDataChunksCount: 0,
    articlesDataChunkErrorsNum: 0,
    isArticlesDataLoaded: false,
  };

  export default mixins(resetFactory(dataToReset)).extend({
    components: {
      RptArticle,
      TheInfiniteLoading,
    },
    data() {
      return data;
    },
    watch: {
      $route: {
        immediate: true,
        async handler() {
          if (this.articlesData.length > 0) {
            this.reset();
          }
        },
      },
    },
    methods: {
      async loadArticlesDataChunk($state: {
        loaded: () => void;
        complete: () => void;
      }) {
        if (!this.isArticlesDataLoaded) {
          const articleDataIdsChunkSize = this.articleDataIdsChunkSize;
          let articleDataIdsChunked = this.articleDataIdsChunked;
          if (articleDataIdsChunked.length === 0) {
            const articleDataType = this.$route.name!.toLowerCase();
            const articleDataIds = await request(
              `${articleDataType}stories.json`,
            );
            articleDataIdsChunked = articleDataIds.reduce(
              (ids: number[][], _id: number, i: number) => {
                const articleDataIdsChunk = articleDataIds.slice(
                  i * articleDataIdsChunkSize,
                  (i + 1) * articleDataIdsChunkSize,
                );
                if (articleDataIdsChunk.length > 0) {
                  ids.push(articleDataIdsChunk);
                }
                return ids;
              },
              [],
            );
            this.articleDataIdsChunked = articleDataIdsChunked;
          }
          const loadedArticlesDataChunksCount = this
            .loadedArticlesDataChunksCount;
          const articlesDataChunkErrorsNum = this.articlesDataChunkErrorsNum;
          let articlesDataChunk: ItemData[] = [];
          if (
            loadedArticlesDataChunksCount < articleDataIdsChunked.length &&
            articlesDataChunkErrorsNum === 0
          ) {
            articlesDataChunk = await Promise.all(
              articleDataIdsChunked[
                articlesDataChunkErrorsNum > 0
                  ? loadedArticlesDataChunksCount + 1
                  : loadedArticlesDataChunksCount
              ].reduce((proms: Promise<ItemData>[], id: number) => {
                if (articlesDataChunkErrorsNum > 0) {
                  if (proms.length < articlesDataChunkErrorsNum) {
                    proms.push(request(`item/${id}.json`));
                  }
                } else {
                  proms.push(request(`item/${id}.json`));
                }
                return proms;
              }, []),
            );
          }
          if (articlesDataChunkErrorsNum > 0) {
            this.articlesDataChunkErrorsNum = 0;
          }
          if (
            articlesDataChunk.some(
              (data) => data === null || data.deleted || data.dead,
            )
          ) {
            const articlesDataChunkWithoutErrors = articlesDataChunk.filter(
              (data) => data !== null && !data.deleted && !data.dead,
            );
            this.articlesDataChunkErrorsNum =
              articleDataIdsChunkSize - articlesDataChunkWithoutErrors.length;
            this.articlesDataChunkWithoutErrors = articlesDataChunkWithoutErrors;
            await this.loadArticlesDataChunk($state);
            return;
          }
          const articlesDataChunkWithoutErrors = this
            .articlesDataChunkWithoutErrors;
          this.articlesData.push(
            ...articlesDataChunkWithoutErrors,
            ...articlesDataChunk,
          );
          if (articlesDataChunkWithoutErrors.length > 0) {
            this.articlesDataChunkWithoutErrors = [];
          }
          if (
            loadedArticlesDataChunksCount <
            articleDataIdsChunked.length - 1
          ) {
            this.loadedArticlesDataChunksCount++;
            $state.loaded();
          } else {
            this.isArticlesDataLoaded = true;
            $state.loaded();
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
  .articles {
    margin-top: 40px;
    padding: 0 15px;

    > .articles__article {
      margin-bottom: 40px;

      &:nth-last-child(2) {
        margin-bottom: 0;
      }
    }
  }
</style>
