<!-- eslint-disable prettier/prettier -->
<template>
  <VPopup
    :isExist="isExist"
    :isUnderlineExist="false"
    class="about"
  >
    <template v-slot:header>
      <div class="about__header">About this project</div>
    </template>
    <template v-slot:default>
      <p class="about__text">
        This is a pet project trying to be like <a
          href="http://hacker-news.news"
          target="_blank"
        >
          hacker-news.news
        </a> which is using hacker news api introduced by <a
          href="https://news.ycombinator.com"
          target="_blank"
        >
          ycombinator
        </a>. Main features is that all edge cases except connection interrupt
        in data loading is covered and you can safely return to previous pages
        and continue exploring content
      </p>
      <p class="about__text">
        Github: <a
          href="https://github.com/shiftenko/hacker-news-clone"
          target="_blank"
        >
          github.com/shiftenko/hacker-news-clone
        </a>
      </p>
    </template>
  </VPopup>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      isExist: {
        type: Boolean,
        required: true,
      },
    },
  });
</script>

<style lang="scss">
  .about {
    .popup__close-button {
      svg {
        fill: $text-grey-light;
      }
    }

    .card__header {
      background-color: $bg-grey-dark;
    }

    &__header {
      display: block;
      padding: 30px 24px 0;
      color: $text-orange-pink;
      font-size: 24px;
      line-height: 26px;
    }

    &__text {
      font-size: 15px;
      line-height: 26px;

      > a {
        color: $text-orange-pink;
      }

      &:first-child {
        margin-bottom: 10px;
      }
    }
  }
</style>
