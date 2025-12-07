import {GenericErrorResponseSchema, GenericSuccessResponseSchema} from "@/schemas/ApiResponses/GenericResponseSchemas.ts";
import {z} from "zod";
import {ReferralClickHistoryDataPointSchema, ReferralCodeSchema, ReferralSchema} from "@/schemas/ReferralSchemas.ts";
import {UrlSchema} from "@/schemas/GenericSchemas.ts";

export const ReferralClickResponseSchema = z.discriminatedUnion("success", [
    GenericSuccessResponseSchema.extend({
        payload: z.object({
            url: UrlSchema
        })
    }),
    GenericErrorResponseSchema
]);

export const ReferralClickHistoryResponseSchema = z.discriminatedUnion("success", [
    GenericSuccessResponseSchema.extend({
        payload: z.object({
            code: ReferralCodeSchema,
            history: z.array(ReferralClickHistoryDataPointSchema)
        })
    }),
    GenericErrorResponseSchema
]);

export const ReferralListAllOwnedResponseSchema = z.discriminatedUnion("success", [
    GenericSuccessResponseSchema.extend({
        payload: z.array(ReferralSchema)
    }),
    GenericErrorResponseSchema
]);

export const ReferralCreateResponseSchema = z.discriminatedUnion("success", [
    GenericSuccessResponseSchema.extend({
        payload: ReferralSchema
    }),
    GenericErrorResponseSchema
]);

export const ReferralDeleteResponseSchema = z.discriminatedUnion("success", [
    GenericSuccessResponseSchema,
    GenericErrorResponseSchema
]);

export const ReferralGetResponseSchema = z.discriminatedUnion("success", [
    GenericSuccessResponseSchema.extend({
        payload: ReferralSchema
    }),
    GenericErrorResponseSchema
]);

export const ReferralUpdateResponseSchema = z.discriminatedUnion("success", [
    GenericSuccessResponseSchema.extend({
        payload: ReferralSchema
    }),
    GenericErrorResponseSchema
]);