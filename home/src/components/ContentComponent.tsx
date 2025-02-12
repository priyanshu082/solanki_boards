import { ArrowRight } from "lucide-react";
import React, { useState } from "react";

interface ContentComponentProps {
    image: string;
    heading: string;
    description: string;
}

const ContentComponent: React.FC<ContentComponentProps> = ({ image, heading, description }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleReadMoreClick = () => {
        if (description.length > 300) {
            setIsDialogOpen(true);
        }
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <div className="h-[90vh] flex justify-center items-center w-full px-10 md:px-20">
            <div className='md:h-[30vw] flex flex-col md:flex-row relative gap-10 items-center bg-blue-200 rounded-t-[2vw] rounded-br-[2vw] rounded-bl-[10vw] md:pb-[15vw] px-[3vw] pb-[5vw]'>

                <img src={image} alt="img" className="h-[50vw] md:h-[23vw] w-[35vw] object-cover rounded-lg" />

                <div className="flex flex-col text-black gap-10 justify-center mt-[12vw] ">
                    <div className="text-3xl font-bold">
                        {heading}
                    </div>
                    <div className="text-lg tracking-wider">
                        {description.length > 300 ? `${description.substring(0, 300)}...` : description}
                    </div>
                    <div className="flex flex-col gap-2">
                        <div onClick={handleReadMoreClick} className="flex cursor-pointer flex-row justify-between hover:scale-[101%] transition-all duration-500 ease-in-out">
                            <div>
                                Read More
                            </div>
                            <ArrowRight />
                        </div>
                        <div className="border border-blue-500" />
                    </div>
                </div>
            </div>
            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg w-11/12 md:w-1/2 max-h-[75vh] h-fit overflow-y-auto scrollbar-hide border-2 relative ">
                        <button onClick={closeDialog} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer text-2xl border border-gray-500 w-8 h-8 flex items-center justify-center rounded-sm ">
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">{heading}</h2>
                        <p className="whitespace-pre-line">{description}</p>
                        
                    </div>
                </div>
            )}
        </div>
    )
}

export default ContentComponent;