import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import backgroundImage from "../assets/images/footer_bg.jpg";
import institute1 from "../assets/images/patners/patner_logo_1.jpeg"
import institute2 from "../assets/images/patners/patner_logo_2.jpeg"
import institute3 from "../assets/images/patners/patner_logo_3.jpeg"
import institute4 from "../assets/images/patners/patner_logo_4.png"
import institute5 from "../assets/images/patners/patner_logo_5.jpeg"
import institute6 from "../assets/images/patners/patner_logo_6.jpeg"
import institute7 from "../assets/images/patners/patner_logo_7.jpeg"
import institute8 from "../assets/images/patners/patner_logo_8.png"
import institute9 from "../assets/images/patners/patner_logo_9.png"
import institute10 from "../assets/images/patners/patner_logo_10.png"

const Footer = () => {
    const institutes = [
        { src: institute4, alt: "Institute 4" },
        { src: institute8, alt: "Institute 8" },
        { src: institute9, alt: "Institute 9" },
        { src: institute3, alt: "Institute 3" },
        { src: institute1, alt: "Institute 1" },
        { src: institute2, alt: "Institute 2" },
        { src: institute10, alt: "Institute 10" },
        { src: institute5, alt: "Institute 5" },
        { src: institute6, alt: "Institute 6" },
        { src: institute7, alt: "Institute 7" },
      ];
    return (
        <footer className="border-t">
            <div className="relative">
                {/* Background Image */}
                <div className="absolute inset-0 bg-fixed bg-cover bg-center object-cover opacity-70" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
                
                {/* New Footer Section */}
                <div className="flex flex-col md:flex-row w-full relative z-10">
                    {/* First Div - 30% */}
                    <div className="w-full md:w-[40vw] flex items-center justify-center">
                        <h1 className="text-4xl font-serif font-bold text-center">Welcome to SBCODL</h1>
                    </div>
                    {/* Second Div - 70% */}
                    <div className="w-full md:w-[60.3vw] flex flex-col justify-center items-center ">
                        {/* Social Media Icons */}
                        <div className="flex flex-row flex-wrap w-full">
                            {[Facebook, Instagram, Twitter, Linkedin, Youtube,Youtube].map((Icon, index) => (
                                <div key={index} className="relative group w-[15vw] h-[16vw] flex flex-col items-center justify-center border-[0.5px] border-white hover:bg-background/40">
                                    <Icon size={48} className="text-white  transition-opacity " />
                                    <div className="  flex items-center justify-center">
                                        <span className="text-white text-lg font-bold mt-4">SOCIAL {index + 1}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Existing Footer Section */}
                <div className="flex md:flex-row flex-col font-serif relative bg-background z-10 px-24 py-6 gap-[7vw]">
                    <div className='w-[25vw]'>
                        <div className="flex items-center space-x-3">
                            <h2 className="text-md font-bold text-foreground">SOLANKI BROTHERS COUNCIL FOR OPEN AND DISTANCE LEARNING</h2>
                        </div>

                        {/* Contact and Links */}
                        <div className="text-muted-foreground mt-4">
                            <p>Email: info@sbiea.co.in</p>
                            <p>Phone: +91 9997874343</p>
                            <div className="space-x-4">
                                <a href="/child-policy" className="hover:text-foreground">Child Policy</a>
                                <a href="/cookie-policy" className="hover:text-foreground">Cookie Policy</a>
                                <a href="/privacy-policy" className="hover:text-foreground">Privacy Policy</a>
                                <a href="/saferrecruitment-policy" className="hover:text-foreground">Safer Recruitment Policy</a>
                                <a href="/safeguarding-policy" className="hover:text-foreground">Safe-Guarding Policy</a>
                            </div>
                            <p className="text-sm">©2022 SOLANKI BROTHERS COUNCIL FOR OPEN AND DISTANCE LEARNING(SBCODL). All rights reserved.</p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="space-y-8 flex flex-col w-[55vw] justify-center">
                        {/* Paragraph */}
                        <div className="text-muted-foreground">
                            <p>Solanki Brothers Council for Open and Distance Learning (SBCODL),
                            is India’s first non-profit, non-denominational, co-educational council dedicated to fostering holistic learning and development. Nestled in the heart of India, SBCODL offers a unique blend of traditional values and modern, innovative teaching methodologies to nurture confident, creative, and independent thinkers prepared for a dynamic world.</p>
                        </div>
                        {/* Social Media Links */}
                        <div className="flex justify-end md:justify-start space-x-6">
      {institutes.map((institute, index) => (
        <img
          key={index}
          src={institute.src}
          alt={institute.alt}
          className="w-10 h-10 md:w-10 md:h-10 hover:scale-105 transition-transform rounded-md"
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