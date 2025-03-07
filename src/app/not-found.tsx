"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.back();
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [router]);
  return (
    <main className="b-amber-500 min-h-screen flex flex-col items-center justify-center">
      <Image src="/notfound.svg" width={600} height={600} alt="404" className="object-center" />

      <h1 className="text-xl font-bold text-center text-white">Oops..Page Not Found, We Send You Back To Your Journey In a Few Seconds!</h1>
    </main>
  );
}
