<!-- eslint-disable prettier/prettier -->
<template>
  <div class="article">
    <VCard>
      <a
        class="article__image"
        :href="data.url"
        target="_blank"
      >
        <img
          src="@/assets/img/decorations/articles/sky.jpg"
          alt="card image"
        >
      </a>
      <a
        class="article__title"
        :href="data.url"
        target="_blank"
      >{{ data.title }}</a>
      <div class="article__actions">
        <a class="article__actions-item">
          <VIcon :href="'heart'" />
          <span>{{ data.score }} points</span>
        </a>
        <a class="article__actions-item">
          <VIcon :href="'comment'" />
          <span>{{ data.descendants }} comments</span>
        </a>
      </div>
      <p class="article__text">
        {{ $stripHtml(data.text || '') | truncate(180) }}
      </p>
      <div class="article__by-and-date">
        <router-link
          class="article__by"
          :to="`/user/${data.by}`"
        >
          By <a>{{ data.by }}</a>
        </router-link>
        <div class="article__date">
          <VIcon :href="'calendar'" />
          <span>
            {{
              $moment(convertUnixTimestampToDate(data.time)).format('YYYY-MM-DD')
            }}
          </span>
        </div>
      </div>
      <a
        :href="data.url"
        target="_blank"
        class="article__button"
      >
        <div class="article__button-content">
          <span>READ MORE</span>
          <VIcon :href="'arrow-right-long'" />
        </div>
      </a>
    </VCard>
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import mixins from 'vue-typed-mixins';
  import convertUnixTimestampToDate from '@/mixins/convert-unix-timestamp-to-date';

  export default mixins(convertUnixTimestampToDate).extend({
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
  });
</script>

<style lang="scss">
  .article {
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

    &__text {
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
      margin-bottom: 10px;
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
