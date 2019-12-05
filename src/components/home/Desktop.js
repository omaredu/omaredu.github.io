import React, { Component } from 'react'
import MainNew from './MainNew'
import TitleSeparator from './TitleSeparator'
import MiniNew from './MiniNew'
import StackList from './StackList'

const mainNew = {
    action: 'Coding, designing & publishing:',
    project: 'Stoker Studio',
    image: '/proj/stoker.svg',
    colorOne: '#ff7246',
    colorTwo: '#ff068b',
    links: [
        {
            label: 'Github',
            link: '#'
        },
        {
            label: 'Behance',
            link: '#'
        },
        {
            label: 'Twitter',
            link: '#'
        }
    ]
}

const miniNews = [
    {
        id: 1,
        title: "Working on Tempo's new icon",
        image: 'https://media3.giphy.com/media/OqJbdoebcKVH5SHKAK/giphy.gif?cid=91eb0306db43222d6f71d4eda579f40adb67e202d8f8afd7&rid=giphy.gif',
        link: {
            label: 'Vote in Twitter',
            link: '#'
        }
    },
    {
        id: 2,
        title: "New shot on dribbble",
        image: 'https://media3.giphy.com/media/OqJbdoebcKVH5SHKAK/giphy.gif?cid=91eb0306db43222d6f71d4eda579f40adb67e202d8f8afd7&rid=giphy.gif',
        link: {
            label: 'See it',
            link: '#'
        }
    }
]

export default class Desktop extends Component {
    render() {
        let initialParallax = 300
        return (
            <div style={{ margin: `0 ${this.props.desktop ? '20%' : this.props.mobile ? '0' : '10%'}`}}>
                <TitleSeparator title="news" subtitle="Discover what i'm working on."/>
                <MainNew mainNew={mainNew} />
                <ul className="mini-news-list">
                    {
                        miniNews.map(miniNewContent => {
                            return (
                                <li>
                                    <MiniNew key={miniNewContent.id} miniNew={miniNewContent} parallax={initialParallax + (miniNewContent.id * 50)} />
                                </li>    
                            )
                        })
                    }
                </ul>
                <TitleSeparator title="Development stack" subtitle="My development stack  in growth..." />
                <StackList />
                <TitleSeparator title="About me" subtitle="Some information about me." />
            </div>
        )
    }
}
