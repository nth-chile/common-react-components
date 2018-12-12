import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Ionicon from "react-ionicons";
import { mapPastDateToElapsedTime, sortDiscussionMessages } from "../helpers";
import {
  MarkdownInput,
  Star,
  Upvote
} from "../components";

class UnconnectedDiscussionMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: false,
      replyContent: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleStartReply = this.handleStartReply.bind(this);
    this.handleSubmitReply = this.handleSubmitReply.bind(this);
    this.toggleCollapseMsg = this.toggleCollapseMsg.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  }

  handleMarkdownInputChange = (html) => {
    this.setState({ replyContent: html })
  }

  // :messageId refers to the message that is being replied to
  handleStartReply(e, messageId) {
    e.preventDefault();

    if (!this.props.auth || this.props.auth.status !== "is_auth_user") {
      // Not logged in. Show alert
      this.props.showModal(e, "NoAuth");
    } else if (this.props.discussion.discussion.status === "locked") {
      // Post locked. Show alert
      this.props.showModal(e, "PostLocked");
    } else {
      this.props.handleStartReply(messageId);
    }
  }

  handleSubmitReply(e) {
    e.preventDefault();

    this.props.handleSubmitReply(this.state.replyContent, this.props.branch.id);
    this.setState({ replyContent: '' });
  }

  toggleCollapseMsg(e) {
    e.preventDefault();

    this.setState({ isCollapsed: !this.state.isCollapsed})
  }

  render() {
    const { auth, branch, replyFormPosition } = this.props;
    const showReplyForm = replyFormPosition === branch.id;

    // Sort replies
    if ( branch.replies && branch.replies.length ) {
      // branch.replies = branch.replies.sort((a, b) => {
      //   if (!b.upvotes || !a.upvotes || b.upvotes.length === a.upvotes.length) {
      //     return new Date(b.timestamp) - new Date(a.timestamp)
      //   }
        
      //   return b.upvotes.length - a.upvotes.length;
      // })

      branch.replies = branch.replies.sort((a, b) => sortDiscussionMessages(a, b))

    }

    return branch && (
      <div className={this.state.isCollapsed ? "ct-discussion-msg ct-discussion-msg--collapsed" : "ct-discussion-msg"}>
        <button 
          className={"btn btn-link btn-expand"}
          onClick={this.toggleCollapseMsg}
        >
          {this.state.isCollapsed ? '\u2013' : '\u002b'}
          {/*<Ionicon
            icon="md-add"
            fontSize="17px"
          />*/}
        </button>

        <div className="ct-discussion-msg__inner-wrap">
          <div className="ct-discussion-msg__header">
            <div className="ct-discussion-msg__avatar" style={branch.avatar && { backgroundImage: `url(${branch.avatar})` }} />
            <Link to={`/user/${branch.userId}`}>{branch.userDisplayName}</Link>
            <span className="text-secondary" >{mapPastDateToElapsedTime(branch.timestamp)}</span>
            <Upvote
              itemId={branch.id}
              itemType="discussionMessage"
              upvotes={branch.upvotes || []}
              userId={auth.userId}
            />
            {console.log(this.props)}
            <Star itemType="discussionMessage" itemId={branch.id} urlParams={this.props.match.params} />
          </div>

          <div
            className="ct-discussion-msg__content"
            dangerouslySetInnerHTML={{__html: branch.message}}
          >
          </div>

          <input
            className="ct-discussion-msg__reply-btn btn btn-link"
            onClick={ e => this.handleStartReply(e, branch.id) }
            type="button"
            value="Reply"
          />

          {(branch.replies || showReplyForm) &&
            <div className="ct-discussion-msg__replies-wrap">
              {/* Reply form */}
              {showReplyForm &&
                <div className="ct-discussion-msg__reply-form">
                  <div className="ct-discussion-msg__header">
                    <div className="ct-discussion-msg__avatar" style={auth.avatar && { backgroundImage: `url(${auth.avatar})` }} />
                    <Link to={`/user/${auth.userId}`}>{auth.displayName}</Link>
                  </div>

                  <MarkdownInput
                    className="form-control"
                    name="replyContent"
                    onChange={this.handleMarkdownInputChange}
                    rows="4"
                  />

                  <input
                    className="btn btn-sm btn-outline-secondary"
                    name="submitReply"
                    onClick={this.handleSubmitReply}
                    type="submit"
                    value="Submit"
                  />
                </div>
              }

              {// DiscussionMessage recursively renders all its replies as children
                branch.replies &&
                branch.replies.length > 0 && 
                branch.replies.map(reply =>
                  <DiscussionMessage
                    branch={reply}
                    key={reply.id}
                    handleStartReply={this.props.handleStartReply}
                    handleSubmitReply={this.props.handleSubmitReply}
                    messageId={reply.id}
                    replyFormPosition={replyFormPosition}
                    showModal={this.props.showModal}
                  />
                )
              }

          </div>
        }
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth,
  discussion: state.discussion,
});

const DiscussionMessage = withRouter(connect(
  mapStateToProps, 
  null
)(UnconnectedDiscussionMessage));

export { DiscussionMessage };
