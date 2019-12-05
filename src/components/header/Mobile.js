import React, { Component } from 'react'

import '../css/header/mobile.css'

import { ReactComponent as GithubIcon } from '../../icons/github.svg'
import { ReactComponent as TwitterIcon } from '../../icons/twitter.svg'
import { ReactComponent as YoutubeIcon } from '../../icons/youtube.svg'
import { ReactComponent as DribbbleIcon } from '../../icons/dribbble.svg'

export default class Mobile extends Component {
    render() {
        return (
            <div className='header-mobile'>
                <div className="mobile-content">
                    <img alt="profile" src={this.props.profile} />
                    <div className="mobile-description">
                        <h1>Omaredu</h1>
                        <strong>Developer & Designer</strong>
                    </div>
                </div>
                <ul className="social-links">
                    <a href="https://github.com/omaredu" target="_blank"><li><GithubIcon color="white" /></li></a>
                    <a href="https://twitter.com/omaredumx" target="_blank"><li><TwitterIcon color="white" /></li></a>
                    <a href="https://dribbble.com/omaredu" target="_blank"><li><DribbbleIcon color="white" /></li></a>
                    <a href="https://www.youtube.com/channel/UCFHFR-f5uyB0tt9NxwciI4A" target="_blank"><li><YoutubeIcon color="white" /></li></a>
                </ul>
                <p className="copy">&copy; 2019 omaredu</p>
            </div>
        )
    }
}
