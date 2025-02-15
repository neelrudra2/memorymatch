"use client";
import MemoryGame from "@/components/MemoryGame";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <MemoryGame />
    </div>
  );
}
