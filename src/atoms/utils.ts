export const jsonStorageOptions: {
  reviver?: (key: string, value: unknown) => unknown;
  replacer?: (key: string, value: unknown) => unknown;
} = {
  replacer: (_, value) =>
    value instanceof Map
      ? {
          dataType: "Map",
          value: [...value.entries()],
        }
      : value,
  reviver: (_, value) =>
    typeof value === "object" &&
    value !== null &&
    (value as { dataType: string; value: unknown }).dataType === "Map"
      ? new Map((value as { value: Map<unknown, unknown> }).value)
      : value,
};
