export interface Store<T> {
  data: Record<string, T>;
  setData: (data: T[]) => void;
  add: (data: T) => void;
}
