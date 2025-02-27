import { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import letterBackground from "../../assets/letter.png"; // Your letter background image
import { useRecoilValue } from 'recoil';
import { instituteProfileSelector } from '@/store/atoms/instituteAtoms';

interface LetterData {
    name: string;
    referenceNumber: string;
    instituteDetails: {
        name: string;
        address: string;
    };
}

const LetterOverlay = () => {
    const [letterData, setLetterData] = useState<LetterData | null>(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const instituteProfile = useRecoilValue(instituteProfileSelector);
    
    const currentDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    }).replace(/\//g, '/');

    useEffect(() => {
        const img = new Image();
        img.src = letterBackground;
        img.onload = () => setIsImageLoaded(true);

        // Simulating fetching data from backend
        const fetchLetterData = async () => {
            // Replace with your actual API call
            setLetterData({
                name: instituteProfile?.headName || "",
                referenceNumber: "2345", // This will come from backend
                instituteDetails: {
                    name: instituteProfile?.centerName || "",
                    address: instituteProfile?.centerAddress || ""
                }
            });
        };

        fetchLetterData();
    }, []);

    const handleDownloadImage = async (elementId: string, fileName: string): Promise<void> => {
        const element = document.getElementById(elementId);
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                useCORS: true,
                scale: 3,
                backgroundColor: null,
                logging: false,
                allowTaint: true
            });

            const blob = await new Promise<Blob>((resolve) => {
                canvas.toBlob((b) => {
                    resolve(b as Blob);
                }, 'image/png', 1.0);
            });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${fileName}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error generating letter:', error);
        }
    };

    if (!isImageLoaded || !letterData) {
        return <div className="text-gray-600">Loading letter...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div
                id="letter"
                className="relative w-[210mm] h-[297mm] rounded-lg shadow-lg overflow-hidden"
                style={{
                    backgroundImage: `url(${letterBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Institute Details */}
                <div className="absolute top-[200px] left-[52px] right-[0px] text-start font-dancing-script">
                    <h1 className="text-2xl font-semibold text-black">
                        {letterData.instituteDetails.name}
                    </h1>
                    <p className="text-md text-black mt-1 w-[250px]">
                        {letterData.instituteDetails.address}
                    </p>
                </div>

                {/* Reference Number */}
                <p className="absolute top-[164px] left-[340px] text-red-500">
                    {letterData.referenceNumber}
                </p>

                {/* Date */}
                <p className="absolute top-[164px] right-[40px] text-black">
                    Date: <span className="text-blue-900">{currentDate}</span>
                </p>

                {/* Name */}
              
            </div>

            <button
                onClick={() => handleDownloadImage('letter', `${letterData.name}_letter`)}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
                Download Letter
            </button>
        </div>
    );
};

export default LetterOverlay;