import React, { Component } from 'react'

import MediaQuery from 'react-responsive'
import Desktop from './home/Desktop'

//styles
import './css/home/news.css'

export default class Home extends Component {
    render() {
        return (
            <div>
                <MediaQuery minWidth={1200}>
                    <Desktop desktop={true}/>
                </MediaQuery>
                <MediaQuery minWidth={850} maxWidth={1200}>
                    <Desktop />
                </MediaQuery>
                <MediaQuery maxWidth={850}>
                    <Desktop mobile={true} />
                </MediaQuery>
            </div>
        )
    }
}
