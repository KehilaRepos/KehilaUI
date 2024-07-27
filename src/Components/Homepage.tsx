import HomePageOpener from './HomePageOpener'
import BasicSearch from './BasicSearch'
import { LiveFeed } from './LiveFeed'
import { PopularPosts } from './PopularPosts'
import NewsLetter from './NewsLetter'

const Homepage = () => {
  return (
    <>

        <HomePageOpener />
        <BasicSearch />
        <LiveFeed />
        <PopularPosts />
        <NewsLetter />

    </>
  )
}

export default Homepage