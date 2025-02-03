import { z } from "zod";

const SessionType = z.enum(['TENNIS', 'PADEL', 'FITNESS']);

const Session = z.object({
  id: z.string().uuid(),
  type: SessionType,
  trainerId: z.string().uuid(),
  trainer:  z.object({
    id: z.string().uuid(),
    name: z.string(),
    speciality: SessionType,
  }),
  price: z.number(),
  duration: z.number(),
  startTime: z.date(),
  isBooked: z.boolean(),
});
export type Session = z.infer<typeof Session>;