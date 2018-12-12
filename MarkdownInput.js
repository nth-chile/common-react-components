import React, { useEffect, useRef, useState } from 'react';
import marked from 'marked';
import _ from 'lodash';

class MarkdownInput extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {
	    html: '',
	  };

	  this.handleChange = this.handleChange.bind(this);
	  this.throttledHandleChange = _.throttle(this.throttledHandleChange.bind(this), 300);
	}

	handleChange(e) {
		this.throttledHandleChange(e.target.value)
	};

	throttledHandleChange(markdownInput) {
		const html = marked(
			markdownInput,
			{ sanitize: true }
		);

		this.props.onChange(html);
	}

	render() {
		return (
			<textarea
				className={this.props.className || ''}
				onChange={this.handleChange}
				placeholder={this.props.placeholder || ''}
				rows={this.props.rows || '10'}
			/>
		);
	};
}

export { MarkdownInput };