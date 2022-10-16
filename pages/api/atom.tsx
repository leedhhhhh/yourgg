import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const localStorage = typeof window !== "undefined" ? window.localStorage : null;

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage && localStorage.getItem(key);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: string, _: any, isReset: boolean) => {
      isReset
        ? localStorage && localStorage.removeItem(key)
        : localStorage && localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const playerNameState = atom({
  key: "playerNameState",
  default: "",
  effects: [localStorageEffect(`currentUser`)],
});

export const laneState = atom({
  key: "laneState",
  default: "All",
});
