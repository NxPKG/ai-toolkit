import { createJsonErrorResponseHandler } from '@ai-toolkit/provider-utils';
import { z } from 'zod';

const mistralErrorDataSchema = z.object({
  object: z.literal('error'),
  message: z.string(),
  type: z.string(),
  param: z.string().nullable(),
  code: z.string().nullable(),
});

export type MistralErrorData = z.infer<typeof mistralErrorDataSchema>;

export const mistralFailedResponseHandler = createJsonErrorResponseHandler({
  errorSchema: mistralErrorDataSchema,
  errorToMessage: data => data.message,
});
