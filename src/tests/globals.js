import Vue from 'vue';
import wrapperFactory from './helpers/wrapper-factory';
import bindEventBusEmits from './helpers/bind-event-bus-emits';

const globals = {
  Vue,
  wrapperFactory,
  bindEventBusEmits,
};

Object.keys(globals).forEach((name) => {
  global[name] = globals[name];
});
