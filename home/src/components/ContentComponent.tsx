import {  ArrowRight } from "lucide-react"
import img from "../assets/images/img1.jpeg"
const ContentComponent = () => {
    return (
        <div className="h-[90vh] flex justify-center items-center w-full px-10 md:px-20">
            <div className=' md:h-[28vw] flex flex-col md:flex-row relative gap-10 items-center bg-blue-200 rounded-t-[2vw] rounded-br-[2vw] rounded-bl-[10vw] md:pb-[15vw] px-[3vw] pb-[5vw]' >

                <div className="bg-yellow-300  absolute z-" />
                <div className="">
                    <img src={img} alt="img" className=" h-[50vw]  md:h-[25vw] object-fill rounded-lg" />
                </div>


                <div className="flex flex-col text-black gap-10 md:gap-10 md:pt-28 ">
                    <div className="text-4xl font-bold">
                        The IB by country/territory
                    </div>
                    <div className="text-lg tracking-wider">
                        With presence in over 150 countries/territories and over 5,000 IB World Schools worldwide, the IB is globally renowned for excellence.
                    </div>
                    <div className=" flex flex-col gap-2">
                        <div className="flex cursor-pointer flex-row justify-between hover:scale-[101%] transition-all duration-500 ease-in-out">
                            <div>
                                ReadMore
                            </div>
                            <ArrowRight />
                        </div>
                        <div className="border border-blue-500" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ContentComponent