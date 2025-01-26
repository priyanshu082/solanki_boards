import  { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../assets/logo.png'; // Replace with actual logo
import idcard from "../assets/idcard.jpg"

type StudentData = {
  name: string;
  enrollmentNumber: string;
  examination: string;
  address: string;
  contact: string;
  campusAddress: string;
  photo: string;
};

const StudentIDCard = () => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT_HERE'); // Replace with your actual API endpoint
      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Use dummy data if API call fails
      setStudentData({
        name: "Virendra Singh",
        enrollmentNumber: "10124002324",
        examination: "Secondary School Examination",
        address: "Sudan Khera Alampur, Lalganj, Raebareli, Uttar Pradesh, 229206",
        contact: "+91 7392851721",
        campusAddress: "Sikkim (BOSSE), Amdo Golai, NH-10, Near RBI Bank, Gangtok, Sikkim - 737102",
        photo: "https://via.placeholder.com/100" 
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const handleDownloadPDF = async () => {
    const frontElement = document.getElementById("id-card-front") as HTMLElement;
    const backElement = document.getElementById("id-card-back") as HTMLElement;

    try {
      const frontCanvas = await html2canvas(frontElement);
      const frontImage = frontCanvas.toDataURL("image/png");

      const backCanvas = await html2canvas(backElement);
      const backImage = backCanvas.toDataURL("image/png");

      const doc = new jsPDF('landscape', 'mm', [85.6, 53.98]); 

      // Add front side to PDF
      doc.addImage(frontImage, 'PNG', 0, 0, 85.6, 53.98);
      doc.save(`${studentData?.name || 'Student'}_ID_Card_Front.pdf`);

      // Add back side to PDF (create a new document)
      const backDoc = new jsPDF('landscape', 'mm', [85.6, 53.98]);
      backDoc.addImage(backImage, 'PNG', 0, 0, 85.6, 53.98);
      backDoc.save(`${studentData?.name || 'Student'}_ID_Card_Back.pdf`);

    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {studentData ? ( 
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Front of ID Card */}
          <div id="id-card-front" className="w-[100.6mm] h-[120.98mm] rounded-lg shadow-lg border border-gray-300 flex flex-col items-center justify-between p-4 relative">
  <div className="absolute inset-0">
    <img
      src={logo}
      alt="School Background"
      className="w-full h-full object-cover opacity-20"
    />
  </div>
          <div className="text-center relative z-10">
              <img src={logo} alt="School Logo" className="h-12 mx-auto" />
              <h1 className="text-lg font-extrabold text-black mt-2">The Board Of Open Schooling & Skill Education</h1>
            </div>

            <div className="flex flex-col items-center">
              <img  src={idcard} alt="Student" className="h-20 w-20 rounded-full border-2 z-20 border-white mb-2" />
              <h2 className="text-lg font-bold text-white">{studentData.name}</h2>
              <p className="text-sm text-white">{studentData.examination}</p>
            </div>

            <div className="text-xs text-white text-center">
              <p>{studentData.enrollmentNumber}</p>
              <p>Enrollment No.</p>
            </div>

            <div className="w-full text-right text-xs text-white">
              <p>Co-ordinator</p>
            </div>
          </div>

          {/* Back of ID Card */}
          <div id="id-card-back" className="w-[100.6mm] h-[120.98mm] bg-white rounded-lg shadow-lg border border-gray-300 flex flex-col p-4">
            <h2 className="text-base font-bold text-blue-800 border-b pb-1 mb-2">Student's Address:</h2>
            <p className="text-sm text-gray-700 mb-2">{studentData.address}</p>
            <h2 className="text-base font-bold text-blue-800 border-b pb-1 mb-2">Campus Address:</h2>
            <p className="text-sm text-gray-700 mb-4">{studentData.campusAddress}</p>
            <h2 className="text-base font-bold text-blue-800 border-b pb-1 mb-2">Contact:</h2>
            <p className="text-sm text-gray-700 mb-4">{studentData.contact}</p>

            <h2 className="text-base font-bold text-blue-800 border-b pb-1 mb-2">Instructions:</h2>
            <ul className="text-sm text-gray-700 list-decimal list-inside space-y-1">
              <li>This card is non-transferable and must be surrendered at the time of leaving the Board.</li>
              <li>Loss of this card must be reported to the issuing authority and nearest police station immediately.</li>
              {/* <li>Duplicate card will be issued on payment of Rs. 100/-.</li>
              <li>The card must be shown to security personnel on demand.</li> */}
            </ul>

            <div className="flex justify-center items-center mt-4">
              <img src={logo} alt="School Logo" className="h-10" />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading student data...</p> 
      )}

      {studentData && (
        <button
          onClick={handleDownloadPDF}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Download ID Card as PDF
        </button>
      )}
    </div>
  );
};

export default StudentIDCard;