import {z} from 'zod';

export const IdSchema = z.number().int().positive();

export type Id = z.infer<typeof IdSchema>;

export const TimestampSchema = z.iso.datetime({ offset: true });

export type Timestamp = z.infer<typeof TimestampSchema>;

export const UrlSchema = z.url();

export type Url = z.infer<typeof UrlSchema>;