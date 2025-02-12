import IntroVideo from '../components/IntroVideo'
import NumberSection from '../components/NumberSection'
import SchoolSection from '../components/schoolTypes/SchoolSection'
import InfoSection from '../components/InfoSection/InfoSection'
import ContactSection from '../components/ContactSection'

const Home = () => {
  return (
    <div className='flex bg-white flex-col items-center justify-center md:mt-[10vw] lg:mt-0 overflow-hidden'>
        <IntroVideo/>
        <SchoolSection/>
        <InfoSection/>
        <ContactSection/>
        <NumberSection/>
    </div>
  )
}

export default Home