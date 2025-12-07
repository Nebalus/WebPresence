import { z } from "zod";
import { EmailSchema, InvitationTokenSchema, PasswordSchema, UsernameSchema } from "../UserSchema";

export const RegisterUserFormSchema = z.object({
    invitationtoken: InvitationTokenSchema,
    email: EmailSchema,
    username: UsernameSchema,
    password: PasswordSchema,
    password_confirm: PasswordSchema
})

export type RegisterUserForm = z.infer<typeof RegisterUserFormSchema>;

export const LoginUserFromSchema = z.object({
    username: UsernameSchema,
    password: PasswordSchema
});

export type LoginUserFrom = z.infer<typeof LoginUserFromSchema>;