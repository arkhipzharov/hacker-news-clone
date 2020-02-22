<!-- eslint-disable prettier/prettier -->
<template>
  <div class="wall-post">
    <VCard class="wall-post__wall-post card--responsive">
      <VImage
        class="wall-post__image"
        :href="data.url"
        :alt="'wall post image'"
      />
      <a
        class="wall-post__title"
        :href="data.url"
        target="_blank"
      >
        {{ data.title }}
      </a>
      <div class="wall-post__actions">
        <router-link
          class="wall-post__actions-item"
          :to="`/post/${data.id}`"
        >
          <VIcon :href="'heart'" />
          <span>
            {{
              `
                ${data.score} ${
                  adoptWordEndingsToNumber(
                    data.score, ['point', 'points', 'points']
                  )
                }
              `
            }}
          </span>
        </router-link>
        <router-link
          v-if="data.descendants || data.descendants === 0"
          class="wall-post__actions-item"
          :to="`/post/${data.id}`"
        >
          <VIcon :href="'comment'" />
          <span>
            {{
              `
                ${data.descendants} ${
                  adoptWordEndingsToNumber(
                    data.descendants, ['comment', 'comments', 'comments'])
                }
              `
            }}
          </span>
        </router-link>
      </div>
      <p class="wall-post__text">
        {{ $stripHtml(data.text || '') | truncate(180) }}
      </p>
      <div class="wall-post__by-and-date">
        <span class="wall-post__by">
          By <router-link :to="`/user/${data.by}`">{{ data.by }}</router-link>
        </span>
        <div class="wall-post__date">
          <VIcon :href="'calendar'" />
          <span>
            {{
              $moment(unixToDate(data.time)).format('YYYY-MM-DD')
            }}
          </span>
        </div>
      </div>
      <VButton
        :href="data.url"
        class="wall-post__go-to-original-or-discussion-button"
      >
        ORIGINAL POST
      </VButton>
      <VButton
        :href="data.id"
        class="wall-post__go-to-original-or-discussion-button"
      >
        DISCUSSION
      </VButton>
    </VCard>
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import mixins from 'vue-typed-mixins';
  import unixToDate from '@/mixins/unix-to-date';

  export default mixins(unixToDate).extend({
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    methods: {
      // ru and en
      //
      // https://realadmin.ru/coding/sklonenie-na-javascript.html (ru)
      adoptWordEndingsToNumber(number: any, wordsWithAllEndings: string[]) {
        number = Math.abs(number) % 100;
        const n1 = number % 10;
        let index;
        if (number > 10 && number < 20) {
          index = 2;
        } else if (n1 > 1 && n1 < 5) {
          index = 1;
        } else if (n1 === 1) {
          index = 0;
        } else {
          index = 2;
        }
        return wordsWithAllEndings[index];
      },
    },
  });
</script>

<style lang="scss">
  .wall-post {
    .wall-post__wall-post {
      .card__body {
        font-size: 16px;
        line-height: 16px;
      }
    }

    .wall-post__image {
      margin-bottom: 40px;
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
        font-weight: 600;
      }
    }

    &__text {
      margin-bottom: 50px;
      font-size: 15px;
      line-height: 26px;
    }

    &__by-and-date {
      display: flex;
      align-items: center;
      height: 26px;
      margin-bottom: 13px;
    }

    &__by {
      margin-right: 10px;

      > a {
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

    .wall-post__go-to-original-or-discussion-button {
      margin-bottom: 10px;
    }

    &__underline-decorator {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: $bg-orange;
    }
  }
</style>
