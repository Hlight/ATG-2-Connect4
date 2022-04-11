export const getTwoInARowVertical = (player, model) => {
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
