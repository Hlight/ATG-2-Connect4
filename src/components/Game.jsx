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

  // Game a game board of components to display the board.
  const createGameBoard = () => {
    const [x1,y1,x2,y2,x3,y3,x4,y4] = winningSlots;
    console.log("createGameBoard: winningSlots")
    console.log(winningSlots)
    const newBoard = [];
    for (let i = 0; i < 7; i++) {
      const newColumn = [];
      for (let j=0; j < 6; j++) {
        const isWinner = 
          (x1==i&&y1==j) || 
          (x2==i&&y2==j) || 
          (x3==i&&y3==j) || 
          (x4==i&&y4==j);
        if (isWinner) {
        console.log(`
const isWinner = 
          (${x1}==${i}&&${y1}==${j}) || 
          (${x2}==${i}&&${y2}==${j}) || 
          (${x3}==${i}&&${y3}==${j}) || 
          (${x4}==${i}&&${y4}==${j});`)
        console.log(isWinner)
          console.log(isWinner ? " win" : "")
          
        }
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

  const highlightWinningSlots = coordinates => {
    // const [x1,y1,x2,y2,x3,y3,x4,y4] = coordinates;
    // console.log(x1, y1, x2, y2, x3, y3,x4,y4)
    // console.log(board)
    setWinningSlots(coordinates);
  };
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
    const slotCoordinates = [];
    while (true) {
      const vertCoords = 
        model.current[coordinates[0]][coordinates[1] + counter - backwardsCounter];
      // console.log(`model.current[${coordinates[0]}][${coordinates[1]} + ${counter} - ${backwardsCounter}]`)
      if (vertCoords === player) {
        winTracker += 1;
        slotCoordinates.push(
          coordinates[0],
          coordinates[1] + counter - backwardsCounter
        );
        // console.log("winTracker: "+winTracker)
        if (winTracker === 4) {
          highlightWinningSlots(slotCoordinates);
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
    const slotCoordinates = [];
    while (true) {
      if (
        model.current[coordinates[0] + counter - backwardsCounter]
       [coordinates[1]] === player
      ) {
        winTracker += 1;
        slotCoordinates.push(
          coordinates[0] + counter - backwardsCounter,
          coordinates[1]
        );
        if (winTracker === 4){
          highlightWinningSlots(slotCoordinates);
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
    const slotCoordinates = [];
    while (true) {
      const diagonalUpCoordinates =
        model.current[coordinates[0] + counter - backwardsCounter]
        [coordinates[1] + counter - backwardsCounter];
      // console.log(`model.current[${coordinates[0]} + ${counter} - ${backwardsCounter}]
        // [${coordinates[1]} + ${counter} - ${backwardsCounter}]`)
      if (
        diagonalUpCoordinates === player
      ) {
        slotCoordinates.push(
          coordinates[0] + counter - backwardsCounter,
          coordinates[1] + counter - backwardsCounter
        );
        winTracker += 1;
        // console.log("winTracker", winTracker)
        if (winTracker === 4) {
          highlightWinningSlots(slotCoordinates);
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
    let winTracker = 0;
    const slotCoordinates = [];
    while(true){
      if (
        model.current[coordinates[0] + 
        counter - backwardsCounter][coordinates[1] -
        counter + backwardsCounter] === player
      ) {
        slotCoordinates.push(
          coordinates[0] + counter - backwardsCounter,
          coordinates[1] - counter + backwardsCounter
        );
        winTracker += 1
        if (winTracker === 4) {
          highlightWinningSlots(slotCoordinates);
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
    createGameBoard();    
    
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
    console.log("line 301 win.current: "+win.current)
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

  /*
    Computer Player Logic
  */
  const getPotentialWinsVertical = (player) => {
    console.log("getPotentialWinsVertical")
    let x=0; 
    let y=0; 
    let potentialWins=[];
    while (true) {
      if (
        model.current[x][y] === player &&
        (y+1!==6 && model.current[x][y+1] === player) &&
        (y+2!==6 && model.current[x][y+2] === player)
      ) {
        // next slot is available
        if (y+3!==6 && model.current[x][y+3] === 0) {
          potentialWins.push(x, y+3);
          console.log(`potentialWins.push(${x}, ${y}+3);`)
        }
        // no prev slot on vertical win
      }
      y++;
      if (y >= 6) {
        y=0;
        x++;
        if (x >= 7) {
          break;
        }
      }
    }
    console.log(potentialWins)
    return potentialWins;
  };
  const getTwoInARowVertical = player => {
    console.log("getTwoInARowVertical")
    let x=0; 
    let y=0; 
    let potentialWins=[];
    while (true) {
      if (
        model.current[x][y] === player &&
        (y+1!==6 && model.current[x][y+1] === player)
      ) {
        // next slot is available
        if (y+2!==6 && model.current[x][y+2] === 0) {
          potentialWins.push(x, y+2);
        }
        // no prev slot on vertical win
      }
      y++;
      if (y >= 6) {
        y=0;
        x++;
        if (x >= 7) {
          break;
        }
      }
    }
    console.log(potentialWins)
    return potentialWins;    
  };
  const getPotentialWinsHorizontal = (player) => {
    console.log("getPotentialWinsHorizontal")
    let x=0; 
    let y=0; 
    let potentialWins=[];
    while (true) {
      if (
        // check for x,x,x,0 or 0,x,x,x
        model.current[x][y] === player &&
        (x+1!==7 && model.current[x+1][y] === player) &&
        (x+2!==7 && model.current[x+2][y] === player)
      ) {
        // # next slot
        if (
          // next column over is open
          x+3!==7 && model.current[x+3][y] === 0
         ) {
            // next slot under is taken too
            // ensures the potential win is playable on next turn
            if (y>0 && model.current[x+3][y-1] !== 0) {
              potentialWins.push(x+3, y);
            } else if (y === 0) {
              potentialWins.push(x+3, y);
            }
        }
      // # prev slot
        if (
          // previous column to 3x potential win is open
          x-1>=0 && model.current[x-1][y] === 0
        ) {
          // previus col slot under avail is also taken
          // ensures the potential win is playable on next turn
          if (y>0 && model.current[x-1][y-1] !== 0) {
            potentialWins.push(x-1, y);
          } else if (y === 0) {
            potentialWins.push(x-1, y);
          }
        }
      } else if (
        // check for x,x,0,x
        model.current[x][y] === player &&
        (x+1!==7 && model.current[x+1][y] === player) &&
        (x+2!==7 && model.current[x+2][y] === 0) &&
        (x+3!==7 && model.current[x+3][y] === player)
      ) {
        // check if slot below open one is taken
        if ((x+2!==7 && y-1>=0 && model.current[x+2][y-1] !== 0) ||
           (x+2!==7 && y===0)
         )  {
          potentialWins.push(x+2, y);
        }
      } else if (
        // check for x,0,x,x
        model.current[x][y] === player &&
        (x+1!==7 && model.current[x+1][y] === 0) &&
        (x+2!==7 && model.current[x+2][y] === player) &&
        (x+3!==7 && model.current[x+3][y] === player)
      ) {
        // check if slot below open one is taken
        if ((x+1!==7 && y-1>=0 && model.current[x+1][y-1] !== 0) ||
           (x+2!==7 && y===0)
         )  {
          potentialWins.push(x+1, y);
        }
      }
      x++;
      if (x >= 7) {
        y++;
        x=0;
        if (y >= 6) {
          break;
        }
      }
    }
    console.log(potentialWins)
    return potentialWins;
  };
  const getTwoInARowHorizontal = player => {
    console.log("getTwoInARowHorizontal")
    let x=0; 
    let y=0; 
    let potentialWins=[];
    while (true) {
      if (
        // check for x,x,0 or 0,x,x
        model.current[x][y] === player &&
        (x+1!==7 && model.current[x+1][y] === player)
      ) {
        // # next slot
        if (
          (x+2!==7 && model.current[x+2][y] === 0) &&
          // check slot below is taken OR y is 1st element in array
          ((y-1>=0 && model.current[x+2][y-1] !== 0) || y===0)
         ) {
          potentialWins.push(x+2, y);
        }
        // # prev slot
        if (
          (x-1>=0 && model.current[x-1][y] === 0) &&
          // check slot below is taken OR y is 1st element in array
          ((y-1>=0 && model.current[x-1][y-1] !== 0) || y===0)
        ) {
          potentialWins.push(x-1, y);
        }
      }
      x++;
      if (x >= 7) {
        y++;
        x=0;
        if (y >= 6) {
          break;
        }
      }
    }
    console.log(potentialWins)
    return potentialWins;
  };
  const getPotentialWinsDiagonalUp = (player) => {
    console.log("getPotentialWinsDiagonalUp")
    let x=0; 
    let y=0; 
    let potentialWins=[];
    while (true) {
      if (
        model.current[x][y] === player &&
        (x+1<7 && y+1<6 && model.current[x+1][y+1] === player) &&
        (x+2<7 && y+2<6 && model.current[x+2][y+2] === player)
       ) {
        // # next slot
        if (
          // next diagonal up slot is open and..
          (x+3<7 && y+3<6 && model.current[x+3][y+3] === 0) &&
          // playable i.e. slot below taken
          model.current[x+3][y+2] !== 0
        ) {
          potentialWins.push(x+3, y+3);
        }
        
        // # prev slot
        if (
          // prev diagonal down slot is open and playable
          x>0 && y>0 && model.current[x-1][y-1] === 0
        ) {
          if (
            // higher up, check slot below to be taken
            // ensures prev diag down slot playable
            y>1 && model.current[x-1][y-2] !== 0
          ) {
            potentialWins.push(x-1, y-1);
          } else if (y-1 === 0) {
            potentialWins.push(x-1, y-1);
          }
        }
      } else if (
        // check for x,
        //            x,
        //             0,
        //              x
        model.current[x][y] === player &&
        (x+1<7 && y+1<6 && model.current[x+1][y+1] === player) &&
        (x+2<7 && y+2<6 && model.current[x+2][y+2] === 0) &&
        (x+3<7 && y+3<6 && model.current[x+3][y+3] === player)
      ) {
        if (x+2<7 && y+1<6 && model.current[x+2][y+1] !== 0) {
          potentialWins.push(x+2, y+2);
        }
      } else if (
        // check for x,
        //            0,
        //             x,
        //              x
        model.current[x][y] === player &&
        (x+1<7 && y+1<6 && model.current[x+1][y+1] === 0) &&
        (x+2<7 && y+2<6 && model.current[x+2][y+2] === player) &&
        (x+3<7 && y+3<6 && model.current[x+3][y+3] === player)
      ) {
        if (x+1<7 && model.current[x+1][y] !== 0) {
          potentialWins.push(x+1, y+1);
        }
      }
      x++;
      // potential diagonal up requires at least three slots
      if (x === 7) {
        y++;
        x=0;
      }
      // potential diagonal up requires at least three slots
      if (y === 6) {
        break;
      }
    }
    console.log(potentialWins)
    return potentialWins;
  };
  const getPotentialWinsDiagonalDown = (player) => {
    console.log("getPotentialWinsDiagonalDown")
    let x=0; 
    let y=0;
    let potentialWins=[];
    while (true) {
      console.log("while(true)...")
      console.log("x: "+x)
      console.log("y: "+y)
      if (model.current[x][y] === player &&
         x+1<7 && y-1>=0 && model.current[x+1][y-1] === player &&
          x+2<7 && y-2>=0 && model.current[x+2][y-2] === player
         ) {
          // # next slot
          if (
            // next diagonal down slot is open and..
            x+3<7 && y-3>=0 && model.current[x+3][y-3] === 0 
          ) {
            // if y-4>=0 check if playable i.e. slot below taken
            if (y-4>=0 && model.current[x+3][y-4] !== 0) {
            console.log("next slot available & playable")
              
              potentialWins.push(x+3, y-3);  
            } else if (y-3===0) {
              potentialWins.push(x+3, y-3);
            }
            
          }
          // # prev slot
          if (
            // prev diagonal down slot is open and playable
            x>0 && model.current[x-1][y+1] === 0
          ) {
            if (
              // higher up, check slot below to be taken
              // ensures prev diag down slot playable
              model.current[x-1][y] !== 0
            ) {
              console.log("prev slot available & playable")
              potentialWins.push(x-1, y+1);
            }
          } 
      }
      x++;
      // potential diagonal down requires at least three slots
      if (x === 7) {
        y++;
        x=0;
      }
      // potential diagonal down requires at least three slots
      if (y === 6) {
        break;
      }
    }
    console.log(potentialWins)
    return potentialWins;
  };
  // Get Computer Smart Turn
  // not really that smart, attempting
  const getComputerSmartTurn = (player) => {
    let x=0;
    let y=0;
    let potentialPlays = 0;
    let potentials = [];
    let forwardsPlays = 0;
    let backwardsPlays = 0;
    while (true) {
      if (model.current[x][y] === player || model.current[x][y] === 1) {
        potentialPlays += 1;
        // check horizontal forwards
        if (x+1<7 && model.current[x+1][y] === 0) {
          forwardsPlays += 1;
        }
        if (x+2<7 && model.current[x+2][y] === 0) {
          forwardsPlays += 1;
        }
        if (x+3<7 && model.current[x+3][y] === 0) {
          forwardsPlays += 1;
        }
        // check horizontal backwards
        if (x-1>=0 && model.current[x-1][y] === 0) {
          backwardsPlays += 1;
        }
        if (x-2>=0 && model.current[x-2][y] === 0) {
          backwardsPlays += 1;
        }
        if (x-3>=0 && model.current[x-3][y] === 0) {
          backwardsPlays += 1;
        }
        if (potentialPlays + forwardsPlays >= 4) {
          if (forwardsPlays) {
            potentials.push(x+1,y);
          }
          if (backwardsPlays) {
            potentials.push(x-1,y);
          }
        }
      } else {
        potentialPlays = 0;
        backwardsPlays = 0;
        forwardsPlays = 0;
      }
      x++;
      if (x === 7) {
        x=0;
        y++;
        if (y === 6) {
          break;
        }
      }
    }// <-end while
    console.log("getComputerSmartTurn: " + potentials.toString())
    return potentials;
  };
  const getComputerTurn = () => {
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
          if (x+1<7 && model.current[x+1][y] === 0) {
            xCoord = x+1;
          }
          if (y+1<6 && model.current[x][y+1] === 0) {
            yCoord = y+1;
          }
        } 
      }
    }
    return [xCoord, yCoord];
  };
  // computer player logic (still a bit dumb but better)
  useEffect(() => {
    if (isOnePlayer && turn.current === 2) {
      let xCoord;
      let yCoord;
      // check vertical potential opponent wins
      let potentialWins = [];
      // switch (Math.floor(Math.random() * 3)) {
      switch (3) {
        case 0: 
            // get player 1 two in a row to block in case no other potentials
            potentialWins = [...getTwoInARowHorizontal(1), ...potentialWins];
          break;
        case 1:
          potentialWins = [...getTwoInARowVertical(1), ...potentialWins];
          break;
        case 2:
          potentialWins = [...getTwoInARowHorizontal(1), ...potentialWins];
          potentialWins = [...getTwoInARowVertical(1), ...potentialWins];
          break;
        default:
      }
  
      
      // get player 2 potentials to seal the deal for computer
      // potentialWins = [...getPotentialWinsVertical(2), ...potentialWins];
      potentialWins = [...getPotentialWinsHorizontal(2), ...potentialWins];
      potentialWins = [...getPotentialWinsDiagonalUp(2), ...potentialWins];
      potentialWins = [...getPotentialWinsDiagonalDown(2), ...potentialWins];
      // if player 1 has potentials block them so putting this after player 2 above
      // potentialWins = [...getPotentialWinsVertical(1),...potentialWins];
      potentialWins = [...getPotentialWinsHorizontal(1),...potentialWins];
      potentialWins = [...getPotentialWinsDiagonalUp(1),...potentialWins];
      potentialWins = [...getPotentialWinsDiagonalDown(1),...potentialWins];
      
      console.log("potentialWins: "+potentialWins)
      console.log("potentialWins.length: "+potentialWins.length)

      const smarterTurn = []//getComputerSmartTurn(2);

      if (potentialWins.length) {
        xCoord = potentialWins[0];
        yCoord = potentialWins[1];
      } else if (smarterTurn.length) {
        xCoord = smarterTurn[0];
        yCoord = smarterTurn[1];
      } else {
        const computerTurn = getComputerTurn();
        xCoord = computerTurn[0];
        yCoord = computerTurn[1];
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

      <div className="current-turn">
        {turn.current === 2 ? "Black" : "Red"}'s Turn</div>

      <div className={classNames("game", {
        "is-win": win.current
      })}>{board}</div>
      <div className="win-reset">
          <Button
            variant="contained"
            className="btn-reset"
            onClick={() => {
              setWinningSlots([]);
              createGameBoardModel();
              createGameBoard();
              setWinDisplay("");
              win.current = false;
            }}>Reset</Button>      
      </div>

      {/* dialogs can be moved to their own components */}
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
          <Button onClick={() => setShowModal(false)} color="primary">
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
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <select onChange={(e) =>
              setIsOnePlayer(e.target.value === "1")} className="player-select">
              
              <option value="1">1</option>
              <option value="2" selected>2</option>
            </select>
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
