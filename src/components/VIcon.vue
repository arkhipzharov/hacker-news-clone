<template>

<svg :viewBox="viewBox">
  <!--
    на MDN написано, что испоьзование xlink:href не рекомендуется, поэтому
    используется href
  -->
  <use :href="'#' + href"></use>
</svg>

</template>
<script>

export default {
  props: {
    viewBox: {
      type: String,
      required: false,
      default: '0 0 1 1',
    },
    href: {
      type: String,
      required: true,
    },
  },
};

</script>