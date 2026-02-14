import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'validation.nameRequired'),
  email: z.string().email('validation.emailInvalid'),
  subject: z.string().optional(),
  message: z.string().min(1, 'validation.messageRequired'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
