import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import VRuntimeTemplate from 'v-runtime-template';
import { Fragment } from 'vue-fragment';
import Vuebar from 'vuebar';
import moment from 'moment';
import eventBus from './event-bus';

Vue.use(Vuebar);

Vue.prototype.$evBus = eventBus;
Vue.prototype.$moment = moment;

interface PackageComponents {
  [propName: string]: object;
}

const packageComponents: PackageComponents = { VRuntimeTemplate, Fragment };

Object.keys(packageComponents).forEach((compName) => {
  Vue.component(compName, packageComponents[compName]);
});

const requireComponent = require.context(
  // Import the components located in the components folder, as well as the
  // name of which begins with the letter v, and then consider their removal,
  // movement and change
  './components',
  false,
  /V[A-Z]\w+\.vue$/,
);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(
    camelCase(
      fileName
        .split('/')
        .pop()!
        .replace(/\.\w+$/, ''),
    ),
  );
  Vue.component(componentName, componentConfig.default || componentConfig);
});
