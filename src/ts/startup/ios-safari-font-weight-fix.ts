// fonts are too thin on ios safari
//
// https://stackoverflow.com/a/51460627, https://stackoverflow.com/a/31233417
export default function iosSafariFontWeightFix() {
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

  if (iOSSafari) {
    document.querySelector('body')!.setAttribute(
      'style',
      `
        text-rendering: optimizeLegibility;
        -webkit-text-stroke: 0.5px;
      `,
    );
  }
}
