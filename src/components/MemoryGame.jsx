// components/MemoryGame.jsx
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Timer, RotateCcw, User } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import NameDialog from "./NameDialog";
import { CARD_PAIRS } from "../constants/gameData";
import CongratsDialog from "./CongratsDialog";

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showNameDialog, setShowNameDialog] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [showCongratsDialog, setShowCongratsDialog] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    let timer;
    if (gameStarted && matched.length < CARD_PAIRS.length * 2) {
      timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, matched.length]);

  useEffect(() => {
    if (matched.length === CARD_PAIRS.length * 2) {
      setShowCongratsDialog(true);
      saveScore(); // Save score when game completes
    }
  }, [matched]);

  const handleNameSubmit = () => {
    if (nameInput.trim()) {
      setPlayerName(nameInput.trim());
      setShowNameDialog(false);
    }
  };

  const shuffleCards = () => {
    const allCards = [...CARD_PAIRS, ...CARD_PAIRS]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uniqueId: index }));
    setCards(allCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTimeElapsed(0);
    setGameStarted(false);
  };

  const handleCardClick = (uniqueId) => {
    if (!gameStarted) setGameStarted(true);
    if (
      flipped.length === 2 ||
      flipped.includes(uniqueId) ||
      matched.includes(uniqueId)
    )
      return;

    const newFlipped = [...flipped, uniqueId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((card) => card.uniqueId === firstId);
      const secondCard = cards.find((card) => card.uniqueId === secondId);

      if (firstCard.id === secondCard.id) {
        const newMatched = [...matched, firstId, secondId];
        setMatched(newMatched);
        setFlipped([]);

        // Check if game is complete
        if (newMatched.length === CARD_PAIRS.length * 2) {
          setShowCongratsDialog(true);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const handlePlayAgain = () => {
    saveScore();
    setShowCongratsDialog(false);
    shuffleCards();
  };

  const saveScore = () => {
    const newScore = {
      playerName,
      moves,
      timeElapsed,
    };

    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push(newScore);

    // Sort by moves first, then by time
    leaderboard.sort((a, b) => {
      if (a.moves === b.moves) {
        return a.timeElapsed - b.timeElapsed;
      }
      return a.moves - b.moves;
    });

    // Keep only top 10 scores
    leaderboard = leaderboard.slice(0, 10);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    // Send data to Google Sheets
    fetch(
      "https://script.google.com/macros/s/AKfycbweg8ZF-y0t14GXr4Gy85oCPeY1125qEA6Xtk81eltirQsDHfVg3p0XPofVoxqNvGDe/exec",
      {
        mode: "no-cors",
        method: "POST",
        body: JSON.stringify(newScore),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.text())
      .then((data) => console.log("Google Sheet Response:", data))
      .catch((error) => console.error("Error saving to Google Sheets:", error));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header playerName={playerName} />

      <NameDialog
        open={showNameDialog}
        onOpenChange={setShowNameDialog}
        nameInput={nameInput}
        setNameInput={setNameInput}
        onSubmit={handleNameSubmit}
      />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto p-4">
          <div className="mb-6 flex justify-between items-center">
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <span className="text-lg font-semibold">
                  {formatTime(timeElapsed)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                <span className="text-lg font-semibold">{moves} Moves</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="text-lg font-semibold">{playerName}</span>
              </div>
            </div>
            <Button onClick={shuffleCards} className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset Game</span>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {cards.map(({ uniqueId, emoji }) => (
              <Card
                key={uniqueId}
                onClick={() => handleCardClick(uniqueId)}
                className={`
                  aspect-square flex items-center justify-center text-2xl sm:text-4xl cursor-pointer
                  transition-all duration-300 transform
                  ${
                    flipped.includes(uniqueId) || matched.includes(uniqueId)
                      ? "rotate-0"
                      : "rotate-180 bg-gradient-to-r from-blue-500 to-purple-500"
                  }
                  ${matched.includes(uniqueId) ? "bg-green-100" : ""}
                  hover:scale-105
                `}
              >
                <div
                  className={`
                  transition-all duration-300 transform
                  ${
                    flipped.includes(uniqueId) || matched.includes(uniqueId)
                      ? "rotate-0"
                      : "rotate-180"
                  }
                `}
                >
                  {flipped.includes(uniqueId) || matched.includes(uniqueId)
                    ? emoji
                    : ""}
                </div>
              </Card>
            ))}
          </div>

          <CongratsDialog
            open={showCongratsDialog}
            onOpenChange={setShowCongratsDialog}
            playerName={playerName}
            moves={moves}
            timeElapsed={timeElapsed}
            onPlayAgain={handlePlayAgain}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MemoryGame;
