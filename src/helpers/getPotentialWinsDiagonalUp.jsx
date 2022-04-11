export const getPotentialWinsDiagonalUp = (player, model) => {
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
