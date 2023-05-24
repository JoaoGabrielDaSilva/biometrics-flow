import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage, combine } from "zustand/middleware";

const initialState = {
  id: "",
  name: "",
  email: "",
  password: "",
  hasBiometry: false,
  didLogout: false,
};

export const useUser = create(
  persist(
    combine(initialState, (set) => ({
      set,
      login: async ({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) => {
        await new Promise((res) => {
          setTimeout(() => {
            set({
              email,
              password,
              id: "123",
              name: "João",
            });
            res(true);
          }, 1000);
        });
      },
      logout: () =>
        set((state) => {
          if (!state.hasBiometry) return initialState;

          return {
            ...state,
            didLogout: true,
            id: "",
          };
        }),
      clearBiometricsCredentials: () => set({ ...initialState }),
    })),
    {
      name: "user",
      storage: createJSONStorage(() => AsyncStorage),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        didLogout: false,
      }),
    }
  )
);
