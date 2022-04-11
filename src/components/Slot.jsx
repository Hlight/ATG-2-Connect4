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
    const props = {
      className: "slot",
      onClick: null
    };
    switch(player){
      case 1:
        props.className = `${props.className} player1 ${className}`;
        break;
      case 2:
        props.className = `${props.className} player2 ${className}`;
        break;
      default:
        props.onClick = handleClick;
        props.className = `${props.className} default`;
    }
    return <div {...props}></div>
  };
  
  return (
    <>{getSlot()}</>
  )
}