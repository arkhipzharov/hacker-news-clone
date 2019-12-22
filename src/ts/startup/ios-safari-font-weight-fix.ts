export default function iosSafariFontWeightFix(): void {
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

  if (iOSSafari) {
    document.querySelector('body')!.classList.add('ios-safari-font-weight-fix');
  }
}
