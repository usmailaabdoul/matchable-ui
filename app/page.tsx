import { Suspense } from 'react';

import { Header } from '@/components/cart/header';
import { SessionCard } from '@/components/session/session-card';
import { SessionSkeleton } from '@/components/session/session-skeleton';
import { CartProvider } from '@/context/cart-context';

// async function getSessions() {
//   // Fetch sessions from API
// }

export default async function Home() {
  // const sessions = await getSessions();
  const sessions = SESSIONS;

  return (
    <CartProvider>
      <div className="min-h-screen">
        <Header />
        
        <main className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-8">Available Sessions</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Suspense fallback={<>
              <SessionSkeleton />
              <SessionSkeleton />
              <SessionSkeleton />
            </>}>
              {sessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </Suspense>
          </div>
        </main>
      </div>
    </CartProvider>
  );
}

const SESSIONS = [
  {
      "id": "4a7fdc3b-24ff-4639-aeee-41400900aaec",
      "type": "TENNIS",
      "startTime": "2025-02-03T14:06:31.037Z",
      "endTime": "2025-02-25T14:06:31.037Z",
      "trainer": "Bryan",
      "price": "25",
      "capacity": 10
  },
  {
      "id": "e9b40c66-befb-4ca7-b765-68a947cb1e9f",
      "type": "PADEL",
      "startTime": "2025-02-03T14:06:31.037Z",
      "endTime": "2025-02-25T14:06:31.037Z",
      "trainer": "Bryan",
      "price": "25",
      "capacity": 10
  },
  {
      "id": "06d653de-6d5f-47c9-813f-0eb7326786c3",
      "type": "TENNIS",
      "startTime": "2025-02-03T14:06:31.037Z",
      "endTime": "2025-02-25T14:06:31.037Z",
      "trainer": "Bryan",
      "price": "25",
      "capacity": 10
  },
  {
      "id": "ec27136b-f6ff-42f3-af9a-d70d3a6ab9fe",
      "type": "TENNIS",
      "startTime": "2025-02-05T14:06:31.037Z",
      "endTime": "2025-02-20T14:06:31.037Z",
      "trainer": "Rachel",
      "price": "25",
      "capacity": 10
  },
  {
      "id": "2b10abdf-ebdb-4248-b41f-782320f4d364",
      "type": "PADEL",
      "startTime": "2025-02-05T14:06:31.037Z",
      "endTime": "2025-02-20T14:06:31.037Z",
      "trainer": "Rachel",
      "price": "20",
      "capacity": 10
  },
  {
      "id": "845db410-c6c9-4040-8635-c9cbb942fedf",
      "type": "PADEL",
      "startTime": "2025-02-05T14:06:31.037Z",
      "endTime": "2025-02-15T14:06:31.037Z",
      "trainer": "John",
      "price": "15",
      "capacity": 5
  },
  {
      "id": "1a96b8b1-41ff-44eb-a237-a696bb4efdfc",
      "type": "FITNESS",
      "startTime": "2025-02-05T14:06:31.037Z",
      "endTime": "2025-02-15T14:06:31.037Z",
      "trainer": "John",
      "price": "15",
      "capacity": 5
  }
]