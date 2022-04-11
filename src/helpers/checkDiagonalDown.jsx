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
export const checkDiagonalDown = (coordinates, player, model, setWinningSlots) => {
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
        setWinningSlots(slotCoordinates);
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
