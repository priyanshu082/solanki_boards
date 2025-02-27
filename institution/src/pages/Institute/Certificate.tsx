import { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import certificate from "../../assets/certificate.png";
import { useRecoilValue } from 'recoil';
import { instituteProfileSelector } from '@/store/atoms/instituteAtoms';

interface CertificateData {
    name: string;
    course: string;
    date: string;
}

const Certificate = () => {
    const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const instituteProfile = useRecoilValue(instituteProfileSelector);

    useEffect(() => {
        // Preload the background image
        const img = new Image();
        img.src = certificate;
        img.onload = () => setIsImageLoaded(true);

        // Simulating fetching certificate data
        const fetchCertificateData = async () => {
            setCertificateData({
                name: instituteProfile?.headName || "",
                course: "Secondary School Examination",
                date: "01 Feb 2025"
            });
        };

        fetchCertificateData();
    }, []);

    const handleDownloadImage = async (elementId: string, fileName: string): Promise<void> => {
        const element = document.getElementById(elementId);
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                useCORS: true,
                scale: 3, // Increased scale for better quality
                backgroundColor: null,
                logging: false,
                allowTaint: true,
                width: element.offsetWidth,
                height: element.offsetHeight,
                onclone: (clonedDoc) => {
                    // Ensure styles are properly applied in the cloned element
                    const clonedElement = clonedDoc.getElementById(elementId);
                    if (clonedElement) {
                        clonedElement.style.transform = 'none';
                    }
                }
            });

            // Convert to blob with maximum quality
            const blob = await new Promise<Blob>((resolve) => {
                canvas.toBlob((b) => {
                    resolve(b as Blob);
                }, 'image/png', 1.0);
            });

            // Create download link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${fileName}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error generating certificate:', error);
        }
    };

    if (!isImageLoaded || !certificateData) {
        return <div className="text-gray-600">Loading certificate...</div>;
    }

    return (
        <div className="flex flex-col-reverse items-center justify-center min-h-screen bg-gray-100 p-4">
            <div
                id="certificate"
                className="relative w-[290mm] h-[200mm] rounded-lg shadow-lg overflow-hidden"
                style={{
                    backgroundImage: `url(${certificate})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'white'
                }}
            >
                {/* Certificate ID - Adjusted position */}
                <p className="absolute top-[32px] right-[163px] text-xl font-semibold text-black">
                    45342
                </p>

                {/* Student Name - Improved positioning */}
                <div className="absolute top-[260px] left-0 right-[70px] text-center">
                    <h2 className="text-6xl font-dancing-script tracking-wider inline-block">
                        {certificateData.name}
                    </h2>
                </div>

                {/* Date Information - Fixed alignment */}
                <div className="absolute bottom-[169px] w-full px-[27%]">
                    <div className="flex justify-between">
                        <h3 className="text-2xl font-semibold text-black">
                            {certificateData.date}
                        </h3>
                        <p className="text-2xl font-semibold text-black">
                            {certificateData.date}
                        </p>
                    </div>
                </div>
            </div>

            <button
                onClick={() => handleDownloadImage('certificate', `${certificateData.name}_certificate`)}
                className="mb-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
                Download Certificate
            </button>
        </div>
    );
};

export default Certificate;