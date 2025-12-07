import {z} from "zod";

export const GenericResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().nullable(),
    status_code: z.number().min(100).max(599),
    payload: z.any().nullable()
})

export const GenericSuccessResponseSchema = GenericResponseSchema.extend({
    success: z.literal(true),
})

export const GenericErrorResponseSchema = GenericResponseSchema.extend({
    success: z.literal(false),
})