
import { Session } from '@/types';
import Home from '@/views/home'
import { CartProvider } from '@/context/cart-context';
import { Header } from '@/components/cart/header';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getSessions() {
  const response = await fetch(`${API_URL}/sessions`);
  const data: Session[] = await response.json();
  return data;
}

export default async function HomeLayout() {
  const sessions = await getSessions()

  return (
    <CartProvider>
      <div className="container mx-auto p-4">
        <Header />
        <div className="mt-5">
            <Home sessions={sessions} />
        </div>
      </div>
    </CartProvider>
  );
}