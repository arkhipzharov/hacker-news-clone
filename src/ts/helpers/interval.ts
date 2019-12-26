// return random number between min and max values
export default function interval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
