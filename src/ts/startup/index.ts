import svgSpriteInjector from 'svg-sprite-injector';
import vhFix from './vh-fix';
import iosSafariFontWeightFix from './ios-safari-font-weight-fix';

// Import all the icons so that they will be in svg sprite and then consider
// deleting, moving and changing them
//
// https://github.com/JetBrains/svg-sprite-loader/issues/212#issuecomment-343561578
const icons = require.context('@/assets/img/icons', true, /\.svg$/);
icons.keys().forEach(icons);

// https://osvaldas.info/caching-svg-sprite-in-localstorage
svgSpriteInjector('sprite.svg', {
  // for refreshing svg sprite cache
  revision: 1.62,
});

// to make styles consistent before external styles loaded, which anyway takes
// some time
document.addEventListener('DOMContentLoaded', () => {
  vhFix();
  iosSafariFontWeightFix();
});
