import { z } from "zod";
import { ReferralLabelSchema } from "../ReferralSchemas";
import {UrlSchema} from "@/schemas/GenericSchemas.ts";

export const CreateReferralFormSchema = z.object({
    label: ReferralLabelSchema,
    url: UrlSchema,
    disabled: z.boolean().default(false)
})

export type CreateReferralForm = z.infer<typeof CreateReferralFormSchema>;

export const UpdateReferralFormSchema = z.object({
    label: ReferralLabelSchema,
    url: UrlSchema,
    disabled: z.boolean().default(false)
})

export type UpdateReferralForm = z.infer<typeof UpdateReferralFormSchema>;