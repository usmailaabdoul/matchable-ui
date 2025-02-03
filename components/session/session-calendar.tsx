// 'use client';
// import { Session } from '@/types';
// import { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';


// export function SessionCalendar() {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//   return (
//     <div className="mt-2">
//       <DatePicker
//         selected={selectedDate}
//         onChange={(date) => setSelectedDate(date)}
//         minDate={new Date(session.startTime)}
//         maxDate={new Date(session.endTime)}
//         placeholderText="Select session date"
//         className="border rounded p-2 w-full text-sm"
//       />
//     </div>
//   );
// }

// "use client"

// import * as React from "react"
// import { format } from "date-fns"
// import { Calendar as CalendarIcon } from "lucide-react"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { Session } from "@/types"

// export function DatePickerDemo({ session }: { session: Session }) {
//   const [date, setDate] = React.useState<Date>()

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className={cn(
//             "w-[280px] justify-start text-left font-normal",
//             !date && "text-muted-foreground"
//           )}
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {date ? format(date, "PPP") : <span>Pick a date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0">
//         <Calendar
//           // mode="single"
//           selected={date}
//           onSelect={setDate}
//           initialFocus
//           min={new Date(session.startTime)}
//           max={new Date(session.endTime)}
//         />
//       </PopoverContent>
//     </Popover>
//   )
// }
