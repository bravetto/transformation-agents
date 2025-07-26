
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_GA_ID: z.string().regex(/^G-[A-Z0-9]+$/, 'Invalid Google Analytics ID'),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1, 'PostHog key required'),
  DATABASE_URL: z.string().url('Invalid database URL'),
  CLICKUP_API_KEY: z.string().min(1, 'ClickUp API key required'),
  CONTACT_FORM_ENDPOINT: z.string().url('Contact form endpoint required'),
});

export const env = envSchema.parse(process.env);
