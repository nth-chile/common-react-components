import React from "react";

export const FormSelect = (props) => (
	<select
		id={props.id || null}
		name={props.name}
		onChange={props.handleChange}
		type="select"
		value={props.defaultValue || ""}
	>
		<option
			disabled
			value=""
		>
			{props.placeholderText}
		</option>

		{props.values.map(val => (
			<option
				key={val.key}
				value={val.value}
			>
				{val.text}
			</option>
		))}
	</select>
)