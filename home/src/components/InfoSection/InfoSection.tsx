import ImageCardInfoSection from './ImageCardInfoSection'

const InfoSection = () => {
  return (
    <div className='flex flex-col w-[90vw] items-center justify-center gap-[15vw] md:gap-[3vw] py-[5vw]'>
        <div className='text-5xl text-center px-[5vw] font-bold text-primary font-serif'>
        The Unique and Life-Changing Experience of Currey Ingram Academy
        </div>

        <div className='flex flex-row items-center justify-center md:gap-[2vw]'>
            
        <ImageCardInfoSection item={{
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          title: 'School Management System',
        }}/>
        <div className='mt-[5vw]'>
        <ImageCardInfoSection item={{
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          title: 'School Management System',
        }}/>
        </div>
        
        <ImageCardInfoSection item={{
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          title: 'School Management System',
        }}/>
        </div>
    </div>
  )
}

export default InfoSection