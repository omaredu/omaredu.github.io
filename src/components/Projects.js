import React, { Component } from 'react'
import MediaQuery from 'react-responsive'

import projects from '../projects/projects.json'
import Desktop from './projects/Desktop.js'
import ProjectOverlay from './projects/ProjectOverlay.js'

export default class Projects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project: props.match.params.project
        }
    }

    render() {
        let {project} = this.state
        document.body.style.overflow = 'unset'
        return (
            <div>
                <ProjectOverlay projectProps={project} /> 
                <MediaQuery minWidth={1400}>
                    <Desktop desktop={true} projects={projects.projects} />
                </MediaQuery>
                <MediaQuery minWidth={700} maxWidth={1400}>
                    <Desktop projects={projects.projects} />
                </MediaQuery>
                <MediaQuery maxWidth={700}>
                    <Desktop mobile={true} projects={projects.projects} />
                </MediaQuery>
            </div>
        )
    }
}
