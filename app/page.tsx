
import { Session } from '@/types';
import Home from '@/views/home'

async function getSessions() {
  const response = await fetch('http://localhost:3001/sessions');
  const data: Session[] = await response.json();
  return data;
}

export default async function HomeLayout() {

  const sessions = await getSessions()

  return (
    <Home data={sessions} />
  );
}
