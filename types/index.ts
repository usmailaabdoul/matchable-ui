import { z } from "zod";

const Session = z.object({
  id: z.string().uuid(),
  type: z.enum(['TENNIS', 'PADEL', 'FITNESS']),
  trainer: z.string(),
  price: z.number(),
  capacity: z.number(),
  startTime: z.date(),
  endTime: z.date(),
});
export type Session = z.infer<typeof Session>;