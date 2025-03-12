import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { MapPin, Phone, Mail, Globe, Send } from "lucide-react";

const ContactUs = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <div className=" bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto text-center">
            Get in touch with SBCODL for admissions, inquiries, and support.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className=" mx-auto px-8 py-12 -mt-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-100">Our Contact Details</CardTitle>
                <h1 className="font-semibold  text-blue-100 text-sm"> Solanki Brothers Council for Open and Distance Learning</h1>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Address</h3>
                   

                    <p className="text-gray-300">
                      Amethi Kohna, Nearby Neha Filling Station,<br />
                      Farrukhabad, Uttar Pradesh, India - 209625
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-blue-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                        <p className="text-gray-300">+91 9997874343</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-blue-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-gray-300">admission@sbiea.co.in</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Globe className="h-6 w-6 text-blue-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Website</h3>
                    <p className="text-gray-300">www.sbiea.co.in</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-none shadow-md  text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Full Name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                      required
                    />
                    <Input
                      type="tel"
                      placeholder="Mobile Number"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                      required
                    />
                    <Input
                      type="text"
                      placeholder="Course Name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                      required
                    />
                    <Textarea
                      placeholder="Your Message"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/70 min-h-[85px]"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-white text-blue-600 hover:bg-blue-50"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;