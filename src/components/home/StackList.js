import React, { Component } from 'react'

import { ReactComponent as NodeIcon } from '../../icons/stack/node.svg'
import { ReactComponent as RubyIcon } from '../../icons/stack/ruby.svg'
import { ReactComponent as ReactIcon } from '../../icons/stack/react.svg'
import { ReactComponent as MongoIcon } from '../../icons/stack/database.svg'
import { ReactComponent as GitIcon } from '../../icons/stack/git.svg'

import '../css/home/stack.css'

export default class StackList extends Component {
    render() {
        return (
            <div>
                <ul className="tech-stack">
                    <li>
                        <NodeIcon />
                        <p>NodeJs</p>
                    </li>
                    <li>
                        <GitIcon />
                        <p>GIT</p>
                    </li>
                    <li>
                        <MongoIcon />
                        <p>MongoDB</p>
                    </li>
                    <li>
                        <ReactIcon />
                        <p>React</p>
                    </li>
                    <li>
                        <RubyIcon />
                        <p>Ruby</p>
                    </li>
                </ul>
            </div>
        )
    }
}
