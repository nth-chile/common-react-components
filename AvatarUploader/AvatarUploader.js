import React from "react"
import { connect } from "react-redux"
import { Button, UncontrolledAlert } from "reactstrap"
import axios from "axios"

import { db } from "../../firebase"
import { auth } from "../../firebase/firebase"
import Prompt from "../Prompt/Prompt"
import { SavedIcon } from "../Icons"

const SUPPORTED_MIMETYPES = ["image/gif", "image/jpeg", "image/png"]
const SUPPORTED_FILE_SIZE = 400000

/*
  TODO:
  - display loaders and success / error messages   / means log everything correctly
  - error only happens once
  - proptypes?
*/

class AvatarUploader extends React.Component {
  constructor(props) {
    super(props)

    this.uploadInput = React.createRef()

    this.counter = 0

    this.state = {
      avatarPreview: null,
      error: null,
      safe: null, // no nudity
      saved: null, // file is in S3
      updatedAvatar: null // file is your avatar
    }
  }

  componentDidUpdate() {
    const { onSetSingleUserById, authUser, user } = this.props

    // Get user profile
    if (authUser.uid && !user.uid && this.counter++ < 10) {
      db
        .onceGetSingleUserById(authUser.uid)
        .then(snapshot => onSetSingleUserById(snapshot.val()))
    }

    // Set user avatar...
    if (this.state.saved && this.state.safe && !this.state.updatedAvatar) {
      db
        .updateProfile(`${user.uid}`, {
          avatar: `https://s3.us-east-2.amazonaws.com/tolliapp/avatars/${
            user.uid
          }`
        })
        .then(() => {
          this.setState({
            updatedAvatar: true,
            saving: false
          })
        })
        .catch(err => console.log(err))
    }
  }

  cancel = e => {
    const { user } = this.props

    axios
      .post("/deleteavatar", {
        userId: user.uid
      })
      .then(res => {
        if (res.status === 200) {
          db
            .updateProfile(`${user.uid}`, { avatar: "" })
            .then(() => {
              this.setState({
                updatedAvatar: false, // So save button doesnt say "saved"
                saving: false // So save button doesnt say "saving" and so the condition in cdU doesn't pass and reverse this.
              })
            })
            .catch(err => console.log(err))
          this.setState({ saved: false })
        }
      })
      .catch(err => console.log(err))

    this.uploadInput.current.value = ""
    this.setState({ avatarPreview: null })
  }

  clearError = () => {
    this.setState({
      error: null
    })
  }

  handleChange = e => {
    const file = e.target.files[0]
    const isSupportedType = SUPPORTED_MIMETYPES.includes(file.type)
    const isSupportedSize = file.size <= SUPPORTED_FILE_SIZE

    if (isSupportedType && isSupportedSize) {
      const reader = new FileReader()

      reader.onload = e => {
        this.setState({
          avatarPreview: e.target.result,
          error: null
        })
      }

      reader.readAsDataURL(file)
    } else if (!isSupportedType) {
      this.uploadInput.current.value = ""
      this.setState({ error: "Unsupported file type." })
    } else if (!isSupportedSize) {
      this.uploadInput.current.value = ""
      this.setState({ error: "File too big. Maximum file size is 1MB." })
    } else {
      this.uploadInput.current.value = ""
      this.setState({ error: "Unknown error." })
    }
  }

  save = e => {
    this.setState({ saving: true })

    // Upload to S3 Bucket
    axios
      .post("/uploadavatar", {
        img: this.state.avatarPreview,
        userId: this.props.user.uid
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            saved: true
          })
        }
      })
      .catch(err => console.log(err))

    // Pass through Sightengine
    axios
      .post("/moderateimage", {
        img: this.state.avatarPreview
      })
      .then(res => {
        if (res.data.isSafe) {
          this.setState({
            safe: true
          })
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const { avatarPreview, error, saving, saved, updatedAvatar } = this.state

    const renderSaveBtn = () => {
      if (saving) {
        return (
          <Button className="btn-black" disabled>
            Saving…
          </Button>
        )
      }

      if (updatedAvatar) {
        return (
          <Button className="btn-black" disabled>
            Saved
          </Button>
        )
      }

      return (
        <Button className="btn-black" onClick={this.save}>
          Save
        </Button>
      )
    }

    return (
      <div className="avatar-uploader">
        <div className="avatar-preview">
          {this.state.avatarPreview && (
            <div
              alt="Avatar preview"
              className="avatar-preview__img"
              style={{
                background: `url(${
                  this.state.avatarPreview
                }) center/cover no-repeat`
              }}
            />
          )}
          <input
            id="upload-avatar"
            type="file"
            onChange={this.handleChange}
            ref={this.uploadInput}
          />
          <label className="tk-divulge text-center" htmlFor="upload-avatar">
            <h5>
              Upload<br />Your Photo
            </h5>
          </label>
        </div>

        {this.state.avatarPreview && (
          <div className="avatar-uploader__buttons">
            {renderSaveBtn()}
            <Button
              className="btn-black"
              disabled={!this.state.avatarPreview}
              onClick={this.cancel}
            >
              Remove
            </Button>
          </div>
        )}

        <Prompt isOpen={!!error} type="error">
          {`${error}`}
        </Prompt>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  user: state.userState.user,
  loading: state.userState.loading
})

const mapDispatchToProps = dispatch => ({
  onSetSingleUserById: user => dispatch({ type: "USERS_BY_ID_SET", user })
})

export default connect(mapStateToProps, mapDispatchToProps)(AvatarUploader)
