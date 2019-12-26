/*
  Adds posibility to specify this styles on .app:

  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
*/
export default function vhFix() {
  const documentEl = document.documentElement;
  const vh = window.innerHeight * 0.01;
  documentEl.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    const vhResize = window.innerHeight * 0.01;
    documentEl.style.setProperty('--vh', `${vhResize}px`);
  });
}
