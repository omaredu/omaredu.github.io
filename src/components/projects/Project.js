import React, { Component } from 'react'

import arrow from '../../icons/arrow.svg'

import '../css/projects/project.css'

export default class Project extends Component {
    render() {
        return (
            <div className="project-container" style={styles.projectContainer}>
                <div className="project-canvas" style={{ background: `linear-gradient(45deg, ${this.props.colorOne}, ${this.props.colorTwo}`}}>
                    <img alt={this.props.name} src={this.props.picture} />
                </div>
                <div className="project-description" style={styles.infoContainer}>
                    <p style={styles.name}>{this.props.name}</p>
                    <img alt="arrow" src={arrow} />
                </div>
            </div>
        )
    }
}

const styles = {
    name: {
        textDecoration: 'none',
        color: 'black'
    },
    infoContainer: {
        justifyContent: 'space-between',
        height: '5em'
    },
}
