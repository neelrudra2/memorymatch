// components/CongratsDialog.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Timer, Award } from "lucide-react";

const CongratsDialog = ({
  open,
  onOpenChange,
  playerName,
  moves,
  timeElapsed,
  onPlayAgain,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-center text-2xl flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Congratulations!
        </DialogTitle>
      </DialogHeader>
      <div className="py-6">
        <div className="flex flex-col items-center space-y-4">
          <Award className="w-16 h-16 text-yellow-500" />
          <h2 className="text-xl font-semibold text-center">
            Well done, {playerName}! 🎉
          </h2>
          <div className="space-y-2 text-center">
            <p className="flex items-center justify-center gap-2">
              <Timer className="w-5 h-5" />
              Time: {timeElapsed}
            </p>
            <p className="flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5" />
              Moves: {moves}
            </p>
          </div>
        </div>
      </div>
      <DialogFooter className="flex justify-center">
        <Button
          onClick={onPlayAgain}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
        >
          Play Again
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default CongratsDialog;
