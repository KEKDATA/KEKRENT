export async function* asyncGenerator(max: number) {
  let i = 0;
  while (i < max) {
    yield i++;
  }
}
