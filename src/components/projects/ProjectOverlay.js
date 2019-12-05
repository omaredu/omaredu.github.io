import React, { Component } from 'react'
import { markdown } from 'markdown'
import { Link } from 'react-router-dom'

import { ReactComponent as CloseIcon } from '../../icons/close.svg'

import projects from '../../projects/projects.json'

export default class ProjectOverlay extends Component {
    state = {
        markdownProject: '',
        project: {
            "name": "",
            "picture": "",
            "url": "",
            "colorOne": "#ececec",
            "colorTwo": "#ececec",
            "overviewImage": "",
            "markdown": "/proj/markdown/empty.md",
            "links": [
                
            ]
        }
    }

    async componentDidMount() {
        let { projectProps } = await this.props
        projects.projects.map(project => {
            if (project.name === projectProps) {
                this.setState({ project: project })
            }
        })

        let projectContent = await fetch(this.state.project.markdown)
        let projectContentPlain = await projectContent.text()

        this.setState({ markdownProject: projectContentPlain })
    }

    closeOverlay = () => {
        //window.location = '/portfolio'
        document.body.style.overflow = 'unset'
    }

    render() {
        let projectMarkdown = markdown.toHTML(this.state.markdownProject)
        let {projectProps} = this.props
        if (projectProps) {
            document.body.style.overflow = 'hidden'
        }
        return (
            <div className="project-overlay" style={{display: projectProps ? 'block' : 'none' }}>
                <Link to='/portfolio' style={{textDecoration: 'none'}}><CloseIcon onClick={this.closeOverlay} className="project-overlay-close" /></Link>
                <div className="project-title-canvas" style={{ color: this.state.project.theme === "dark" ? "white" : null, backgroundColor: this.state.project.theme === "dark" ? '#212121' : 'white'}}>
                    <div style={{background: `linear-gradient(45deg, ${this.state.project.colorOne}, ${this.state.project.colorTwo})`}}>
                        <img src={this.state.project.picture} />
                        <ul className="project-overlay-links">
                            {
                                this.state.project.links.map(link => 
                                    <a key={link.label} href={link.url}><li>{link.label}</li></a>    
                                )
                            }
                        </ul>
                    </div>
                    <div className="project-image-canvas" style={{ backgroundImage: `linear-gradient(0deg, ${this.state.project.theme === "dark" ? "#212121" : "white"}, transparent), url(${this.state.project.overviewImage})`}} />
                    <article className="project-content-md" dangerouslySetInnerHTML={{ __html: projectMarkdown }} />
                </div>
            </div>
        )
    }
}
