import React, { Component } from 'react'
import Project from './Project'

import Columned from 'react-columned'

import {Link } from 'react-router-dom'
export default class Desktop extends Component {
    render() {
        return (
            <div className="alo" style={this.props.desktop ? {margin: '0 15%'} : null}>
                <Columned columns={this.props.mobile ? 1 : 3}>
                    {
                        this.props.projects.map(project => {
                            return (
                                <Link key={project.name} to={`/portfolio/${project.name}`} style={{textDecoration: 'none'}}>
                                    <div>
                                        <Project 
                                            colorOne={project.colorOne} 
                                            colorTwo={project.colorTwo} 
                                            picture={project.picture} 
                                            name={project.name} />
                                    </div>
                                </Link> 
                            )
                        })
                    }
                    
                </Columned>
            </div>
        )
    }
}
