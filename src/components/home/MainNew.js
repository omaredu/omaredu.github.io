import React, { Component } from 'react'

export default class MainNew extends Component {
    render() {
        let { mainNew } = this.props
        return (
            <div className='main-new-container' style={{ background: `linear-gradient(45deg, ${mainNew.colorOne}, ${mainNew.colorTwo})` }}>
                <div className="main-new">
                    <p>
                        {mainNew.action}
                        <br/>
                        <strong>{mainNew.project}</strong>
                    </p>
                    <img src={mainNew.image} />
                </div>
                <ul className="links">
                    {
                        mainNew.links.map(link => 
                            <a key={link.link} href={link.link}><li>{link.label}</li></a>
                        )
                    }
                </ul>
            </div>
        )
    }
}
