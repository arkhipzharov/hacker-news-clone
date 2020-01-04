<!-- eslint-disable prettier/prettier -->
<template>
  <div class="card">
    <a class="card__image">
      <img
        src="@/assets/img/decorations/cards/sky.jpg"
        alt="sky"
      >
    </a>
    <a class="card__title">
      WiFi deauthentication attacks and home security
    </a>
    <div class="card__actions">
      <a class="card__actions-item">
        <VIcon :href="'heart'" />
        <span>183 points</span>
      </a>
      <a class="card__actions-item">
        <VIcon :href="'comment'" />
        <span>85 comments</span>
      </a>
    </div>
    <p class="card__description">
      I live in a large apartment complex (it's literally a city block big), so
      I spend a disproportionate amount of time walking down corridors. Recently
      one of my neighbours installed a Ring wireless…
    </p>
    <div class="card__by-and-date">
      <span class="card__by">By <a>edward</a></span>
      <div class="card__date">
        <VIcon :href="'calendar'" />
        <span>2019-12-27</span>
      </div>
    </div>
    <button class="card__button">
      <div class="card__button-content">
        <span>READ MORE</span>
        <VIcon :href="'arrow-right-long'" />
      </div>
    </button>
    <span class="card__underline-decorator"></span>
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({});
</script>

<style lang="scss">
  .card {
    position: relative;
    margin-bottom: 40px;
    padding: 20px 20px 35px;
    overflow: hidden;
    background-color: $block-grey-dark;
    border-radius: 3px;
    box-shadow: rgba($shadow, 0.14) 0 2px 2px 0,
      rgba($shadow, 0.2) 0 3px 1px -2px, rgba($shadow, 0.12) 0 1px 5px 0;

    &__image {
      height: 170px;
      margin-bottom: 40px;

      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__title {
      margin-bottom: 20px;
      color: $text-orange-pink;
      font-size: 24px;
      line-height: 28.8px;
    }

    &__actions {
      display: flex;
      margin-bottom: 15px;
    }

    &__actions-item {
      display: flex;
      align-items: center;

      &:first-child {
        margin-right: 10px;
      }

      > svg {
        width: 11.69px;
        height: 11.69px;
        margin-right: 5px;
        fill: $icon-blue;
      }

      > span {
        color: $text-orange-pink;
      }
    }

    &__description {
      margin-bottom: 50px;
      line-height: 26px;
    }

    &__by-and-date {
      display: flex;
      align-items: center;
      height: 26px;
      margin-bottom: 25px;
    }

    &__by {
      margin-right: 10px;

      > a:last-child {
        color: $text-orange-pink;
      }
    }

    &__date {
      display: flex;
      align-items: center;

      > svg {
        width: 11.25px;
        height: 11.25px;
        margin-right: 5px;
        fill: $icon-blue;
      }
    }

    &__button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 40px;
      background-color: $block-orange;
      border-radius: 2px;
      box-shadow: rgba($shadow, 0.14) 0 2px 2px 0,
        rgba($shadow, 0.2) 0 3px 1px -2px, rgba($shadow, 0.12) 0 1px 5px 0;
    }

    &__button-content {
      position: relative;

      > span {
        color: $text-white;
        font-size: 14px;
      }

      > svg {
        position: absolute;
        top: 50%;
        left: calc(100% + 12px);
        width: 13px;
        height: 13px;
        transform: translateY(-50%);
        fill: $text-white;
      }
    }

    &__underline-decorator {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: $block-orange;
    }
  }
</style>
