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
export const checkHorizontal = (coordinates, player, model, setWinningSlots) => {
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
        setWinningSlots(slotCoordinates);
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
