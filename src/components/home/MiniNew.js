import React, { Component } from 'react'
import { Parallax } from 'react-parallax'

export default class MiniNew extends Component {
    render() {
        let { miniNew } = this.props
        return (
            <Parallax
                bgImage={miniNew.image}
                strength={this.props.parallax} 
            >
                <div className="mini-new-container" >
                    <h2>
                        {miniNew.title}
                    </h2>
                    <a href={miniNew.link.link}>{miniNew.link.label}</a>
                </div>
            </Parallax>
        )
    }
}
