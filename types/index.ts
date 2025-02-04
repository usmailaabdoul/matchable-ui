import { z } from "zod";

const SessionType = z.enum(['TENNIS', 'PADEL', 'FITNESS']);
export type SessionType = z.infer<typeof SessionType>;

const BookingDetails = z.object({
  id: z.string(),
  sessionType: SessionType,
  trainerAvailabilityId: z.string().uuid(),
  trainerName:  z.string(),
  price: z.number(),
  duration: z.number(),
  startTime: z.date(),
});
export type BookingDetails = z.infer<typeof BookingDetails>;

const Session = z.object({
  id: z.string(),
  type: z.string(),
  durations: z.object({
    id: z.string(),
    minutes: z.number(),
    price: z.number(),
  }).array(),
  timeSlots: z.object({
    id: z.string(),
    startTime: z.date(),
    availableTrainers: z.object({
      id: z.string(),
      trainerId: z.string(),
      trainerName: z.string(),
      isBooked: z.boolean(),
    }).array(),
  }).array(),
})
export type Session = z.infer<typeof Session>;
