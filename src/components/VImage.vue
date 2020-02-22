<!-- eslint-disable prettier/prettier -->
<template>
  <a
    class="image"
    @click.prevent="optionalHref"
  >
    <img
      src="@/assets/img/demo/posts/sky.jpg"
      :alt="alt"
    >
  </a>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import mixins from 'vue-typed-mixins';
  import optionalHref from '@/mixins/optional-href';

  export default mixins(optionalHref).extend({
    props: {
      alt: {
        type: String,
        required: true,
      },
    },
  });
</script>

<style lang="scss">
  .image {
    display: block;
    height: 170px;

    @media (min-width: $break-tablet) {
      height: 343px;
    }

    @media (min-width: $break-pc) {
      height: 400px;
    }

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
