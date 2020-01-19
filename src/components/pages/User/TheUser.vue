<!-- eslint-disable prettier/prettier -->
<template>
  <div class="user">
    <div class="user__account-info">
      <div class="user__avatar">
        <img
          src="~@/assets/img/decorations/avatars/working-table.png"
          alt="user avatar"
        >
      </div>
      <span class="user__username">bknasmueller</span>
      <div class="user__karma-and-created-timestamp">
        <div class="user__karma-and-created-timestamp-item">
          <span>5535</span>
          <span>Karma</span>
        </div>
        <div class="user__karma-and-created-timestamp-item">
          <span>
            {{
              $moment(convertUnixTimestampToDate(1467966658)).format(
                'YYYY-MM-DD',
              )
            }}
          </span>
          <span>Created</span>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-enable -->

<script lang="ts">
  import mixins from 'vue-typed-mixins';
  import convertUnixTimestampToDate from '@/mixins/convert-unix-timestamp-to-date';

  export default mixins(convertUnixTimestampToDate).extend({});
</script>

<style lang="scss">
  .user {
    &__account-info {
      display: flex;
      flex-direction: column;
      padding: 0 15px;
      background-color: $block-orange-dark;
    }

    &__avatar {
      align-self: center;
      width: 160px;
      height: 160px;
      margin: 105px 0 40px;
      overflow: hidden;
      border: 3px solid $border-grey;
      border-radius: 50%;
      box-shadow: rgba($shadow, 0.14) 0 6px 10px 0,
        rgba($shadow, 0.12) 0 1px 18px 0, rgba($shadow, 0.2) 0 3px 5px -1px;

      > img {
        width: 100%;
        height: 100%;
      }
    }

    &__username {
      display: block;
      margin-bottom: 55px;
      color: $text-white;
      font-size: 34px;
      text-align: center;
    }

    &__karma-and-created-timestamp {
      display: flex;
      justify-content: space-around;
      padding: 20px 15px;
      background-color: $block-orange;
      box-shadow: rgba($shadow, 0.14) 0 2px 2px 0,
        rgba($shadow, 0.2) 0 3px 1px -2px, rgba($shadow, 0.12) 0 1px 5px 0;
    }

    &__karma-and-created-timestamp-item {
      > span {
        display: block;
        color: $text-white;
        text-align: center;
      }

      > span:first-child {
        margin-bottom: 18px;
        font-size: 24px;
      }
    }
  }
</style>
