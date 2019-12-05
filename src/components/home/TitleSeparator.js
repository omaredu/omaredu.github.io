import React, { Component } from 'react'

export default class TitleSeparator extends Component {
    render() {
        let { title, subtitle } = this.props
        return (
            <div className="separator-container">
                <p className="title">{title}</p>
                <p className="subtitle">{subtitle}</p>
            </div>
        )
    }
}
