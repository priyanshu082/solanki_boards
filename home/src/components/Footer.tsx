import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import backgroundImage from "../assets/images/footer_bg.jpg";
import { institutes } from "../data/footer";

const Footer = () => {
   

    return (
        <footer className="border-t overflow-hidden">
            <div className="relative">
                {/* Background Image */}
                <div className="absolute inset-0 bg-fixed bg-cover bg-center object-cover opacity-70" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
                
                {/* New Footer Section */}
                <div className="flex flex-col md:flex-row w-full relative z-10">
                    {/* First Div */}
                    <div className="w-full md:w-[40%] p-8 flex items-center justify-center">
                        <h1 className="text-2xl md:text-4xl font-serif font-bold text-center">Welcome to SBCODL</h1>
                    </div>
                    {/* Second Div */}
                    <div className="w-full md:w-[60%] flex flex-col justify-center items-center">
                        {/* Social Media Icons */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-full">
                            {[Facebook, Instagram, Twitter, Linkedin,].map((Icon, index) => (
                                <div key={index} className="relative group aspect-square flex flex-col items-center justify-center border-[0.5px] border-white hover:bg-background/40 p-4">
                                    <Icon size={28} className="text-white transition-opacity" />
                                    <div className="flex items-center justify-center">
                                        <span className="text-white text-sm md:text-lg font-semibold mt-2">SOCIAL {index + 1}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Existing Footer Section */}
                <div className="flex flex-col md:flex-row relative bg-background z-10 p-4 md:px-8 lg:px-24 py-6 gap-4 md:gap-8">
                    <div className='w-full md:w-[40%] lg:w-[25vw]'>
                        <div className="flex items-center space-x-3">
                            <h2 className="text-sm md:text-md font-bold text-foreground">SOLANKI BROTHERS COUNCIL FOR OPEN AND DISTANCE LEARNING</h2>
                        </div>

                        {/* Contact and Links */}
                        <div className="text-muted-foreground mt-4 text-sm">
                            <p>Email: info@sbiea.co.in</p>
                            <p>Phone: +91 9997874343</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <a href="/child-policy" className="hover:text-foreground">Child Policy</a>
                                <a href="/cookie-policy" className="hover:text-foreground">Cookie Policy</a>
                                <a href="/privacy-policy" className="hover:text-foreground">Privacy Policy</a>
                                <a href="/saferrecruitment-policy" className="hover:text-foreground">Safer Recruitment Policy</a>
                                <a href="/safeguarding-policy" className="hover:text-foreground">Safe-Guarding Policy</a>
                            </div>
                            <p className="text-xs mt-2">©2022 SOLANKI BROTHERS COUNCIL FOR OPEN AND DISTANCE LEARNING(SBCODL). All rights reserved.</p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="space-y-4 md:space-y-8 flex flex-col w-full md:w-[60%] lg:w-[55vw] justify-center">
                        {/* Paragraph */}
                        <div className="text-muted-foreground text-sm md:text-base">
                            <p>Solanki Brothers Council for Open and Distance Learning (SBCODL),
                            is India's first non-profit, non-denominational, co-educational council dedicated to fostering holistic learning and development. Nestled in the heart of India, SBCODL offers a unique blend of traditional values and modern, innovative teaching methodologies to nurture confident, creative, and independent thinkers prepared for a dynamic world.</p>
                        </div>
                        {/* Institute Logos */}
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {institutes.map((institute, index) => (
                                <img
                                    key={index}
                                    src={institute.src}
                                    alt={institute.alt}
                                    className="w-8 h-8 bg-white md:w-12 md:h-12  hover:scale-105 transition-transform rounded-md object-contain"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;