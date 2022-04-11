import React from "react";
import { 
  getPotentialWinsVertical,
  getPotentialWinsDiagonalUp,
  getPotentialWinsDiagonalDown,
  getPotentialWinsHorizontal,
  getTwoInARowVertical,
  getTwoInARowHorizontal,
  getComputerSmartTurn,
  getComputerTurn
} from "../helpers";

export const playTurn = ({ model, dropper }) => {
  let xCoord;
  let yCoord;
  // check vertical potential opponent wins
  let potentialWins = [];

  // DISABLED 2-in-row vertical (not really useful)
  // potentialWins = [...getTwoInARowVertical(1, model), ...potentialWins];
  
  potentialWins = [...getTwoInARowHorizontal(1,model), ...potentialWins];
  
  // get player 2 potentials to seal the deal for computer
  potentialWins = [...getPotentialWinsVertical(2, model), ...potentialWins];
  potentialWins = [...getPotentialWinsHorizontal(2, model), ...potentialWins];
  potentialWins = [...getPotentialWinsDiagonalUp(2, model), ...potentialWins];
  potentialWins = [...getPotentialWinsDiagonalDown(2, model), ...potentialWins];
  // if player 1 has potentials block them so putting this after player 2 above
  potentialWins = [...getPotentialWinsVertical(1, model),...potentialWins];
  potentialWins = [...getPotentialWinsHorizontal(1, model),...potentialWins];
  potentialWins = [...getPotentialWinsDiagonalUp(1, model),...potentialWins];
  potentialWins = [...getPotentialWinsDiagonalDown(1, model),...potentialWins];
  
  // console.log("potentialWins: "+potentialWins)

  const smarterTurn = []//getComputerSmartTurn(2, model);

  if (potentialWins.length) {
    xCoord = potentialWins[0];
    yCoord = potentialWins[1];
  } else if (smarterTurn.length) {
    xCoord = smarterTurn[0];
    yCoord = smarterTurn[1];
  } else {
    const computerTurn = getComputerTurn(model);
    xCoord = computerTurn[0];
    yCoord = computerTurn[1];
  }

  dropper([xCoord,yCoord]);

};
