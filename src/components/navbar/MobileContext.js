import React, { Component } from 'react'

export default class MobileContext extends Component {
    render() {
        return (
            <div style={{display: this.props.active ? 'block' : 'none'}}>
                <div className="mobile-context">
                    <ul className="mobile-context-options">
                        {
                            this.props.links.map( link => {
                                if (link.link !== this.props.route) {
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
