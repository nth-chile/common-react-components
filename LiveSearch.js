import React from "react";
import PropTypes from "prop-types";

class LiveSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
    };

    this.handleChange = this.handleChange.bind(this);
    // this.toggleSeeMore = this.toggleSeeMore.bind(this);
  }

  handleChange(e) {
    this.setState({ query: e.target.value.trim() });
  }

  // toggleSeeMore() {

  // }

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
        { this.props.listTitle && <div className="mb-2"><h4 className="d-inline-block mr-2">{this.props.listTitle}</h4> {this.props.children}</div> }
        <label htmlFor="live-search-input" className="sr-only" />
        <input
          className="form-control mb-2"
          id="live-search-input"
          name="liveSearchInput"
          placeholder={this.props.placeholder || "Search..." }
          onChange={this.handleChange}
        />
        <div className="ct-live-search__list-wrap">
          {renderList(this.props.list || [])}
        </div>
        {/* <button
          className="btn ct-live-search__see-more-btn"
          id="ct-live-search__see-more-btn"
          onClick={this.toggleSeeMore}
          type="button"
        /> */}
      </div>
    );
  }
}

LiveSearch.propTypes = {
  children: PropTypes.node, // Optional "Add new" button

  clickCallback: PropTypes.func,

  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,

  listTitle: PropTypes.string,

  placeholder: PropTypes.string
};

export { LiveSearch };
