import * as z from 'zod';

export const schema = z.object({
    name: z.string(),
});

export type TaskFormData = z.infer<typeof schema>;