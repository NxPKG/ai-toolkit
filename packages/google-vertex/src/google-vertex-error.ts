import { createJsonErrorResponseHandler } from '@ai-toolkit/provider-utils';
import { z } from 'zod';

const googleVertexErrorDataSchema = z.object({
  error: z.object({
    code: z.number().nullable(),
    message: z.string(),
    status: z.string(),
  }),
});

export type GoogleVertexErrorData = z.infer<typeof googleVertexErrorDataSchema>;

export const googleVertexFailedResponseHandler = createJsonErrorResponseHandler(
  {
    errorSchema: googleVertexErrorDataSchema,
    errorToMessage: data => data.error.message,
  },
);
