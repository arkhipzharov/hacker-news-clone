import Vue from 'vue';
import { Wrapper } from '@vue/test-utils';
import eventBus from '@/event-bus';

// for testing event bus, https://stackoverflow.com/a/51722343
export default function bindEventBusEmits(
  wrapper: Wrapper<Vue>,
  emitEventNames: string[],
) {
  emitEventNames.forEach((name) => {
    eventBus.$on(name, (data: object = {}) => {
      wrapper.vm.$emit(name, data);
    });
  });
}
