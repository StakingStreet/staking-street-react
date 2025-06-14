import Image from 'next/image';
import Link from 'next/link';

export default function StartScreen() {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/start-screen.jpg"
        alt="Staking Street"
        layout="fill"
        objectFit="cover"
        priority
      />

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
