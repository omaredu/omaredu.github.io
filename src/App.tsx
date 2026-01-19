import { useRef, useEffect } from 'react'

import Header from '@components/header'
import AppCard from './components/app-card'
import Button from './components/button'
import LatestProject from './components/latest-project'
import MapCard from './components/map-card'
import ProjectCard from './components/project-card'
import SocialCard from './components/social-card'
import Title from './components/title'

function App() {
  const portfolioRef = useRef<HTMLDivElement>(null)

  const checkScroll = (element: Element) => {
    const { scrollLeft, scrollWidth, clientWidth } = element

    if (scrollLeft > 0) {
      element.classList.remove('border-l-transparent')
      element.classList.add('border-l-border/10')
    } else {
      element.classList.remove('border-l-border/10')
      element.classList.add('border-l-transparent')
    }

    if (scrollLeft + clientWidth < scrollWidth) {
      element.classList.remove('border-r-transparent')
      element.classList.add('border-r-border/10')
    } else {
      element.classList.remove('border-r-border/10')
      element.classList.add('border-r-transparent')
    }
  }

  useEffect(() => {
    const portfolio = portfolioRef.current
    if (!portfolio) { return }

    checkScroll(portfolioRef.current as Element)
    portfolio.onscroll = e => checkScroll(e.target as Element)
  }, [portfolioRef])

  return (
    <>
      <Header />
      <section className="flex flex-col gap-[30px] my-[120px] md:w-[640px] md:max-w-[640px]">
        <Title
          animated
          className='max-w-[335px]'
          title="Hi 👋 I'm Omar Sánchez. A developer and designer based in Monterrey, NL."
          subtitle='I strive to create the most delightful and innovative digital experiences with attention to detail'
        />
        <div className='scrollable flex gap-[15px] overflow-x-auto -mx-[20px] px-[20px] py-[10px]'>
          <SocialCard
            alt='Github'
            icon='/social/github.svg'
            title='/omaredu'
            domain='github.com'
            url='https://github.com/omaredu'
          />
          <SocialCard
            alt='X'
            icon='/social/x.svg'
            title='@omaredumx'
            domain='x.com'
            url='https://x.com/@omaredumx'
          />
          <SocialCard
            alt='LinkedIn'
            icon='/social/linkedin.svg'
            title='/in/omaredu'
            domain='linkedin.com'
            url='https://www.linkedin.com/in/omaredu'
          />
          <SocialCard
            alt='Dribbble'
            icon='/social/dribbble.svg'
            title='@omaredu'
            domain='dribbble.com'
            url='https://dribbble.com/omaredu'
          />
        </div>
      </section>
      <section className='-mx-[20px] md:mx-0 md:w-full'>
        <LatestProject />
      </section>
      <section id="apps" className='mt-[50px] flex flex-col gap-[30px] md:w-[640px] md:max-w-[640px]'>
        <Title
          className='max-w-[335px]'
          title='🙌 My Favorite Apps'
          subtitle='Here are a couple of apps that I would recommend to anyone and I use in my daily activities.'
        />
        <div className='scrollable flex gap-[15px] overflow-x-auto -mx-[20px] px-[20px] py-[10px]'>
          <AppCard
            icon='/app/duolingo.png'
            name='Duolingo'
            description='My favorite app to practice English and learn Czech'
            url='https://apps.apple.com/us/app/duolingo-language-lessons/id570060128'
          />
          <AppCard
            icon='/app/headway.png'
            name='Headway'
            description='I love learning stuff and discovering new books here'
            url='https://apps.apple.com/us/app/headway-fun-easy-growth/id1457185832'
          />
          <AppCard
            icon='/app/1password.png'
            name='1Password'
            description='My favorite place to store all my passwords and secrets...'
            url='https://apps.apple.com/us/app/1password-8-password-manager/id1511601750'
          />
        </div>
      </section>
      <section id="portfolio" className='mt-[50px] flex flex-col gap-[30px] md:w-[640px] md:max-w-[640px]'>
        <Title
          className='max-w-[335px]'
          title='👀 Wanna Take a Look to My Recent Work?'
          subtitle="Sure! I've worked on many projects, but here are some of my favorite ones and the ones I'm most proud of."
        />
        <div className='scrollable flex gap-[15px] overflow-x-auto -mx-[20px] px-[20px] py-[10px] md:border-l md:border-r border-l-transparent border-r-transparent transition duration-300' ref={portfolioRef}>
          <ProjectCard
            icon='/projects/together.svg'
            name='Together'
            description='We developed it in just a couple of days for a hackathon to make the fight against COVID-19 easier'
            url='https://devpost.com/software/together-a1e8t2'
            label='View on Devpost'
          />
          <ProjectCard
            icon='/projects/game_of_life.svg'
            name='Game of Life (Ruby)'
            description="A simple implementation of Conway's Game of Life in Ruby using Ruby2D"
            url='https://github.com/Omaredu/game_of_life'
            label='View on GitHub'
          />
          <ProjectCard
            icon='/projects/tempo.svg'
            name='Tempo'
            description='Check current weather in your location with a smooth and open source experience'
            label='Go to Webpage'
            url='/Tempo'
          />
          <ProjectCard
            icon='/projects/pew.svg'
            name='PEW'
            description='A Space Invaders like game made in 3 days for simple game jam 4'
            label='View on Itch.io'
            url='https://omaredu.itch.io/pew-by-omaredu'
          />
        </div>
      </section>
      <section id="places" className='mt-[50px] flex flex-col gap-[30px] md:w-[640px] md:max-w-[640px]'>
        <Title
          className='max-w-[335px]'
          title='🧳 My Favorite Places'
          subtitle="Traveling is one of the greatest experiences I've ever had, and I'd love to share with you my favorite ones so far."
        />
        <div className='flex flex-col gap-[15px] md:flex-row'>
          <MapCard
            className='h-[280px] md:h-full'
            image='/maps/mexico.png'
            url='https://en.wikipedia.org/wiki/Mexico'
            flag='🇲🇽'
          />
          <div className='flex gap-[15px] md:flex-col'>
            <MapCard
              className='h-[145px] md:h-[145px] md:w-[170px]'
              image='/maps/slovakia.png'
              url='https://en.wikipedia.org/wiki/Slovakia'
              flag='🇸🇰'
            />
            <MapCard
              className='h-[145px]'
              image='/maps/poland.png'
              url='https://en.wikipedia.org/wiki/Poland'
              flag='🇵🇱'
            />
          </div>
        </div>
      </section>
      <section className='my-[50px] flex flex-col gap-[30px] md:w-[640px] md:max-w-[640px]'>
        <Title
          className='max-w-[335px]'
          title='📧 Email Me'
          subtitle="I'd love to hear from you, so feel free to send me an email and I'll get back to you as soon as possible."
        />
        <a href="mailto:me@omaredu.com"><Button kind='primary' className='py-[12px]'>Send Me an Email</Button></a>
      </section>
      <footer className='flex flex-col py-[50px] items-center border-t border-border/10 gap-[20px] md:w-[640px] md:max-w-[640px] md:justify-between md:flex-row'>
        <img src="/logo_gray.svg" alt='Omaredu logo gray' />
        <p className='text-sm text-secondary'>&copy; 2025 All Rights Reserved.</p>
      </footer>
    </>
  )
}

export default App
