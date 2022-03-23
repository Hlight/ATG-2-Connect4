import React, { useState, useEffect, useRef } from "react";
import Column from "./Column.jsx";
import Slot from "./Slot.jsx";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle
} from "@material-ui/core";
import classNames from "classnames";
import "./game.css";

export default function Game() {
  const [board, setBoard] = useState([]);
  const [started, setStarted] = useState(false);
  const [winDisplay, setWinDisplay] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isOnePlayer, setIsOnePlayer] = useState(false);
  const [showPlayersModal, setShowPlayersModal] = useState(true);
  
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

  // Game a game board of components to display the board.
  const createGameBoard = () => {
    const newBoard = [];
    for (let i = 0; i < 7; i++) {
      const newColumn = [];
      for (let j=0; j < 6; j++) {
        const NewSlot = (
          <Slot 
            player={model.current[i][j]} 
            dropper={dropper} 
            coordinates={[i,j]}
            key={`slot-${i}${j}`} 
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

  /**
    [
      [1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ]
  **/
  const checkVertical = (coordinates, player) => {
    let counter = 0;
    while(true){
      // determine how many slots remain in array as vertical "counter"
      const vertCoords = coordinates[1] + counter + 1;
      // console.log(`vertCoords = ${coordinates[1]} + ${counter} + 1`)
      if(vertCoords === 6){
        break;
      } 
      counter += 1;
    }

    let backwardsCounter = 0;
    let winTracker = 0;
    while (true) {
      const vertCoords = 
        model.current[coordinates[0]][coordinates[1] + counter - backwardsCounter];
      // console.log(`model.current[${coordinates[0]}][${coordinates[1]} + ${counter} - ${backwardsCounter}]`)
      if (vertCoords === player) {
        winTracker += 1;
        // console.log("winTracker: "+winTracker)
        if (winTracker === 4) {
          return true
        }
      } else {
        winTracker = 0;
      }
      // if index is going to be -1 for last loop break out of while
      if (coordinates[1] + counter - (backwardsCounter + 1) === -1) {
        break;
      }

      // increment for next loop
      backwardsCounter += 1;

    }
    return false;
  };
  /**
    [
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ]
  **/
  const checkHorizontal = (coordinates, player) => {
    let counter = 0
    while (true) {
      // once at the end of game columns break
      if(coordinates[0] + counter + 1 === 7){
        break;
      }
      // number of horizontal splots to board end
      counter += 1;
    }
  
    let backwardsCounter = 0
    let winTracker = 0
    while (true) {
      if (
        model.current[coordinates[0] + counter - backwardsCounter]
       [coordinates[1]] === player
      ) {
        winTracker += 1
        if (winTracker === 4){
          return true
        }
      } else {
        winTracker = 0
      }
  
      // if index is going to be -1 for last loop break out of while
      if (
        coordinates[0] + counter - 
        (backwardsCounter + 1) === -1
      ) {
        break;
      }
       
      backwardsCounter += 1;
    }
  
    return false;
  };

  /**
    [
      [1, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ]
  **/
  const checkDiagonalUp = (coordinates, player) => {  
    let counter = 0;
    while (true) {
      // check if at board column end
      if (coordinates[0] + counter + 1 === 7) {
        break;
      // check if at slots end
      } else if (coordinates[1] + counter + 1 === 6) {
        break;
      }
      // number of diagonalUp slots til board end
      counter += 1;
    }

    let backwardsCounter = 0;
    let winTracker = 0;
    while (true) {
      const diagonalUpCoordinates =
        model.current[coordinates[0] + counter - backwardsCounter]
        [coordinates[1] + counter - backwardsCounter];
      // console.log(`model.current[${coordinates[0]} + ${counter} - ${backwardsCounter}]
        // [${coordinates[1]} + ${counter} - ${backwardsCounter}]`)
      if (
        diagonalUpCoordinates === player
      ) {
        winTracker += 1;
        // console.log("winTracker", winTracker)
        if (winTracker === 4) {
          return true
        }
      } else {
        winTracker = 0;
      }
      
      // if x index is going to be -1 for last loop break out of while
      if (coordinates[0] + counter - (backwardsCounter + 1) === -1) {
        break;
      // if y index is going to be -1 for last loop break out of while
      } else if (coordinates[1] + counter - (backwardsCounter + 1) === -1) {
        break;
      }
     
      backwardsCounter += 1;
    }
    return false      
  };

  /**
    [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0]
    ]
  **/
  const checkDiagonalDown = (coordinates, player) => {
    console.log(coordinates)
    let counter = 0;
    while(true){
      // determine how many slots remain in array as horizontal "counter"
      if (coordinates[0] + counter + 1 === 7) {
          break;
      } else if (coordinates[1] - counter - 1 === -1) {
          break;
      }
      counter += 1;
    }

    let backwardsCounter = 0
    let winTracker = 0
    while(true){
      if (
        model.current[coordinates[0] + 
        counter - backwardsCounter][coordinates[1] -
        counter + backwardsCounter] === player
      ) {
        winTracker += 1
        if (winTracker === 4) {
          return true
        }
      } else {
        winTracker = 0
      }

      // if x index is going to be -1 for last loop break out of while
      if (
        coordinates[0] + counter - 
        (backwardsCounter +1) === -1
      ) {
        break;
      // if y index is going to be  for last loop break out of while
      } else if (coordinates[1] - counter + (backwardsCounter + 1) === 6) {
        break;
      }
      backwardsCounter += 1;
    }
    
    return false;
  };

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
 
  const dropper = (coordinates) => {
    if (win.current) return;
    let landingCoordinates = [];
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
    console.log(model.current)
    createGameBoard();    

    switch (true) {
      case checkDiagonalUp(landingCoordinates, turn.current):
      case checkHorizontal(landingCoordinates, turn.current):
      case checkVertical(landingCoordinates, turn.current):
      case checkDiagonalDown(landingCoordinates, turn.current):
        return executeWin(turn.current);
      default:
        turn.current = turn.current === 1 ? 2 : 1;
    }
   };

  // computer player logic (pretty dumb atm)
  useEffect(() => {
    if (isOnePlayer && turn.current === 2) {
      let xCoord = Math.floor(Math.random() * 6);
      let yCoord = Math.floor(Math.random() * 5);
      for (let x=0; x<7; x++) {
        for (let y=0; y<6; y++) {
          if (model.current[x][y] === 2) {
            xCoord = x;
            yCoord = y;
            
            if (x-1!==-1 && model.current[x-1][y] === 0) {
              xCoord = x-1;
            } 
            if (y-1!==-1 && model.current[x][y-1] === 0) {
              yCoord = y-1;
            }
            if (x+1!==7 && model.current[x+1][y] === 0) {
              xCoord = x+1;
            }
            if (y+1!==6 && model.current[x][y+1] === 0) {
              yCoord = y+1;
            }
          } 
        }
      }
      dropper([xCoord,yCoord]);
      console.log("computer turn!");
    }
  }, [turn.current]);

  
  
  return (
    <>
      <div className="score">
        Red: {score.current.player1}<br />
        Black: {score.current.player2}
      </div>

      <div className={classNames("game", {
        "is-win": win.current
      })}>{board}</div>
      <div className="win-reset">
        {win.current && (
          <Button
            variant="contained"
            className="btn-reset"
            onClick={() => {
              createGameBoardModel();
              createGameBoard();
              setWinDisplay("");
              win.current = false;
            }}>Reset</Button>      
        )}
      </div>

      <Dialog
        open={showModal}
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {winDisplay}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setShowModal(false);
          }} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showPlayersModal}
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Select 1 or 2 players.
          <select onChange={(e) => {
            if (e.target.value === "1") {
              setIsOnePlayer(true);
            } else if (e.target.value === "2") {
              setIsOnePlayer(false);
            }
          }}>
            <option>-</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setShowPlayersModal(false);
          }} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
