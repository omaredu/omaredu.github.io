import React, { Component } from 'react'
import Desktop from './navbar/Desktop'

import MediaQuery from 'react-responsive'
import Mobile from './navbar/Mobile'

import { Redirect } from 'react-router-dom'

const links = [
    {
        title: "Home",
        link: "home"
    },
    {
        title: "Portfolio",
        link: "portfolio"
    },
    {
        title: "Blog",
        link: "blog"
    },
    {
        title: "Contact",
        link: "contact"
    },
    {
        title: "An Empty Page",
        link: "empty"
    },
]

export default class NavBar extends Component {
    render() {
        let path = window.location.pathname.slice(1)
        if (!path) {
            path = 'home'
        }
        return (
            <div>
                <MediaQuery minWidth={700}>
                    <Desktop links={links} location={path}/>
                </MediaQuery>
                <MediaQuery maxWidth={700}>
                    <Mobile links={links} location={path}/> 
                </MediaQuery>
            </div>
        )
    }
}
