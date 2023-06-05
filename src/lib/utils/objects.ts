export function findUpdatedKeys<T extends Record<string, unknown>>(
  newObj: T,
  oldObj: T
): string[] {
  return Object.keys(newObj).filter((key) => newObj[key] !== oldObj[key]);
}
