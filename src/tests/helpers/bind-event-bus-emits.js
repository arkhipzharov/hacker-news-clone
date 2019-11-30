import eventBus from '@/event-bus';

export default function bindEventBusEmits(wrapper, emitEventNames) {
  return emitEventNames.forEach((name) => {
    eventBus.$on(name, (data) => {
      wrapper.vm.$emit(name, data);
    });
  });
}
