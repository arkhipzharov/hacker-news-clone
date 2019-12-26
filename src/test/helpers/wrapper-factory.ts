import Vue, { ComponentOptions } from 'vue';
import { shallowMount } from '@vue/test-utils';

// no need to specify component name in shallowMount every time with it
//
// https://vuejs.org/v2/cookbook/unit-testing-vue-components.html#Real-World-Example
export default function wrapperFactory(component: ComponentOptions<Vue>) {
  return (mountOptions: object = {}) => {
    return shallowMount(component, mountOptions);
  };
}
