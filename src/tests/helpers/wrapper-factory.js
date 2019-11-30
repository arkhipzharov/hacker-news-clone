import { shallowMount } from '@vue/test-utils';

export default function wrapperFactory(component) {
  return (mountOptions = {}) => {
    return shallowMount(component, mountOptions);
  };
}
