import wrapperFactory from './wrapper-factory';
import bindEventBusEmits from './bind-event-bus-emits';

interface Globals {
  [propName: string]: Function;
}

const globals: Globals = {
  wrapperFactory,
  bindEventBusEmits,
};

/*
  for extending global object and don't import helper functions every time
  in unit tests. they are will be available with global.h.helperFunction()

  https://stackoverflow.com/a/52910794
*/
global.h = globals;