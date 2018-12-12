import React from "react";
import PropTypes from "prop-types";

class TagEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ query: e.target.value.trim() });
  }

  render() {
    const renderList = (array) => {
      return array.length ? (
        <ul>
          {array.map(obj => {
            if (!this.state.query || obj.text.toLowerCase().indexOf(this.state.query.toLowerCase()) === 0) {
              return (
                <li key={obj.id} id={obj.id}>
                  <a href="javascript:void(0)" onClick={this.props.clickCallback || null}>{obj.text}</a>
                </li>
              );
            }
          })}
        </ul>
      ) : (
        <ul />
      );
    };

    return (
      <div className="ct-live-search">
        { this.props.listTitle && <div>{this.props.listTitle} {this.props.children}</div> }
        <label htmlFor="live-search-input" className="sr-only" />
        <input
          className="form-control"
          id="live-search-input"
          name="liveSearchInput"
          onChange={this.handleChange}
        />
        <div className="ct-live-search__list-wrap">
          {renderList(this.props.list || [])}
        </div>
      </div>
    );
  }
}

TagEditor.propTypes = {
  children: PropTypes.node, // Optional "Add new" button

  clickCallback: PropTypes.func,

  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,

  listTitle: PropTypes.string,
};

export { TagEditor };
