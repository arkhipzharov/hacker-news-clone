<template>

<div class="container">
  <slot></slot>
</div>

</template>
<script>

export default {

};

</script>
<style lang="scss">

.container {
  flex: 1 1 0;
  display: flex;
  width: 100%;
  flex-direction: column;

  @media (min-width: $break-tablet) {
    max-width: 390px;
    margin: 0 auto;
  }
}

</style>