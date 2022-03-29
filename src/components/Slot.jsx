import React, { useState, useEffect } from "react";

export default function Slot({ 
  player, 
  coordinates, 
  dropper,
  className
}) {
  const handleClick = () => {
    dropper(coordinates);
  };
  const getSlot = () => {
    switch(player){
      case 1:
        return <div className={`slot player1 ${className}`}></div>
      case 2:
        return <div className={`slot player2 ${className}`}></div>
      default:
        return <div onClick={handleClick} className="slot default">{/*coordinates[0]},{coordinates[1]*/}</div> 
    }
  };
  
  return (
    <>{getSlot()}</>
  )
}