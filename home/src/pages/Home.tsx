import IntroVideo from '../components/IntroVideo'
import NumberSection from '../components/NumberSection'
import SchoolSection from '../components/schoolTypes/SchoolSection'
import InfoSection from '../components/InfoSection/InfoSection'
// import OurServices from '../components/OurServices'
// import { InfiniteMovingCardsDemo } from '../components/MovingCards'
const Home = () => {
  return (
    <div className='flex bg-white flex-col items-center justify-center md:mt-[10vw] lg:mt-0 overflow-hidden'>
        {/* <Navbar/> */}
        <IntroVideo/>
        {/* <Welcome/> */}
        {/* <OurServices/> */}
        <SchoolSection/>
        <NumberSection/>
        <InfoSection/>
        {/* <InfiniteMovingCardsDemo/> */}
       

    </div>
  )
}

export default Home