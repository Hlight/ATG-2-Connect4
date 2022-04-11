export const getComputerTurn = (model) => {
  let xCoord = Math.floor(Math.random() * 6);
  let yCoord = Math.floor(Math.random() * 5);
  for (let x=0; x<7; x++) {
    for (let y=0; y<6; y++) {
      if (model.current[x][y] === 2) {
        xCoord = x;
        yCoord = y;
        
        if (x-1!==-1 && model.current[x-1][y] === 0) {
          xCoord = x-1;
        } 
        if (y-1!==-1 && model.current[x][y-1] === 0) {
          yCoord = y-1;
        }
        if (x+1<7 && model.current[x+1][y] === 0) {
          xCoord = x+1;
        }
        if (y+1<6 && model.current[x][y+1] === 0) {
          yCoord = y+1;
        }
      } 
    }
  }
  return [xCoord, yCoord];
};
