import { useState, useEffect } from 'react'
import pdf from '../../../assets/pdf/prospectus.pdf'

const Prospectus = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set loading to false after a short delay to ensure PDF has time to initialize
    const timer = setTimeout(() => {
      setLoading(false)
    }, 300)
    
    return () => clearTimeout(timer)  
  }, [])

  return (
    <div className="flex flex-col items-center w-full">
      {/* <h1 className="text-2xl font-bold mb-4">Prospectus</h1> */}
      
      {loading ? (
        <div className="flex items-center justify-center h-[70vh]">
          <p>Loading PDF...</p>
        </div>
      ) : (
        <div className="w-full h-[86vh]">
          <object
            data={pdf}
            type="application/pdf"
            className="w-full h-full"
          >
            <p>
              Your browser does not support PDFs.
              <a href={pdf} target="_blank" rel="noopener noreferrer">
                Download the PDF
              </a>
            </p>
          </object>
        </div>
      )}
    </div>
  )
}

export default Prospectus