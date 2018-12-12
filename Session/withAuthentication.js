import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { firebase } from '../../firebase'

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    static propTypes = {
      onSetAuthUser: PropTypes.func.isRequired,
    }

    componentDidMount() {
      const { onSetAuthUser } = this.props

      firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          onSetAuthUser(authUser)
        } else {
          onSetAuthUser(null)
        }
      })
    }

    render() {
      return (
        <Component {...this.props} />
      )
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    onSetAuthUser: (authUser) => dispatch({ type: 'AUTH_USER_SET', authUser }),
  })

  return connect(null, mapDispatchToProps)(WithAuthentication)
}

export default withAuthentication
