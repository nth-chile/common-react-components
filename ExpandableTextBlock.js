/*
	options:
		text
			the text to truncate

		truncatedLength
			truncates text if it is longer than truncatedLength. defaults TRUNCATED_LENGTH_DEFAULT

		children
			any button-links that should appear next to the "show more/less" button
*/

const style = {
	lineHeight: 38
};

import React, { useEffect, useState } from "react";

const ExpandableTextBlock = (props) => {
	const [ isTruncated, setIsTruncated ] = useState(false);

	// Set truncatedLength
	const TRUNCATED_LENGTH_DEFAULT = 300;
	const truncatedLength = props.truncatedLength || TRUNCATED_LENGTH_DEFAULT;

	// Set shouldTruncate and truncatedText
	let shouldTruncate, truncatedText;
	if (props.text.length > truncatedLength) {
		shouldTruncate = true;
		truncatedText = props.text.slice(0, truncatedLength);
	}

	useEffect(() => {
		setIsTruncated(shouldTruncate)
	}, [shouldTruncate])

	return (
		<div>
			<div>
				{isTruncated ? truncatedText : props.text}
			</div>

			<div>
				{shouldTruncate && 
					<button
						className="btn btn-link pl-0"
						onClick={() => setIsTruncated(!isTruncated)}
					>
						{isTruncated ? "+ Show more" : "- Show less"}
					</button>
				}

				{
					props.children && shouldTruncate && 
					<React.Fragment>
						<div className="mx-1" style={{ lineHeight: "38px" }} >|</div>
						{props.children}
					</React.Fragment>
				}

				{
					props.children && !shouldTruncate && props.children
				}
			</div>
		</div>
	);
}

export { ExpandableTextBlock }