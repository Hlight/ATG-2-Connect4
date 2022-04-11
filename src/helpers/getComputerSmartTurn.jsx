// Get Computer Smart Turn
// not really that smart, attempting
export const getComputerSmartTurn = (player, model) => {
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