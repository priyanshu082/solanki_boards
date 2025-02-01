
const ChairmanMessage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-blue-900 text-white py-8 px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Chairman's Message</h1>
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Column */}
          <div className="md:w-1/3">
            <div className="sticky top-8">
              <img
                src="/api/placeholder/400/500"
                alt="Chairman"
                className="w-full rounded-lg shadow-lg mb-4"
              />
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">John Smith</h2>
                <p className="text-gray-600">Chairman & CEO</p>
              </div>
            </div>
          </div>

          {/* Message Column */}
          <div className="md:w-2/3">
            <div className="prose max-w-none">
              <p className="text-lg mb-6">
                Dear Stakeholders,
              </p>
              <p className="mb-6">
                It is with great pleasure that I address you as the Chairman of our esteemed organization. As we reflect on our journey and look towards the future, I am filled with immense pride in what we have accomplished together and excitement for what lies ahead.
              </p>
              <p className="mb-6">
                Over the past year, we have demonstrated remarkable resilience in the face of unprecedented challenges. Our commitment to innovation, sustainability, and excellence has not only enabled us to weather the storm but has also positioned us strongly for future growth and success.
              </p>
              <p className="mb-6">
                Our achievements this year have been nothing short of extraordinary. We have expanded our market presence, launched groundbreaking initiatives, and strengthened our relationships with stakeholders across the globe. Our financial performance reflects the robustness of our business model and the dedication of our team.
              </p>
              <p className="mb-6">
                Looking ahead, we remain focused on our strategic objectives: driving sustainable growth, fostering innovation, and creating value for all our stakeholders. We are investing heavily in new technologies, enhancing our operational efficiency, and developing our talent pool to ensure we remain at the forefront of our industry.
              </p>
              <p className="mb-6">
                Sustainability continues to be at the heart of everything we do. We are committed to reducing our environmental footprint, promoting social responsibility, and maintaining the highest standards of corporate governance. Our efforts in these areas have been recognized internationally, and we continue to raise the bar for ourselves.
              </p>
              <p className="mb-6">
                None of these achievements would have been possible without the unwavering support of our employees, customers, partners, and shareholders. Your trust and confidence in our vision have been instrumental in our success.
              </p>
              <p className="mb-6">
                As we move forward, I am confident that our strong foundation, clear strategy, and dedicated team will enable us to achieve even greater heights. We remain committed to delivering value to our shareholders while making a positive impact on society.
              </p>
              <p className="mb-6">
                Thank you for your continued support and trust in our organization. Together, we will continue to build a stronger, more sustainable future for generations to come.
              </p>
              <p className="mb-6">
                Best regards,
              </p>
              <p className="font-semibold">
                John Smith<br />
                Chairman & CEO
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChairmanMessage;