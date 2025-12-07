import {create} from "zustand";
import {Referral, ReferralCode} from "@/schemas/ReferralSchemas.ts";
import ApiCommunicator from "@/communicator/ApiCommunicator.ts";
import {
    ReferralCreateResponseSchema,
    ReferralDeleteResponseSchema, ReferralGetResponseSchema,
    ReferralListAllOwnedResponseSchema, ReferralUpdateResponseSchema
} from "@/schemas/ApiResponses/ReferralResponseSchemas.ts";
import {CreateReferralForm, UpdateReferralForm} from "@/schemas/Forms/ReferralFormSchemas.ts";
import { ReferralStoreActionResponse, ReferralStoreActionResponseSchema } from "@/schemas/ZustandSchemas";

type ReferralState = {
    hydrated: boolean,
    referrals: Referral[]
}

type ReferralAction = {
    isHydrated: () => boolean;
    hydrateReferrals: () => Promise<ReferralStoreActionResponse>;
    createReferral: (createReferralForm: CreateReferralForm) => Promise<ReferralStoreActionResponse>;
    updateReferral: (updateReferralForm: UpdateReferralForm, referralCode: ReferralCode) => Promise<ReferralStoreActionResponse>;
    deleteReferral: (referralCode: ReferralCode) => Promise<boolean>;
    getReferralByCode: (referralCode: ReferralCode) => Promise<Referral | undefined>;
    reset: () => void;
};

const initialState: ReferralState = {
    hydrated: false,
    referrals: []
}

export const useReferralStore = create<ReferralState & ReferralAction>()((set, get) => ({
    ...initialState,
    isHydrated: () => get().hydrated,
    hydrateReferrals: async (): Promise<ReferralStoreActionResponse> => {
        try {
            const parsedResponse = await ApiCommunicator.apiFetch({
                context: {
                    method: 'GET'
                },
                route: `/ui/user/services/referrals/all`
            }).then(response => response.json()).then(data => ReferralListAllOwnedResponseSchema.safeParseAsync(data));

            if (parsedResponse.success) {
                set({referrals: parsedResponse.data.payload, hydrated: true});
                return ReferralStoreActionResponseSchema.parse({
                    success: true,
                    message: parsedResponse.data.message,
                    referral: parsedResponse.data.payload
                });
            }
        } catch (e) {
            return ReferralStoreActionResponseSchema.parse({
                success: false,
                message: e instanceof Error ? e.message : undefined,
                referral: undefined
            });
        }

        return ReferralStoreActionResponseSchema.parse({
            success: false,
            referral: undefined
        });
    },
    createReferral: async (createReferralForm: CreateReferralForm): Promise<ReferralStoreActionResponse> => {
        try {
            const parsedResponse = await ApiCommunicator.apiFetch({
                context: {
                    method: 'POST',
                    body: JSON.stringify(createReferralForm),
                },
                route: `/ui/user/services/referrals`
            }).then(response => response.json()).then(data => ReferralCreateResponseSchema.safeParseAsync(data));
    
            if(parsedResponse.success) {
                set({referrals: [...get().referrals, parsedResponse.data.payload]});
                return ReferralStoreActionResponseSchema.parse({
                    success: true,
                    message: parsedResponse.data.message,
                    referral: parsedResponse.data.payload            
                });
            }
        } catch(e) {
             return ReferralStoreActionResponseSchema.parse({
                 success: false,
                 message: e instanceof Error ? e.message : undefined,
                 referral: undefined
            });
        }

        return ReferralStoreActionResponseSchema.parse({
            success: false,
            referral: undefined           
        });
    },
    updateReferral: async (updateReferralForm: UpdateReferralForm, referralCode: ReferralCode): Promise<ReferralStoreActionResponse> => {
        try {
            const parsedResponse = await ApiCommunicator.apiFetch({
                context: {
                    method: 'PUT',
                    body: JSON.stringify(updateReferralForm),
                },
                route: `/ui/user/services/referrals/${referralCode.toString()}`
            }).then(response => response.json()).then(data => ReferralUpdateResponseSchema.safeParseAsync(data));

            if(parsedResponse.success) {
                set({
                    referrals: get().referrals.map(referral => {
                            if (referral.code === referralCode) {
                                return parsedResponse.data.payload;
                            }
                            return referral
                        }
                    )
                });
                return ReferralStoreActionResponseSchema.parse({
                    success: true,
                    message: parsedResponse.data.message,
                    referral: parsedResponse.data.payload
                });
            }
        } catch(e) {
            return ReferralStoreActionResponseSchema.parse({
                success: false,
                message: e instanceof Error ? e.message : undefined,
                referral: undefined
            });
        }

        return ReferralStoreActionResponseSchema.parse({
            success: false,
            referral: undefined
        });
    },
    deleteReferral: async (referralCode: ReferralCode): Promise<boolean> => {
        try {
            const parsedResponse = await ApiCommunicator.apiFetch({
                context: {
                    method: 'DELETE',
                },
                route: `/ui/user/services/referrals/${referralCode.toString()}`
            }).then(response => response.json()).then(data => ReferralDeleteResponseSchema.safeParseAsync(data));

            if(parsedResponse.success) {
                set({ referrals: get().referrals.filter(ref => ref.code !== referralCode) });
            }
            return parsedResponse.success;
        } catch {
            return false;
        }
    },
    getReferralByCode: async (referralCode: ReferralCode): Promise<Referral | undefined> => {
        const referral = get().referrals.find(ref => ref.code === referralCode) || undefined;

        if(referral) {
            return referral;
        }

        const parsedResponse = await ApiCommunicator.apiFetch({
            context: {
                method: 'GET',
            },
            route: `/ui/user/services/referrals/${referralCode.toString()}`
        }).then(response => response.json()).then(data => ReferralGetResponseSchema.safeParseAsync(data));

        if(parsedResponse.success) {
            set({referrals: [...get().referrals, parsedResponse.data.payload]});
            return parsedResponse.data.payload;
        }

        return undefined;
    },
    reset: () => set(initialState),
}));
