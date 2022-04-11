export const getPotentialWinsDiagonalDown = (player, model) => {
  console.log("getPotentialWinsDiagonalDown")
  let x=0; 
  let y=0;
  let potentialWins=[];
  while (true) {
    console.log("while(true)...")
    // console.log("x: "+x)
    // console.log("y: "+y)
    if (model.current[x][y] === player &&
       x+1<7 && y-1>=0 && model.current[x+1][y-1] === player &&
        x+2<7 && y-2>=0 && model.current[x+2][y-2] === player
       ) {
        // # next slot
        if (
          // next diagonal down slot is open and..
          x+3<7 && y-3>=0 && model.current[x+3][y-3] === 0 
        ) {
          if (
            // if y-4>=0 check if playable i.e. slot below taken
            (y-4>=0 && model.current[x+3][y-4] !== 0) ||
            (y-3===0)
           ) {
          console.log("next slot available & playable")              
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
