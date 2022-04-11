export const getPotentialWinsVertical = (player, model) => {
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