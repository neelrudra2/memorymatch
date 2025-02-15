import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NameDialog = ({ open, setOpen, nameInput, setNameInput, onSubmit }) => {
  const handleStartGame = () => {
    if (nameInput.trim()) {
      onSubmit();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="pointer-events-auto">
        <DialogHeader>
          <DialogTitle>Welcome to Memory-Match!</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <label className="text-sm font-medium mb-2 block">
            Please enter your name to begin:
          </label>
          <Input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter your name"
            onKeyPress={(e) => e.key === "Enter" && handleStartGame()}
          />
        </div>
        <DialogFooter>
          <Button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleStartGame}
            disabled={!nameInput.trim()}
          >
            Start Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NameDialog;
