import {User} from "@/schemas/UserSchema.ts";
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {STORAGE_PREFIX} from "@/constants.ts";
import {jwtDecode} from "jwt-decode";

type AuthenticatedUserState = {
    jwt: string | null,
    user: User | null
}

type AuthenticatedUserAction = {
    setJwt: (jwt: string) => void;
    setUser: (user: User) => void;
    isJwtValid: (jwt: string) => boolean;
    isAuthenticated: () => boolean;
    reset: () => void;
};

const initialState: AuthenticatedUserState = {
    jwt: null,
    user: null,
}

export const useAuthenticatedUserStore = create<AuthenticatedUserState & AuthenticatedUserAction>()(
    persist(
        (set, get) => ({
            ...initialState,
            setJwt: (jwt: string) => set({ jwt }),
            isJwtValid: (jwt: string) => {
                try {
                    const parsedJwt = jwtDecode(jwt);
                    return 'exp' in parsedJwt && parsedJwt.exp ? parsedJwt.exp > Math.floor(Date.now() / 1000) : false;
                } catch (e) {
                    return false;
                }
            },
            isAuthenticated: () => {
                const { jwt, isJwtValid } = get();
                return (jwt && isJwtValid(jwt)) === true;
            },
            setUser: (user: User) => {
                set({ user });
            },
            reset: () => set(initialState),
        }),
        {
            name: STORAGE_PREFIX + 'auth_user_store',
            storage: createJSONStorage(() => localStorage)
        }
    ),
);
