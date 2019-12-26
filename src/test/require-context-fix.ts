// 'ReferenceError: __requireContext is not defined' fix
//
// https://stackoverflow.com/a/54151648

import registerRequireContextHook from 'babel-plugin-require-context-hook/register';

registerRequireContextHook();
