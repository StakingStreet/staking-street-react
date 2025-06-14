import Image from 'next/image';
import Link from 'next/link';

export default function StartScreen() {
  return (
    <div className="relative w-full h-screen">
      {/* Фон из твоего изображения */}
      <Image
        src="/start-screen.jpg"
        alt="Staking Street"
        layout="fill"
        objectFit="cover"
        priority
      />

      {/* Кнопки поверх изображения */}
      <div className="absolute bottom-10 w-full flex flex-col items-center gap-4">
        <button className="bg-yellow-400 text-white font-bold text-xl px-10 py-4 rounded-2xl shadow-xl hover:bg-yellow-500 transition">
          ИГРАТЬ
        </button>

        <div className="flex gap-3 mt-2">
          <Link href="/tasks">
            <button className="bg-white text-orange-600 font-semibold px-4 py-2 rounded-xl shadow hover:bg-orange-100">
              ЗАДАНИЯ
            </button>
          </Link>
          <Link href="/shop">
            <button className="bg-white text-orange-600 font-semibold px-4 py-2 rounded-xl shadow hover:bg-orange-100">
              МАГАЗИН
            </button>
          </Link>
          <Link href="/wallet">
            <button className="bg-white text-orange-600 font-semibold px-4 py-2 rounded-xl shadow hover:bg-orange-100">
              КОШЕЛЁК
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';

export default function StakingStreetApp() {
  const [tgUser, setTgUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-web-app.js';
      script.onload = () => {
        if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
          setTgUser(window.Telegram.WebApp.initDataUnsafe.user);
        }
      };
      document.body.appendChild(script);
    }
  }, []);
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ffdxohxdbequzwyvzssx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmZHhvaHhkYmVxdXp3eXZ6c3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MjA3NTUsImV4cCI6MjA2NTQ5Njc1NX0.7-odR8oAysi7IntOih38IAgRCIKHy-x3oi8c_uRpSLg';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [coins, setCoins] = useState(0);
  const [taskCompleted, setTaskCompleted] = useState(false);

  useEffect(() => {
    const userId = 'user-123';
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setCoins(data.coins);
        setTaskCompleted(data.task_done);
      } else {
        await supabase.from('users').insert({
          id: userId,
          username: 'evhen',
          coins: 0,
          task_done: false
        });
      }
    };
    fetchData();
  }, []);

  const completeTask = async () => {
    const userId = tgUser?.id || 'anonymous';
    if (!taskCompleted) {
      const newCoins = coins + 10;
      setCoins(newCoins);
      setTaskCompleted(true);
      await supabase
        .from('users')
        .update({ coins: newCoins, task_done: true })
        .eq('id', userId);
    }
  };

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Staking Street 💸</h1>
      <p>Монеты: {coins}</p>
      <button onClick={completeTask} disabled={taskCompleted}>
        {taskCompleted ? '✅ Задание выполнено' : 'Выполнить задание'}
      </button>
    </main>
  );
}
