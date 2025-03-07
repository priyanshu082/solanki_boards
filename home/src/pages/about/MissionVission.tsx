const MissionVision = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-10 px-4 shadow-lg">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Mission and Vision</h1>
        <p className="text-center max-w-4xl mx-auto text-lg opacity-90">
          Shaping the future of education through accessibility, innovation, and excellence
        </p>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-10">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary border-b border-primary pb-2 mb-4">Vision</h2>
          <p className="text-gray-800 leading-relaxed mb-4">
            To be a leader in the integration of Open and Distance Learning (ODL) with teaching, learning, and the progress of knowledge. SBCODL endeavors to make quality education accessible to learners from diverse backgrounds using advanced technology and novel pedagogies, making lifelong learning a reality in India.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary border-b border-primary pb-2 mb-4">Mission</h2>
          <p className="text-gray-700 mb-4">
            As a student-centered and futuristic education organization, SBCODL is dedicated to:
          </p>
          <ul className="space-y-4 mb-6">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1 flex-shrink-0">✔</span>
              <div>
                <span className="font-semibold text-primary">Scaling up Vocational Education, Open and Distance Learning (ODL), and Skill Development</span> programs to serve diverse learners.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1 flex-shrink-0">✔</span>
              <div>
                <span className="font-semibold text-primary">Offering high-quality, industry-specific, and affordable courses</span> that equip students with hands-on knowledge and professional competencies.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1 flex-shrink-0">✔</span>
              <div>
                <span className="font-semibold text-primary">Utilizing cutting-edge educational technologies</span> to provide an interactive, flexible, and immersive learning experience.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1 flex-shrink-0">✔</span>
              <div>
                <span className="font-semibold text-primary">Closing the gap between conventional education and contemporary learning methods</span>, providing equal opportunities to all, regardless of geographical or socio-economic constraints.
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1 flex-shrink-0">✔</span>
              <div>
                <span className="font-semibold text-primary">Encouraging innovation, research, and international collaborations</span> to enable a knowledge-driven and progressive society.
              </div>
            </li>
          </ul>
          <p className="text-gray-800 italic border-t border-gray-200 pt-4">
            SBCODL commits to shaping education in terms of making it accessible, inclusive, and future-capable, facilitating consistent advancements in academic excellence and professional growth throughout India and the world.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MissionVision;
