// in separate file because imported for regular code and tests
//
// https://medium.com/@andrejsabrickis/https-medium-com-andrejsabrickis-create-simple-eventbus-to-communicate-between-vue-js-components-cdc11cd59860

import Vue from 'vue';

const eventBus = new Vue();

export default eventBus;
