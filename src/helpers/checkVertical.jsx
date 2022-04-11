/**
  [
    [1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ]
**/
export const checkVertical = (coordinates, player, model, setWinningSlots) => {
	let counter = 0;
	while (true) {
		// determine how many slots remain in array as vertical "counter"
		const vertCoords = coordinates[1] + counter + 1;
		// console.log(`vertCoords = ${coordinates[1]} + ${counter} + 1`)
		if (vertCoords === 6) {
			break;
		}
		counter += 1;
	}

	let backwardsCounter = 0;
	let winTracker = 0;
	const slotCoordinates = [];
	while (true) {
		const vertCoords =
			model.current[coordinates[0]][
				coordinates[1] + counter - backwardsCounter
			];
		// console.log(`model.current[${coordinates[0]}][${coordinates[1]} + ${counter} - ${backwardsCounter}]`)
		if (vertCoords === player) {
			winTracker += 1;
			slotCoordinates.push(
				coordinates[0],
				coordinates[1] + counter - backwardsCounter
			);
			// console.log("winTracker: "+winTracker)
			if (winTracker === 4) {
				setWinningSlots(slotCoordinates);
				return true;
			}
		} else {
			winTracker = 0;
		}
		// if index is going to be -1 for last loop break out of while
		if (coordinates[1] + counter - (backwardsCounter + 1) === -1) {
			break;
		}

		// increment for next loop
		backwardsCounter += 1;
	}
	return false;
};
