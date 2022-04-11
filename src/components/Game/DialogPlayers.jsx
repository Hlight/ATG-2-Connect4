import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle
} from "@material-ui/core";

export default ({ 
  showPlayersModal,
  setShowPlayersModal, 
  setIsOnePlayer 
}) => (
  <Dialog
    open={showPlayersModal}
    disableEscapeKeyDown
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Select 1 or 2 players.
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        <select onChange={(e) =>
          setIsOnePlayer(e.target.value === "1")} className="player-select">
          
          <option value="1">1</option>
          <option value="2" selected>2</option>
        </select>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => {
        setShowPlayersModal(false);
      }} color="primary">
        Done
      </Button>
    </DialogActions>
  </Dialog>
);
