import { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import frontCardBg from '../assets/idfront.png'; // You'll need to add these images
import backCardBg from '../assets/idback.png';  // You'll need to add these images
import dummy from "../assets/idcard.jpg"

interface StudentData {
    name: string;
    enrollmentNumber: string;
    course: string;
    address: string;
}

const StudentIDCard = () => {
    const [studentData, setStudentData] = useState<StudentData | null>(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await fetch('YOUR_API_ENDPOINT');
                const data: StudentData = await response.json();
                setStudentData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                // Fallback dummy data
                setStudentData({
                    name: "Virendra Singh",
                    enrollmentNumber: "10124002324",
                    course: "Secondary School Examination",
                    address: "Sudan Khera Alampur, Lalganj, Raebareli, Uttar Pradesh, 229206"
                });
            }
        };

        fetchStudentData();
    }, []);

    const handleDownloadImage = (elementId: string, fileName: string): void => {
        const element = document.getElementById(elementId);
        if (!element) return;

        // Create a canvas from the element
        html2canvas(element, {
            useCORS: true,
            scale: 2,
            logging: false
        }).then((canvas: HTMLCanvasElement) => {
            // Convert to image and trigger download
            const link = document.createElement('a');
            link.download = `${fileName}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {studentData ? (
                <div className="flex flex-col gap-8 md:flex-row">
                    {/* Front Card */}
                    <div
                        id="front-card"
                        className="relative w-[82.6mm] h-[140.98mm] rounded-lg shadow-lg overflow-hidden"
                        style={{ backgroundImage: `url(${frontCardBg})`, backgroundSize: 'cover' }}>  

                        <div className="absolute mt-[330px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <img src={dummy} alt="pik" className='h-32 w-32 rounded-sm mx-auto' />
                            <h2 className="text-lg font-bold text-white">{studentData.name}</h2>
                            <p className="text-sm text-white">{studentData.course}</p>
                        </div>

                        {/* Bottom left content */}
                        <div className="absolute bottom-6 left-2 text-white font-medium" >
                            <p className=' text-sm'>ENROLLMENT NO:</p>
                            <p className="text-sm ">{studentData.enrollmentNumber}</p>
                        </div>
                    </div>

                    {/* Back Card */}
                    <div
                        id="back-card"
                        className="relative w-[82.6mm] h-[140.98mm] rounded-lg shadow-lg overflow-hidden"
                        style={{ backgroundImage: `url(${backCardBg})`, backgroundSize: 'cover' }}
                    >
                         <div className="absolute top-16 ml-[20px] px-4 text-black">
              <h3 className="text-[10px] font-bold ml-[65px]">STUDENT ADDRESS:</h3>
              <p className="text-[10px] text-center break-words font-bold ml-[8px] w-[230px]">
                {studentData.address}
              </p>
            </div>
                    </div>
                </div>
            ) : (
                <div className="text-gray-600">Loading student data...</div>
            )}

            {studentData && (
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={() => handleDownloadImage('front-card', `${studentData.name}_front_card`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                    >
                        Download Front Card
                    </button>
                    <button
                        onClick={() => handleDownloadImage('back-card', `${studentData.name}_back_card`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                    >
                        Download Back Card
                    </button>
                </div>
            )}
        </div>
    );
};

export default StudentIDCard;