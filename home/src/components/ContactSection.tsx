import { useState } from 'react';
import axios from 'axios';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { createEnquiryUrl } from '../data/config';



const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    title: '', // Using course name as title
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.post(createEnquiryUrl, {
        ...formData,
      });
      
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        title: '',
        description: '',
      });
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setError('Failed to submit your enquiry. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 text-primary my-8">
      <h1 className="text-3xl font-bold text-center mb-8">SBCODL: Empowering Learning, Anytime, Anywhere</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - Accordion */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Our Advantage</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                Culturally Diverse Learning Environment
              </AccordionTrigger>
              <AccordionContent>
                We provide students with a rich and inclusive space where students of different backgrounds 
                come together to share ideas, cultures, and experiences, creating a vibrant global community.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                Focus on Long-Term Career Success
              </AccordionTrigger>
              <AccordionContent>
                Our programs are designed to equip our students with the essential knowledge, practical skills, 
                and professional networks required for sustained success.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                Highly Qualified & Experienced Faculty
              </AccordionTrigger>
              <AccordionContent>
                We maintain the optimal teacher-to-student ratio with a dedicated team comprising highly qualified 
                and experienced educators. Our faculty extends beyond the confines of academic support for students 
                to excel in competitions as well as admissions to colleges.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                Comprehensive Study Materials
              </AccordionTrigger>
              <AccordionContent>
                Our well-structured and thoughtfully curated learning materials enhance the educational journey, 
                ensuring students achieve academic excellence.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                Integrated Teaching Approach
              </AccordionTrigger>
              <AccordionContent>
                We pool practical insights with theoretical knowledge to foster a holistic understanding and 
                the effective application of concepts to real-world challenges.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Right side - Contact Form */}
        <div>
          <Card className='bg-primary text-foreground border-none shadow-lg'>
            <CardHeader>
              <CardTitle className='text-2xl'>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
                  Your enquiry has been submitted successfully! We'll get back to you soon.
                </div>
              )}
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
                  {error}
                </div>
              )}
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full border-gray-300"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full border-gray-300"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="w-full border-gray-300"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full border-gray-300"
                    required
                  />
                </div>
                
                <div>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className="w-full border-gray-300"
                    rows={4}
                    required
                  />
                </div>
                <Button 
                  variant="destructive" 
                  type="submit" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;