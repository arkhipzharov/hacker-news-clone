import svgSpriteInjector from 'svg-sprite-injector';
import vhFix from './vh-fix';
import iosSafariFontWeightFix from './ios-safari-font-weight-fix';

// Import all the icons so that they create an svg sprite and then consider
// deleting, moving and changing them
const icons = require.context('@/assets/img/icons', true, /\.svg$/);
icons.keys().forEach(icons);

svgSpriteInjector('sprite.svg', {
  revision: 1,
});

document.addEventListener('DOMContentLoaded', () => {
  vhFix();
  iosSafariFontWeightFix();
});
