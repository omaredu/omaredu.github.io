import React, { Component } from 'react'
import MediaQuery from 'react-responsive'

import Desktop from './header/Desktop'
import Mobile from './header/Mobile'

export default class Header extends Component {
    state = {
        profile: "https://i.imgur.com/wbYWZA0.jpg"
    }
    render() {
        return (
            <div>
                <MediaQuery minWidth={1000}>
                    <Desktop profile={this.state.profile} />
                </MediaQuery>
                <MediaQuery maxWidth={1000}>
                    <Mobile profile={this.state.profile}/>
                </MediaQuery>
            </div>
        )
    }
}
