export default function delay(timeInMs: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeInMs);
  });
}
