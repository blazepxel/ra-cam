import React, { Component } from 'react'
import { root } from 'baobab-react/higher-order'
import { withRouter } from 'react-router'

import storage from '~base/storage'
import api from '~base/api'
import tree from '~core/tree'
import ErrorPage from '~base/components/error-page'
import Loader from '~base/components/spinner'

import NavBar from '~components/navbar'
import Footer from '~components/footer'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      loaded: false,
      hasLoadError: false,
      error: '',
    }
  }

  async componentWillMount() {
    const userCursor = tree.select('user')

    userCursor.on('update', ({ data }) => {
      const user = data.currentData
      this.setState({ user })
    })

    let me
    if (tree.get('jwt')) {
      try {
        me = await api.get('/user/me')
      } catch (err) {
        if (err.status === 401) {
          storage.remove('jwt')
          tree.set('jwt', null)
          tree.set('expiredSession', true)
          tree.commit()

          this.props.history.push('/log-in')
        } else {
          return this.setState({
            loaded: true,
            hasLoadError: true,
            error: err.message,
          })
        }
      }

      if (me) {
        tree.set('user', me.user)
        tree.set('loggedIn', me.loggedIn)

        tree.commit()
      }
    }

    const config = await api.get('/app-config')

    tree.set('config', config)
    tree.commit()
    this.setState({ loaded: true })
  }

  render() {
    if (!this.state.loaded) {
      return <Loader className="loader-wrapper" />
    }

    if (this.state.hasLoadError) {
      return <ErrorPage message={this.state.error} />
    }

    let userData

    return (
      <div>
        <NavBar />
        {userData}
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default root(tree, withRouter(Layout))
