import {z} from 'zod';
import {TimestampSchema, UrlSchema} from "@/schemas/GenericSchemas.ts";

export const ReferralCodeSchema = z.string().length(8).regex(/^[a-zA-Z0-9]+$/);

export type ReferralCode = z.infer<typeof ReferralCodeSchema>;

export const ReferralClickHistoryDataPointSchema = z.object({
    date: z.date(),
    count: z.number().int().nonnegative(),
    unique_visitors: z.number().int().nonnegative(),
});

export type ReferralClickHistoryDataPoint = z.infer<typeof ReferralClickHistoryDataPointSchema>;

export const ReferralLabelSchema = z.string().max(32).regex(/^[a-zA-Z0-9 !@#$%^&*]*$/).nullable()

export const ReferralSchema = z.object({
    code: ReferralCodeSchema,
    url: UrlSchema,
    label: ReferralLabelSchema,
    disabled: z.boolean(),
    created_at: TimestampSchema,
    updated_at: TimestampSchema,
})

export type Referral = z.infer<typeof ReferralSchema>;