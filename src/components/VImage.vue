<!-- eslint-disable prettier/prettier -->
<template>
  <a
    class="image"
    @click.prevent="optionalHref"
  >
    <img
      src="@/assets/img/decorations/posts/sky.jpg"
      alt="post image"
    >
  </a>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import mixins from 'vue-typed-mixins';
  import optionalHref from '@/mixins/optional-href';

  export default mixins(optionalHref).extend({});
</script>

<style lang="scss">
  .image {
    display: block;
    height: 170px;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
