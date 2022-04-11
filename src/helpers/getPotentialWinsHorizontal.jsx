export const getPotentialWinsHorizontal = (player, model) => {
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
          if ((y>0 && model.current[x+3][y-1] !== 0) || (y === 0)) {
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
