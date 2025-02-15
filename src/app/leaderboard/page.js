"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const storedLeaderboard =
      JSON.parse(localStorage.getItem("leaderboard")) || [];
    setLeaderboard(storedLeaderboard);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-center mb-6">Leaderboard</h1>

          {leaderboard.length === 0 ? (
            <p className="text-center text-lg">
              No scores yet. Play a game to appear here!
            </p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <th className="p-3">Rank</th>
                  <th className="p-3">Player</th>
                  <th className="p-3">Moves</th>
                  <th className="p-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr
                    key={index}
                    className="border border-gray-300 text-center"
                  >
                    <td className="p-3 font-bold">{index + 1}</td>
                    <td className="p-3">{entry.playerName}</td>
                    <td className="p-3">{entry.moves}</td>
                    <td className="p-3">{entry.timeElapsed}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="mt-6 text-center">
            <Button
              onClick={() => window.history.back()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Back to Game
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
