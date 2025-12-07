import {z} from 'zod';
import {TimestampSchema} from "@/schemas/GenericSchemas.ts";

export const UsernameSchema = z.string().min(4).max(32).transform(username => username.trim().toLowerCase().replace(/\s/g, ""));

export type Username = z.infer<typeof UsernameSchema>;

export const EmailSchema = z.email('Invalid email format');

export type Email = z.infer<typeof EmailSchema>;

export const PasswordSchema = z.string().min(8, "Password must contain at least 8 characters").max(64, "Password must contain at max 64 characters");

export type Password = z.infer<typeof PasswordSchema>;

export const UserSchema = z.object({
    username: UsernameSchema,
    email: EmailSchema,
    disabled: z.boolean(),
    created_at: TimestampSchema,
    updated_at: TimestampSchema,
});

export type User = z.infer<typeof UserSchema>;

export const InvitationTokenSchema = z.string()
    .regex(/^(([0-9]{4})-){4}([0-9]{4})$/)
    .refine((data) => {
        const [field_1, field_2, field_3, field_4, checksum] = data.split('-').map(Number);
        const count = field_1 + field_2 + field_3 + field_4;
        const calculatedChecksum = Math.floor( count / 4 );
        return checksum === calculatedChecksum;
    }
);

export type InvitationToken = z.infer<typeof InvitationTokenSchema>;