import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import Vuebar from 'vuebar';
import VueTruncate from 'vue-truncate-filter';
import moment from 'moment';
import stripHtml from 'string-strip-html';
import eventBus from './event-bus';

Vue.use(Vuebar);
Vue.use(VueTruncate);

// to not import these every time
Vue.prototype.$evBus = eventBus;
Vue.prototype.$moment = moment;
Vue.prototype.$stripHtml = stripHtml;

// https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components
const requireComponent = require.context(
  // Import commonly used components located in the components folder, as well
  // as the name of which begins with the letter v, and then consider their
  // removal, movement and change
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
