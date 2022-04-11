import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import Column from "../Column.jsx";
import Slot from "../Slot.jsx";
import { 
  playTurn,
  checkVertical as vertical,
  checkHorizontal as horizontal,
  checkDiagonalUp as diagonalUp,
  checkDiagonalDown as diagonalDown
} from "../../helpers";
import DialogWinDisplay from "./DialogWinDisplay";
import DialogPlayers from "./DialogPlayers";
import ResetButton from "./ResetButton";
import Score from "./Score";

import "./game.css";
import "animate.css";

export default function Game() {
  const [board, setBoard] = useState([]);
  const [started, setStarted] = useState(false);
  const [winDisplay, setWinDisplay] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isOnePlayer, setIsOnePlayer] = useState(false);
  const [showPlayersModal, setShowPlayersModal] = useState(true);
  const [winningSlots, setWinningSlots] = useState([]);
  
  const model = useRef(null);
  const turn = useRef(1);
  const win = useRef(false);
  const score = useRef({ player1: 0, player2: 0 });

  // Create a matrix to track our players moves.
  const createGameBoardModel = () => {
    const newBoardModel = [];
    for (let i = 0; i < 7; i++) {
      const newColumnModel = [];
      for (let j=0; j < 6; j++) {
        newColumnModel.push(0);
      }
      newBoardModel.push(newColumnModel)
    }
    // console.log(newBoardModel)
    model.current = newBoardModel;
  };

  // Create a game board of components to display the board.
  const createGameBoard = () => {
    const [x1,y1,x2,y2,x3,y3,x4,y4] = winningSlots;
    const newBoard = [];
    for (let i = 0; i < 7; i++) {
      const newColumn = [];
      for (let j=0; j < 6; j++) {
        const isWinner = 
          (x1==i&&y1==j) || 
          (x2==i&&y2==j) || 
          (x3==i&&y3==j) || 
          (x4==i&&y4==j);

        const NewSlot = (
          <Slot 
            player={model.current[i][j]} 
            dropper={dropper} 
            coordinates={[i,j]}
            key={`slot-${i}${j}`}
            className={isWinner ? " win" : ""}
          />
        );
        newColumn.push(NewSlot);
      }
      const NewColumn = (
        <Column column={newColumn} key={"column-"+i} />
      );
      newBoard.push(NewColumn);
    }
    setBoard(newBoard);
  };

  useEffect(() => {
    createGameBoardModel();
    createGameBoard();
  }, []);
  
  useEffect(() => {
    createGameBoard();
  }, [winningSlots])

  const executeWin = player => {
    let playerText = "";
    if (player === 1) {
      playerText = "Red";
      if (!isOnePlayer) {
        turn.current = turn.current === 1 ? 2 : 1;
      }
      score.current.player1 += 1;
    } else if (player === 2) {
      playerText = "Black";
      score.current.player2 += 1;
      if (!isOnePlayer) {
        turn.current = turn.current === 2 ? 1 : 2;
      }
    }

    win.current = true;
    setShowModal(true);
    setWinDisplay(
      <div className={classNames("winner", {
        "win-player1": player === 1,
        "win-plaery2": player === 2
      })}>{`${playerText} Won the game! `}
      </div>
    );
    if (isOnePlayer) {
      turn.current = 1;
    }
   };
 
  const dropper = (coordinates, isComputerturn = false) => {
    console.log("dropper")
    if (win.current) return;
    let landingCoordinates = [];
    const drop = () => {  
      for (
        let y = 0; y < model.current[coordinates[0]].length; y++
      ) {
        // Use the first available "default" slot 
        if (model.current[coordinates[0]][y] === 0) {
          model.current[coordinates[0]][y] = turn.current;
          landingCoordinates.push(coordinates[0], y);
          break;
        }
      }
        
      // refresh game board display
      createGameBoard();  

      const check = func => 
        func(
          landingCoordinates, 
          turn.current, 
          model, 
          setWinningSlots
        );
        
      switch (true) {
        case check(diagonalUp):
        case check(horizontal):
        case check(vertical):
        case check(diagonalDown):
          return executeWin(turn.current);
        default:
          turn.current = turn.current === 1 ? 2 : 1;
      }
    };
    // *todo
    // this setTimeout doesn't work
    if (isComputerturn) {
      setTimeout((landingCoordinates)=> {
        drop();
      },500, landingCoordinates)      
    } else {
      drop();
    }
   };

  /*
    Computer Player Logic
    (computer player logic (still a bit dumb but better))
  */
  useEffect(() => {  
    if (isOnePlayer && turn.current === 2) {
      playTurn({ model, dropper });      
    }
  }, [turn.current]);

  const handleReset = () => {
    setWinningSlots([]);
    createGameBoardModel();
    createGameBoard();
    setWinDisplay('');
    win.current = false;
  };

  return (
    <>
      <Score score={score} />

      <div className="current-turn">
        {turn.current === 2 ? "Black" : "Red"}'s Turn</div>

      <div className={classNames("game", {
        "is-win": win.current
      })}>{board}</div>

      <ResetButton onClick={handleReset} />

      <DialogWinDisplay 
        showModal={showModal} 
        setShowModal={setShowModal} 
        winDisplay={winDisplay}
      />
      <DialogPlayers 
        showPlayersModal={showPlayersModal}
        setShowPlayersModal={setShowPlayersModal}
        setIsOnePlayer={setIsOnePlayer}
      />
    </>
  )
}
