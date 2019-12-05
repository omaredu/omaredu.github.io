import React, { Component } from 'react'

import menuIcon from '../../icons/menu.svg'
import '../css/navbar/mobile.css'
import MobileContext from './MobileContext'

export default class Mobile extends Component {
    state = {
        route: this.props.location,
        contextActive: false,
    }

    menuChange = () => {
        return this.setState({ contextActive: !this.state.contextActive })
    }

    render() {
        return (
            <div>
                <div className="menu-mobile">
                    <img onClick={this.menuChange} alt="menu" className="mobile-menu-icon" src={menuIcon} />
                    {
                        this.props.links.map( link => {
                            if (link.link === this.state.route) {
                                return <p key={link.link} className="mobile-selected">{link.title}</p>
                            }
                        })
                    }
                </div>
                <MobileContext active={this.state.contextActive} route={this.state.route} links={this.props.links} />
            </div>
        )
    }
}
