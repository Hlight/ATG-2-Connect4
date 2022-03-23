import React from "react";

export default function Slot({ 
  player, 
  coordinates, 
  dropper
}) {
  const handleClick = () => {
    dropper(coordinates);
  };
  const getSlot = () => {
    switch(player){
      case 1:
        return <div className="slot player1"></div>
      case 2:
        return <div className="slot player2"></div>
      default:
        return <div onClick={handleClick} className="slot default">{/*coordinates[0]},{coordinates[1]*/}</div> 
    }
  };
  
  return (
    <>{getSlot()}</>
  )
}