import IntroVideo from '../../components/IntroVideo'
import NumberSection from '../../components/NumberSection'
import SchoolSection from '../../components/schoolTypes/SchoolSection'
import InfoSection from '../../components/InfoSection/InfoSection'
import ContactSection from '../../components/ContactSection'
// import VisitorCounter from '../../components/VisitorCounter'

const Home = () => {
  return (
    <div className='flex bg-white flex-col items-center justify-center mt-[165px] lg:mt-[0px] '>
      {/* <VisitorCounter/> */}
        <IntroVideo/>
        <SchoolSection/>
        <InfoSection/>
        <ContactSection/>
        <NumberSection/>
    </div>
  )
}

export default Home