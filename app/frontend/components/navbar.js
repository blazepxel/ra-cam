/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable jsx-quotes */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import { NavLink } from '~base/router'
import { branch } from 'baobab-react/higher-order'
import { withRouter } from 'react-router'

import storage from '~base/storage'
import api from '~base/api'
import tree from '~core/tree'

import raCamLogo from '../../public/img/racam.png'

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileMenu: 'close',
      redirect: false,
      profileDropdown: 'is-hidden',
      dropCaret: 'fa fa-caret-down',
    }

    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setWrapperRef(node) {
    this.wrapperRef = node
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        profileDropdown: 'is-hidden',
        dropCaret: 'fa fa-caret-down',
      })
    }
  }

  toggleBtnClass() {
    if (this.wrapperRef) {
      if (this.state.profileDropdown === 'is-hidden') {
        this.setState({
          profileDropdown: 'is-active',
          dropCaret: 'fa fa-caret-up',
        })
      } else {
        this.setState({
          profileDropdown: 'is-hidden',
          dropCaret: 'fa fa-caret-down',
        })
      }
    }
  }

  async handleLogout() {
    const { history } = this.props

    try {
      await api.del('/user')
    } catch (err) {
      console.log('Error removing token, logging out anyway ...')
    }

    storage.remove('jwt')
    tree.set('jwt', null)
    tree.set('user', null)
    tree.set('loggedIn', false)
    tree.commit()

    history.push('/')
  }

  handleNavbarBurgerClick() {
    if (this.state.mobileMenu === 'open') {
      this.setState({ mobileMenu: 'close' })
    } else {
      this.setState({ mobileMenu: 'open' })
    }
  }

  render() {
    let navbarMenuClassName = 'navbar-menu'
    if (this.state.mobileMenu === 'open') {
      navbarMenuClassName = 'navbar-menu is-active'
    }

    let navButtons
    let navMainLink
    let avatar
    let username
    if (this.props.loggedIn) {
      avatar = 'http://1bigappstore.com/images/avt-default.jpg'

      if (tree.get('user')) {
        username = tree.get('user').screenName
      }

      navButtons = (
        <div className="navbar-end">
          <div className="navbar-item is-size-7 has-text-grey is-capitalized">
            Welcome {username}
          </div>
          <div className="is-flex is-align-center">
            <img
              className="is-rounded"
              src={avatar}
              width="40"
              height="45"
              alt="Avatar"
            />
          </div>
          <div className="dropdown is-active is-right" ref={this.setWrapperRef}>
            <div className="dropdown-trigger is-flex">
              <a
                href="javascript:undefined"
                className="navbar-item"
                onClick={() => this.toggleBtnClass()}
              >
                <span className="icon">
                  <i className={this.state.dropCaret} />
                </span>
              </a>
            </div>
            <div className={this.state.profileDropdown}>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <NavLink
                    className="dropdown-item"
                    onClick={() => this.toggleBtnClass()}
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                  <a
                    className="dropdown-item"
                    onClick={() => this.handleLogout()}
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

      navMainLink = (
        <NavLink exact className="navbar-item" to="/app">
          <img src={raCamLogo} alt="ra cam" />
        </NavLink>
      )
    } else {
      navButtons = (
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              {/* <p className='control'>
              <NavLink className='bd-tw-button button' to='/log-in'>Log in</NavLink>
            </p>
            <p className='control'>
              <NavLink className='bd-tw-button button is-primary' to='/sign-up'>Sign up</NavLink>
            </p> */}
              <NavLink className="navbar-item" exact to="#">
                Home
              </NavLink>
              <NavLink className="navbar-item" exact to="#">
                AR app
              </NavLink>
              <NavLink className="navbar-item" exact to="#">
                Solutions
              </NavLink>
              <NavLink className="navbar-item" exact to="#">
                Pricing
              </NavLink>
              <NavLink className="navbar-item" exact to="/log-in">
                Login
              </NavLink>
            </div>
          </div>
        </div>
      )

      navMainLink = (
        <NavLink className="navbar-item" exact to="/">
          <img src={raCamLogo} alt="ra cam" />
        </NavLink>
      )
    }

    return (
      <nav className="navbar" role="navigation">
        <div className="navbar-brand">
          {navMainLink}

          <div
            className="navbar-burger burger"
            onClick={(e) => this.handleNavbarBurgerClick(e)}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className={navbarMenuClassName}>
          <div className="navbar-start">
            {/* <NavLink className='navbar-item' to='/about'>
              About
            </NavLink> */}
          </div>
          {navButtons}
        </div>
      </nav>
    )
  }
}

export default withRouter(
  branch(
    {
      loggedIn: 'loggedIn',
    },
    NavBar,
  ),
)
