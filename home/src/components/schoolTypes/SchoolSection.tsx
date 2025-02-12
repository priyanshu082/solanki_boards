import { useState } from 'react'
import ImageCard from './ImageCard'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

// Image imports remain the same as in the original file
import primaryYearsImage from '../../assets/images/img2.jpeg'
import middleYearsImage from '../../assets/images/img4.jpeg'
import upperYearsImage from '../../assets/images/img16.jpeg'
import diplomaProgrammeImage from '../../assets/images/img6.jpeg'
import certificateProgrammeImage from '../../assets/images/img1.jpeg'
import researchProgrammeImage from '../../assets/images/img11.jpeg'

const SCHOOL_SECTIONS = [
    {
        title: 'Middle Years Programme',
        position: { top: 50, left: 80 },
        image: primaryYearsImage
    },
    {
        title: 'Upper Years Programme',
        position: { top: 265, left: 40 },
        image: middleYearsImage
    },
    {
        title: 'Under Graduate Programme',
        position: { top: 100, left: 438 },
        image: upperYearsImage
    },
    {
        title: 'Post Graduate Programme',
        position: { top: 318, left: 399 },
        image: diplomaProgrammeImage
    },
    {
        title: 'Diploma Programme',
        position: { top: 485, left: 10 },
        image: certificateProgrammeImage
    },
    {
        title: 'Research  Programme',
        position: { top: 535, left: 370 },
        image: researchProgrammeImage
    }
]

const SchoolSection = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className='flex flex-col md:flex-row w-full px-10 relative h-[100vh]'>
            <div className='md:w-[40%] flex flex-col justify-center'>
                <div className='text-3xl font-light tracking-wider text-gray-500 leading-[1.1]'>
                Welcome to Solanki Brothers Council for Open and Distance Learning,
                <p  className='text-3xl font-bold'>"Bridging Today's Classroom to Tomorrow's Dynamic Workplace"</p>
                </div>
                <div className='text-sm font-light tracking-wider text-gray-800 mt-4 leading-[1.3]'>
                    <p>
                        <span className='font-bold text-gray-950'></span> The Solanki Brothers Council for Open and Distance Learning (SBCODL) was established and incorporated by the Uttar Pradesh legislature and is accredited by the International Accreditation/ Membership. SBCODL embodies the futuristic vision of a young India, driven by emerging trends and skill development. With substantial cooperation from the government, industry, and academia, technology-enabled learning has shifted the emphasis towards skill-led education.
                    </p> 
                   { !isExpanded && <span className='text-blue-500 cursor-pointer' onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? 'Show Less' : 'Learn More'}
                    </span>}

                    {isExpanded && (
                        <>
                            <p className='mt-4'>
                                SBCODL focuses on academic, vocational, professional, technical, and life skill areas to promote skill development and societal enrichment for its students through traditional and non-traditional programs. We are committed to creating an environment where ideas, enthusiasm, and hard work come together to help students shape the future they desire. Our technology-enabled learning environment, industry-experienced faculty, simulated virtual lab experiences, transdisciplinary choice-based learning, observer ships, internships, apprenticeships, and industry placements are key differentiators of SBCODL education. The emphasis is on fostering entrepreneurship because India needs employment producers rather than job seekers. Family-managed businesses, innovations in technology and policy, and start-ups are integral components under our Ventures, Innovations, and Enterprises initiatives.
                            </p>
                            <p className='mt-4'>
                                Located in Eastern Uttar Pradesh, SBCODL provides students, alumni, and the local community with the essential skills to thrive in the new digital world. Our focus remains on empowering learners to navigate and excel in today's dynamic professional landscape.
                            </p>
                            <span className='text-blue-500 cursor-pointer' onClick={() => setIsExpanded(!isExpanded)}>Show Less</span>
                           
                        </>
                        
                    )}
                </div>
                <div className='flex flex-col gap-2 mt-5'>
                    <Link to="/chairman-message">
                        <Button variant='outline' className='text-white px-5 py-5 text-lg w-fit'>
                            Chairman Message
                        </Button>
                    </Link>

                    <Link to="/learn-more">
                        <Button variant='outline' className='text-white px-5 py-5 text-lg w-fit'>
                            Learn More
                        </Button>
                    </Link>
                    
                   
                </div>
            </div>

            <div className='w-full md:w-[60%] flex flex-col justify-center items-center relative md:ml-[20px] mt-[20px]'>
                {SCHOOL_SECTIONS.map((section, index) => (
                    <div
                        key={index}
                        className='absolute'
                        style={{
                            top: `${section.position.top}px`,
                            left: `${section.position.left}px`
                        }}
                    >
                        <ImageCard
                            item={{
                                image: section.image,
                                desc1: section.title,
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SchoolSection