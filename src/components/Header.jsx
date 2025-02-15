import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Home, Trophy, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = ({ playerName }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <a
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-600"
        >
          <img src="/favicon.png" alt="Logo" className="w-8 h-8" />
          <span>Memory-Match</span>
        </a>

        <button
          className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-200 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div
          className={`lg:flex items-center gap-6 ${
            menuOpen
              ? "absolute top-16 left-0 w-full bg-white shadow-md p-4 flex flex-col z-50"
              : "hidden lg:flex"
          }`}
        >
          <nav className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <Button
              onClick={() => router.push("/")}
              variant="ghost"
              className="flex items-center gap-2 w-full lg:w-auto"
            >
              <Home className="w-4 h-4" /> Home
            </Button>
            <Button
              onClick={() => router.push("/leaderboard")}
              variant="ghost"
              className="flex items-center gap-2 w-full lg:w-auto"
            >
              <Trophy className="w-4 h-4" /> Leaderboard
            </Button>
          </nav>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
            <User className="w-4 h-4" />
            <span>{playerName || "Guest"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
