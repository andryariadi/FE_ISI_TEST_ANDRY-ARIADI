"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  console.log({ count }, "count");

  return (
    <main className="bg-rose-700">
      <h1 className="text-3xl font-bold text-center text-white">Count, yeahhh!</h1>
      <p className="text-center text-white">Count: {count}</p>
      <button className="block mx-auto mt-4 px-4 py-2 bg-violet-500 rounded" onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </main>
  );
}
