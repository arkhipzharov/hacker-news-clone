import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

// https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components
const requireComponent = require.context(
  // Import commonly used components located in the components folder, as well
  // as the name of which begins with the letter V, and then consider their
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
  // make that components global
  Vue.component(componentName, componentConfig.default || componentConfig);
});
