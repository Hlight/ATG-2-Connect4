export const getTwoInARowHorizontal = (player, model) => {
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
