// this is example of how unit test should look
import Vue, { VueConstructor } from 'vue';
import { createLocalVue } from '@vue/test-utils';
import { Plugin as fragment } from 'vue-fragment';
import TheHeader from './TheHeader.vue';
import TheMenu from './TheMenu.vue';

const eventBus = new Vue();

// https://forum.vuejs.org/t/how-to-mock-event-bus-in-vue-test-utils/22815/5
const prototypeHelpers = {
  install(v: VueConstructor) {
    v.prototype.$evBus = eventBus;
  },
};

const localVue = createLocalVue();

localVue.use(prototypeHelpers);
localVue.use(fragment);

const factory = global.h.wrapperFactory(TheHeader);

describe('TheHeader', () => {
  let wrapper;

  test('calls function when click toggle menu button', () => {
    const toggleMenu = jest.fn();
    wrapper = factory({
      localVue,
      stubs: ['router-link'],
      methods: {
        toggleMenu,
      },
    });

    wrapper.find('.header__toggle-menu-button').trigger('click');

    expect(toggleMenu).toHaveBeenCalled();
  });

  test('triggers clickaway directive when click outside of menu', () => {
    const onClickaway = jest.fn();
    wrapper = factory({
      localVue,
      stubs: ['router-link'],
      directives: {
        onClickaway,
      },
    });

    wrapper.find('.header').trigger('click');

    expect(onClickaway).toHaveBeenCalled();
  });

  test('triggers clickaway directive when click inside of menu', () => {
    const onClickaway = jest.fn();
    wrapper = factory({
      localVue,
      stubs: ['router-link'],
      directives: {
        onClickaway,
      },
    });

    wrapper.find(TheMenu).trigger('click');

    expect(onClickaway).toHaveBeenCalled();
  });

  test('triggers clickaway directive when click toggle menu button', () => {
    const onClickaway = jest.fn();
    wrapper = factory({
      localVue,
      stubs: ['router-link'],
      directives: {
        onClickaway,
      },
    });

    wrapper.find('.header__toggle-menu-button').trigger('click');

    expect(onClickaway).toHaveBeenCalled();
  });

  test('adds class to menu when click toggle button', async () => {
    wrapper = factory({
      localVue,
      stubs: ['router-link'],
    });

    wrapper.find('.header__toggle-menu-button').trigger('click');
    await Vue.nextTick();

    expect(wrapper.find(TheMenu).classes('opened')).toBe(true);
  });

  test('removes class from menu when click toggle button', async () => {
    wrapper = factory({
      localVue,
      stubs: ['router-link'],
    });

    // added this here because immediate watch changes isMenuOpened to false on
    // startup and test breaks
    await Vue.nextTick();
    wrapper.setData({ isMenuOpened: true });
    wrapper.find('.header__toggle-menu-button').trigger('click');
    await Vue.nextTick();

    expect(wrapper.find(TheMenu).classes('opened')).toBe(false);
  });
});
