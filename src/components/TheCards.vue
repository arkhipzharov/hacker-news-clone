<!-- eslint-disable prettier/prettier -->
<template>
  <div class="cards">
    <RptCard
      v-for="(data, index) in cardsData"
      :key="index"
      :data="data"
    />
    <!--
      :key for re-rendering component to show loading icon when changing page
    -->
    <TheInfiniteLoading
      :key="cardsData.length > 0"
      :handler="loadCardsDataPortion"
    />
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import mixins from 'vue-typed-mixins';
  import TheContainer from '@/components/TheContainer';
  import RptCard from '@/components/RptCard';
  import request from '@/ts/helpers';
  import TheInfiniteLoading from '@/components/TheInfiniteLoading';
  import resetFactory from '@/mixins/reset-factory';

  interface Data {
    showMoreCardsNum: number;
  }

  interface DataToReset {
    cardsData: any[];
    cardDataIds: number[];
    showMoreCardsCount: number;
    isLoadedCardsData: boolean;
  }

  export default mixins(
    resetFactory({
      cardsData: [],
      cardDataIds: [],
      showMoreCardsCount: 0,
      isLoadedCardsData: false,
    }),
  ).extend({
    components: {
      TheContainer,
      RptCard,
      TheInfiniteLoading,
    },
    data(): Data {
      return {
        showMoreCardsNum: 3,
      };
    },
    watch: {
      $route: {
        immediate: true,
        async handler() {
          if (this.cardsData.length > 0) {
            this.reset();
            await this.loadCardsDataPortion();
          }
        },
      },
    },
    methods: {
      async loadCardsDataPortion($state?: any) {
        if (this.cardDataIds.length === 0) {
          const cardDataType = this.$route.name!.toLowerCase();
          this.cardDataIds = await request(`${cardDataType}stories.json`);
        }
        if (!this.isLoadedCardsData) {
          const cardsDataPortionProms: Promise<object>[] = [];
          const showMoreCardsCount = this.showMoreCardsCount;
          const cardDataIds = this.cardDataIds;
          const showMoreCardsNum = this.showMoreCardsNum;
          for (let i = 0; i < showMoreCardsNum; i++) {
            if (
              showMoreCardsCount < this.cardsNumDivideByShowMoreCardsNumRound()
            ) {
              cardsDataPortionProms.push(
                request(
                  `item/${
                    cardDataIds[i + showMoreCardsCount * showMoreCardsNum]
                  }.json`,
                ),
              );
            } else if (
              cardDataIds.length -
                this.cardsNumDivideByShowMoreCardsNumRound() *
                  showMoreCardsNum >
              i
            ) {
              cardsDataPortionProms.push(
                request(
                  `item/${
                    cardDataIds[i + showMoreCardsCount * showMoreCardsNum]
                  }.json`,
                ),
              );
            }
          }
          const cardsDataPortion = await Promise.all(cardsDataPortionProms);
          this.cardsData.push(...cardsDataPortion);
          if (
            showMoreCardsCount < this.cardsNumDivideByShowMoreCardsNumRound()
          ) {
            this.showMoreCardsCount++;
            if ($state) {
              $state.loaded();
            }
          } else {
            this.isLoadedCardsData = true;
            if ($state) {
              $state.complete();
            }
          }
        }
      },
      cardsNumDivideByShowMoreCardsNumRound(): number {
        return Number(
          (this.cardDataIds.length / this.showMoreCardsNum)
            .toFixed(1)
            .split('.')[0],
        );
      },
    },
  });
</script>

<style lang="scss">
  .cards {
    margin-top: 90px;
    padding: 0 15px;
  }
</style>
