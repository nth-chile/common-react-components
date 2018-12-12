import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CRUDAction } from '../redux/actions';

const UnconnectedAvatarUploader = (props) => {
  const SUPPORTED_MIMETYPES = ['image/gif', 'image/jpeg', 'image/png'];
  const SUPPORTED_FILE_SIZE = 400000;

  const [ errMsg, setErrMsg ] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const isSupportedType = SUPPORTED_MIMETYPES.includes(file.type);
    const isSupportedSize = file.size <= SUPPORTED_FILE_SIZE;


    if (isSupportedType && isSupportedSize) {
      const reader = new FileReader();

      reader.onload = (e) => {
        props.CRUDAction({
          type: 'UPSERT_AVATAR',
          data: {
            img: e.target.result,
            userId: props.auth.userId
          }
        });
      }

      reader.readAsDataURL(file);
    } else {
      setErrMsg("Supported file types: gif, jpeg, png.");
    }
  }

  return (
    <React.Fragment>
      {
        errMsg &&
        <div className="alert alert-danger" role="alert">
          {errMsg}
        </div>
      }

      <label className="btn btn-link px-0">
        Upload Avatar
        <input
          className="d-none"
          type="file"
          onChange={handleChange}
        />
      </label>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const AvatarUploader = connect(
  mapStateToProps,
  {
    CRUDAction,
  }
)(UnconnectedAvatarUploader);

export { AvatarUploader };
