import ImageCard from './ImageCard'
import school_bg from '../../assets/images/school_bg.jpeg'
import { Button } from '../ui/button'

const SCHOOL_SECTIONS = [
    {
        title: 'Primary Years Programme',
        grade: 'JK - 5',
        position: { top: 50, left: 80 }
    },
    {
        title: 'Middle Years Programme',
        grade: '6 - 8',
        position: { top: 265, left: 40 }
    },
    {
        title: 'Upper Years Programme',
        grade: '9 - 12',
        position: { top: 100, left: 438 }
    },
    {
        title: 'Diploma Programme & ',
        grade:"PG Programme",
        position: { top: 318, left: 399 }
    },
    {
        title: 'Certificate Programme',
        // grade: 'Specialized',
        position: { top: 490, left: 250 }
    }
]

const SchoolSection = () => {
    return (
        <div className='flex flex-col md:flex-row w-full px-10 relative h-[100vh]'>
            <div className='md:w-[40%] flex flex-col justify-center'>
                <div className='text-4xl font-light tracking-wider text-gray-500 leading-[1.1]'>
                    <span className='font-semibold text-5xl'>SBCODL</span>, Empowering students with learning differences to achieve their fullest potential.
                </div>
                <div className='text-md font-light tracking-wider text-gray-500 mt-4 leading-[1.4]'>
                    We believe in empowering students with learning differences to reach their fullest potential. As a premier private boarding school in India, we strive to be a global leader in providing specialized education for students with diverse learning needs. We do this by focusing on their strengths and offering tailored support so that every student receives the education they truly deserve.
                </div>
                <div className='flex flex-col gap-2 mt-5'>
                    <Button variant='outline' className='text-primary px-5 py-5 text-lg w-fit'>
                        Chairman Message
                    </Button>
                    <Button variant='outline' className='text-primary px-5 py-5 text-lg w-fit'>
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
                                image: school_bg,
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