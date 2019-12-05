import React, { Component } from 'react'

import '../css/navbar/desktop.css'

export default class Desktop extends Component {
    state = {
        route: this.props.location
    }

    render() {
        return (
            <div className="desktop-options-menu">
                <div>
                    <ul className="desktop-options">
                        {
                            this.props.links.map(link => {
                                if (link.link === this.state.route) {
                                    return <li key={link.link} className="selected">{link.title}</li>
                                }
                                else {
                                    return <li key={link.link}><a href={"/" + link.link}>{link.title}</a></li>
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
