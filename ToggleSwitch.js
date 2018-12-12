import React from 'react';

export const ToggleSwitch = (props) => {
	return (
		<label className="ct-toggle-switch">
			<div className="ct-toggle-switch__switch">
				<input
					checked={props.checked}
					name={props.name}
					id={props.id}
					onChange={props.handleChange}
					type='checkbox'
				/>
				<span className="ct-toggle-switch__slider"></span>
			</div>
			<span className="ct-toggle-switch__text">{props.text}</span>
		</label>
	)
}