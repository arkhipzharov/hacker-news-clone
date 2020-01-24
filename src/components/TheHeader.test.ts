// this is example of how unit test should look
import Vue from 'vue';
import TheHeader from './TheHeader.vue';
import TheMenu from './TheMenu.vue';

const factory = global.h.wrapperFactory(TheHeader);

describe('TheHeader', () => {
  let wrapper;

  test('calls function when click toggle menu button', () => {
    const toggleMenu = jest.fn();
    wrapper = factory({
      stubs: ['router-link'],
      methods: {
        toggleMenu,
      },
    });

    wrapper.find('.header__toggle-menu-btn').trigger('click');

    expect(toggleMenu).toHaveBeenCalled();
  });

  test('triggers clickaway directive when click outside of menu', () => {
    const onClickaway = jest.fn();
    wrapper = factory({
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
      stubs: ['router-link'],
      directives: {
        onClickaway,
      },
    });

    wrapper.find('.header__toggle-menu-btn').trigger('click');

    expect(onClickaway).toHaveBeenCalled();
  });

  test('adds class to menu when click toggle button', async () => {
    wrapper = factory({
      stubs: ['router-link'],
    });

    wrapper.find('.header__toggle-menu-btn').trigger('click');
    await Vue.nextTick();

    expect(wrapper.find(TheMenu).classes('opened')).toBe(true);
  });

  test('removes class from menu when click toggle button', async () => {
    wrapper = factory({
      stubs: ['router-link'],
      data() {
        return {
          isMenuOpened: true,
        };
      },
    });

    wrapper.find('.header__toggle-menu-btn').trigger('click');
    await Vue.nextTick();

    expect(wrapper.find(TheMenu).classes('opened')).toBe(false);
  });
});
