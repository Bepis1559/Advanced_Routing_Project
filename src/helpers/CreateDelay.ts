export function CreateDelay(delay_milliseconds: number) {
  const start = performance.now();
  while (start > performance.now() - delay_milliseconds) {
    // artificial delay
  }
}
