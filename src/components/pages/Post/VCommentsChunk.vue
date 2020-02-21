<!-- eslint-disable prettier/prettier -->
<template>
  <VTransition
    :name="'zoom'"
    isGroup
    class="comments-chunk"
  >
    <div
      v-for="data in children"
      :key="data.id"
      class="comments-chunk__branch"
    >
      <VCard
        class="comments-chunk__comment"
      >
        <template v-slot:header>
          <div
            v-if="data.by"
            class="comments-chunk__comment-header"
          >
            <div
              v-if="data.nestingLevel > 0"
              class="comments-chunk__comment-header-eyeballing-helper"
            ></div>
            By <router-link
              :to="`/user/${data.by}`"
              class="comments-chunk__comment-header-user-link"
            >
              {{ data.by }}
            </router-link>
          </div>
        </template>
        <template v-slot:default>
          {{ $stripHtml(data.text || '') }}
        </template>
      </VCard>
      <div
        v-if="data.children.length > 0"
        class="comments-chunk__nested-comments"
      >
        <div class="comments-chunk__nested-comments-ruler"></div>
        <!-- this component is global to allow recursion -->
        <VCommentsChunk :children="data.children" />
      </div>
    </div>
  </VTransition>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      children: {
        type: Array,
        required: true,
      },
    },
  });
</script>

<style lang="scss">
  .comments-chunk {
    .comments-chunk__comment {
      margin-bottom: 20px;
    }

    &__comment-header {
      position: relative;
      padding: 15px 20px;
      line-height: 19.2px;
      background-color: $bg-grey;
    }

    &__comment-header-eyeballing-helper {
      position: absolute;
      top: 50%;
      left: -24.5px;
      z-index: 1;
      width: 9px;
      height: 9px;
      background-color: $bg-orange;
      border: 3px solid $border-grey-light;
      border-radius: 50%;
      transform: translateY(-50%);
    }

    &__comment-header-user-link {
      color: $text-orange-pink;
    }

    &__nested-comments {
      position: relative;
      padding-left: 20px;
    }

    &__nested-comments-ruler {
      position: absolute;
      top: 0;
      left: 0;
      width: 6px;
      height: 100%;
      background-color: $bg-grey-light;
      border-radius: 9999px;
    }

    &__nested-comments-content {
      flex: 1 1 0;
      margin-left: 14px;
    }
  }
</style>
