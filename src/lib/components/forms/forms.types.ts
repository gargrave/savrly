export interface FormProps<T> {
  // TODO: type this error correctly
  onError?: (error: unknown) => void;
  onSuccess?: (value: T) => void;
}
