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

const packageComponents = { VRuntimeTemplate, Fragment };

Object.keys(packageComponents).forEach((compName) => {
  // Сделать глобальными компоненты, взятые из пакетов webpack
  Vue.component(compName, packageComponents[compName]);
});

const requireComponent = require.context(
  // Импортировать компоненты, находящиеся в папке components
  // и потом учитывать их удаление, перемещение и изменение
  './components', false, /V[A-Z]\w+\.vue$/,
);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(
    camelCase(
      fileName.split('/').pop().replace(/\.\w+$/, ''),
    ),
  );
  // Сделать глобальными компоненты, находящиеся в папке components, а
  // также имя которых начинается с префикса V
  Vue.component(componentName, componentConfig.default || componentConfig);
});
