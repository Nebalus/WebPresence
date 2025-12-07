import {z} from "zod";
import {UserSchema} from "@/schemas/UserSchema.ts";
import {GenericSuccessResponseSchema} from "@/schemas/ApiResponses/GenericResponseSchemas.ts";

export const SuccessfulLoginResponseSchema = GenericSuccessResponseSchema.extend({
    payload: z.object({
        jwt: z.jwt(),
        user: UserSchema
    })
})

export type SuccessfulLoginResponse = z.infer<typeof SuccessfulLoginResponseSchema>;

export const SuccessfulRegisterResponseSchema = GenericSuccessResponseSchema

export type SuccessfulRegisterResponse = z.infer<typeof SuccessfulRegisterResponseSchema>;
