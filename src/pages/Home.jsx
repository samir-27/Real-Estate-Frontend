import ExploreProperties from '../components/ExploreProperties'
import Hero from '../components/Hero'
import PropertyTypes from '../components/PropertyTypes'
import ReviewList from '../components/Reviews'

const Home = () => {
  return (
    <div className='bg-blue-50'>
      <Hero />
      <ExploreProperties />
      <PropertyTypes />
      <ReviewList />
    </div>
  )
}

export default Home