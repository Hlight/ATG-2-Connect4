import React from 'react';
import { Button } from "@material-ui/core";
export default ({ onClick }) => (
	<div className="win-reset">
		<Button
			variant="contained"
			className="btn-reset"
			onClick={onClick}
		>
			Reset
		</Button>
	</div>
);
