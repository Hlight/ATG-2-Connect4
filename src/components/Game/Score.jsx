import React from "react";

export default ({ score }) => (
  <div className="score">
    Red: {score.current.player1}<br />
    Black: {score.current.player2}
  </div>  
);
