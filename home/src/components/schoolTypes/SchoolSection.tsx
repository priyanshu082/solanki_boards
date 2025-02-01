import ImageCard from './ImageCard'
import { Button } from '../ui/button'

// Import multiple images
import primaryYearsImage from '../../assets/images/img14.jpeg'
import middleYearsImage from '../../assets/images/img4.jpeg'
import upperYearsImage from '../../assets/images/img2.jpeg'
import diplomaProgrammeImage from '../../assets/images/img6.jpeg'
import certificateProgrammeImage from '../../assets/images/img1.jpeg'

const SCHOOL_SECTIONS = [
    {
        title: 'Primary Years Programme',
        grade: 'JK - 5',
        position: { top: 50, left: 80 },
        image: primaryYearsImage
    },
    {
        title: 'Middle Years Programme',
        grade: '6 - 8',
        position: { top: 265, left: 40 },
        image: middleYearsImage
    },
    {
        title: 'Upper Years Programme',
        grade: '9 - 12',
        position: { top: 100, left: 438 },
        image: upperYearsImage
    },
    {
        title: 'Diploma Programme & ',
        grade: "PG Programme",
        position: { top: 318, left: 399 },
        image: diplomaProgrammeImage
    },
    {
        title: 'Certificate Programme',
        position: { top: 490, left: 250 },
        image: certificateProgrammeImage
    }
]

const SchoolSection = () => {
    return (
        <div className='flex flex-col md:flex-row w-full px-10 relative h-[100vh]'>
            <div className='md:w-[40%] flex flex-col justify-center'>
                <div className='text-4xl font-light tracking-wider text-gray-500 leading-[1.1]'>
                    Building a Future of Great Opportunities: Empowering Every Learner at <span className='font-bold text-5xl'>SBCODL</span>
                </div>
                <div className='text-sm font-light tracking-wider text-gray-800 mt-4 leading-[1.3]'>
                

<p>
<span className='font-bold text-gray-950'>At SBCODL</span>, we believe education is a transformative force that can overcome societal barriers. In India, over 59 million children are out of school, denied their fundamental right to learn due to socio-economic inequalities. Our mission, <span className='font-bold text-gray-950'>"Education for All"</span> goes beyond academic instruction—we're committed to creating equitable opportunities for underprivileged students.
    </p>
<p>
<span className='font-bold text-gray-950'>Esatablished in 2022</span>, we've been actively working to bridge educational gaps by providing free learning materials, connecting schools with local communities, and supporting gifted students from disadvantaged backgrounds. We don't just see education as an academic pursuit, but as a powerful tool for social upliftment. By offering resources, support, and opportunities, we aim to empower children who might otherwise be left behind.
Our vision is to transform individual lives and, by extension, create a more just and inclusive society. Together, we can make education a universal right, not a privilege.
    </p>
                </div>
                <div className='flex flex-col gap-2 mt-5'>
                    <Button variant='outline' className='text-white px-5 py-5 text-lg w-fit'>
                        Chairman Message
                    </Button>
                    <Button variant='outline' className='text-white px-5 py-5 text-lg w-fit'>
                        Learn More
                    </Button>
                </div>
            </div>

            <div className='w-full md:w-[60%] flex flex-col justify-center items-center relative md:ml-[20px] mt-[80px]'>
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
                                desc2: section.grade
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SchoolSection