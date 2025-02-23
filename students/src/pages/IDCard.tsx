import { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import frontCardBg from '../assets/idfront.png';
import backCardBg from '../assets/idback.png';
import dummy from "../assets/idcard.jpg";
import { studentDetailsUrl } from '../Config';
import Swal from 'sweetalert2';

interface Address {
  address: string;
  city: string;
  district: string;
  state: string;
  country: string;
  pincode: string;
}

interface StudentData {
    name: string;
    enrollmentNumber: string | null;
    applicationNumber: string;
    courseId: string;
    permanentAddress: Address[];
    studentPhoto: string;
}

const StudentIDCard = () => {
    const [studentData, setStudentData] = useState<StudentData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const token = localStorage.getItem('token');
                const studentId = localStorage.getItem('id');

                Swal.fire({
                    title: 'Loading...',
                    text: 'Fetching student details',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                const response = await fetch(`${studentDetailsUrl}/${studentId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setStudentData(data);
                Swal.close();
            } catch (error) {
                console.error("Error fetching data:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch student data'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, []);

    const handleDownloadImage = (elementId: string, fileName: string): void => {
        const element = document.getElementById(elementId);
        if (!element) return;

        html2canvas(element, {
            useCORS: true,
            scale: 2,
            logging: false
        }).then((canvas: HTMLCanvasElement) => {
            const link = document.createElement('a');
            link.download = `${fileName}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
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
                            {studentData.studentPhoto ? (
                                <img 
                                    src={studentData.studentPhoto} 
                                    alt="Student" 
                                    className='h-32 w-32 rounded-sm mx-auto'
                                    onError={(e) => {
                                        e.currentTarget.src = dummy;
                                    }}
                                />
                            ) : (
                                <div className="h-32 w-32 bg-gray-200 flex items-center justify-center rounded-sm mx-auto">
                                    <span className="text-gray-500">No Photo</span>
                                </div>
                            )}
                            <h2 className="text-lg font-bold text-white">{studentData.name}</h2>
                            <p className="text-sm text-white">{studentData.courseId}</p>
                        </div>

                        {/* Bottom left content */}
                        <div className="absolute bottom-6 left-2 text-white font-medium" >
                            <p className='text-xs'>ENROLLMENT NO:</p>
                            <p className="text-xs">{studentData.enrollmentNumber || studentData.applicationNumber}</p>
                        </div>
                    </div>

                    {/* Back Card */}
                    <div
                        id="back-card"
                        className="relative w-[82.6mm] h-[140.98mm] rounded-lg shadow-lg overflow-hidden"
                        style={{ backgroundImage: `url(${backCardBg})`, backgroundSize: 'cover' }}
                    >
                        <div className="absolute top-16 ml-[20px] px-4 text-black">
                            <h3 className="text-[10px] font-bold ml-[65px]">PERMANENT ADDRESS:</h3>
                            {studentData.permanentAddress[0] && (
                                <div className="text-[10px] text-center break-words font-bold ml-[8px] w-[230px]">
                                    <p>{studentData.permanentAddress[0].address}, {studentData.permanentAddress[0].city}, {studentData.permanentAddress[0].district}, {studentData.permanentAddress[0].state}, {studentData.permanentAddress[0].country}, PIN: {studentData.permanentAddress[0].pincode}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-gray-600">No student data available</div>
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