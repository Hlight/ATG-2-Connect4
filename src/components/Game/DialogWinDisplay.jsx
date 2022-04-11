import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle
} from "@material-ui/core";

export default ({showModal, setShowModal, winDisplay}) => {
	return (
		<Dialog
			open={showModal}
			disableEscapeKeyDown
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{winDisplay}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description" />
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setShowModal(false)} color="primary">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};
