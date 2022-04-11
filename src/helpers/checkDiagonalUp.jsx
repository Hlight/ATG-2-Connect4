/**
  [
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ]
**/
export const checkDiagonalUp = (coordinates, player, model, setWinningSlots) => {  
  let counter = 0;
  while (true) {
    // check if at board column end
    if (coordinates[0] + counter + 1 === 7) {
      break;
    // check if at slots end
    } else if (coordinates[1] + counter + 1 === 6) {
      break;
    }
    // number of diagonalUp slots til board end
    counter += 1;
  }

  let backwardsCounter = 0;
  let winTracker = 0;
  const slotCoordinates = [];
  while (true) {
    const diagonalUpCoordinates =
      model.current[coordinates[0] + counter - backwardsCounter]
      [coordinates[1] + counter - backwardsCounter];
    // console.log(`model.current[${coordinates[0]} + ${counter} - ${backwardsCounter}]
      // [${coordinates[1]} + ${counter} - ${backwardsCounter}]`)
    if (
      diagonalUpCoordinates === player
    ) {
      slotCoordinates.push(
        coordinates[0] + counter - backwardsCounter,
        coordinates[1] + counter - backwardsCounter
      );
      winTracker += 1;
      // console.log("winTracker", winTracker)
      if (winTracker === 4) {
        setWinningSlots(slotCoordinates);
        return true
      }
    } else {
      winTracker = 0;
    }
    
    // if x index is going to be -1 for last loop break out of while
    if (coordinates[0] + counter - (backwardsCounter + 1) === -1) {
      break;
    // if y index is going to be -1 for last loop break out of while
    } else if (coordinates[1] + counter - (backwardsCounter + 1) === -1) {
      break;
    }
   
    backwardsCounter += 1;
  }
  return false      
};
