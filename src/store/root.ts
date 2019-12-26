// https://habr.com/ru/post/459050/ (ru),
// https://github.com/ktsn/vuex-smart-module (en)

import { Module, createMapper } from 'vuex-smart-module';

export const root = new Module({});

const rootMapper = createMapper(root);

export default rootMapper;
