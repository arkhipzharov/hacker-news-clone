export default async function setTimeoutProm(timeInMs) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeInMs);
  });
}
