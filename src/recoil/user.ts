import { atom, selector, selectorFamily } from "recoil";

// UserState 타입 정의
type UserState = {
  atk: string;
  role: string;
  locationState: {
    latitude: number;
    longitude: number;
  };
};

// userState 아톰
export const userState = atom<UserState>({
  key: "userState",
  default: {
    atk: "",
    role: "",
    locationState: {
      latitude: 0,
      longitude: 0,
    },
  },
});

export const userSelector = selectorFamily({
  key: "userPropertySelector",
  get:
    (property) =>
    ({ get }) => {
      const user = get(userState);

      switch (property) {
        case "atk":
          return user && user.atk;
        case "location":
          return user && user.locationState;
        case "role":
          return user && user.role;
        default:
          return null;
      }
    },
  set:
    (property) =>
    ({ set }, newValue: any) => {
      set(userState, (prevUserState: any) => {
        switch (property) {
          case "atk":
            return { ...prevUserState, atk: newValue };
          case "location":
            console.log(newValue.latitude);
            return {
              ...prevUserState,
              locationState: { latitude: newValue.latitude, longitude: newValue.longitude },
            };
          case "role":
            return { ...prevUserState, role: newValue };
          default:
            return prevUserState;
        }
      });
    },
});
