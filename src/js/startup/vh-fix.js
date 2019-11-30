export default function vhFix() {
  const documentEl = document.documentElement;
  const vh = window.innerHeight * 0.01;
  documentEl.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    const vhResize = window.innerHeight * 0.01;
    documentEl.style.setProperty('--vh', `${vhResize}px`);
  });
}
