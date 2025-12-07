import {z} from "zod";
import {EmailSchema, InvitationTokenSchema, PasswordSchema, UsernameSchema} from "@/schemas/UserSchema.ts";

export const UserRegisterRequestSchema = z.object({
    "invitation_token": InvitationTokenSchema,
    "email": EmailSchema,
    "username": UsernameSchema,
    "password": PasswordSchema,
});

export type UserRegisterRequest = z.infer<typeof UserRegisterRequestSchema>;

export const UserLoginRequestSchema = z.object({
    "username": UsernameSchema,
    "password": PasswordSchema,
});

export type UserLoginRequest = z.infer<typeof UserLoginRequestSchema>;