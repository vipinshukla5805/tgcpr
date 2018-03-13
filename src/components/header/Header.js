import React from 'react';

const CreateWorkOrderHeader = (props) => {
	return (
    <div className="jumbotron">
			<h4 className="w3-bar w3-left">
				{props.headerTitle}
			</h4>
		</div>
	);
}

export default CreateWorkOrderHeader;
