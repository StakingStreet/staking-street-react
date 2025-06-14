
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
    const userId = 'user-123';
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
