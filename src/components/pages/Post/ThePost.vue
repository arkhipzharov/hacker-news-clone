<!-- eslint-disable prettier/prettier -->
<template>
  <div class="post">
    <VCard
      class="post__post"
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
      <VImage :href="data.url" />
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
      class="post__by card--post-by"
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
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import mixins from 'vue-typed-mixins';
  import request from '@/ts/helpers/request';
  import ItemData, { UserData } from '@/ts/interfaces/api-data';
  import resetFactory from '@/mixins/reset-factory';

  interface DataToReset {
    data: ItemData;
    userKarma: number;
  }

  const dataToReset: DataToReset = {
    data: {} as ItemData,
    userKarma: 0,
  };

  export default mixins(resetFactory(dataToReset)).extend({
    watch: {
      $route: {
        immediate: true,
        async handler() {
          this.reset();
          await this.loadPostData();
        },
      },
    },
    async mounted() {
      this.loadPostData();
    },
    methods: {
      async loadPostData() {
        const postId = this.$route.params.id;
        const postData: ItemData = await request(`item/${postId}.json`);
        const userData: UserData = await request(`user/${postData.by}.json`);
        this.data = postData;
        this.userKarma = userData.karma;
      },
    },
  });
</script>

<style lang="scss">
  .post {
    margin-top: 40px;
    padding: 0 15px;

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
    }

    &__by-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 214px;
      background-color: $block-blue;
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
  }
</style>
