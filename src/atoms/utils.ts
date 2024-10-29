import { type WritableAtom, atom } from "jotai";

export const jsonStorageOptions: {
  reviver?: (key: string, value: unknown) => unknown;
  replacer?: (key: string, value: unknown) => unknown;
} = {
  replacer: (_, value) =>
    value instanceof Map
      ? {
          dataType: "Map",
          value: Array.from(value.entries()),
        }
      : value,
  reviver: (_, value) =>
    typeof value === "object" &&
    value !== null &&
    (value as { dataType: string; value: unknown }).dataType === "Map"
      ? new Map((value as { value: Map<unknown, unknown> }).value)
      : value,
};

export function atomWithToggle(
  initialValue?: boolean,
): WritableAtom<boolean, [boolean?], void> {
  const anAtom = atom(initialValue, (get, set, nextValue?: boolean) => {
    const update = nextValue ?? !get(anAtom);
    set(anAtom, update);
  });

  return anAtom as WritableAtom<boolean, [boolean?], void>;
}
