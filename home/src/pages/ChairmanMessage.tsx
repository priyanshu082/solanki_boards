import chairman from "../assets/images/chairman2.jpeg"
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
          <div className="md:w-1/5">
            <div className="sticky top-28">
              <img
                src={chairman}
                alt="Chairman"
                className="h-[20vw] rounded-lg shadow-lg mb-4"
              />
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">SBCODL Chairman</h2>
                <p className="text-gray-600">Chairman</p>
              </div>
            </div>
          </div>

          {/* Message Column */}
          <div className="md:w-2/3 text-black">
            <div className="prose max-w-none">
              <p className="mb-6">
                The founders established Solanki Brothers Council for Open and Distance Learning in its effort to contribute toward open accessibility for the opportunity to provide student learners, students unable to follow regular class attending sessions, by opening easy-access instructional delivery avenues which is conveniently just as productive as those availed during physical class delivery by conventional instruction methodology.
              </p>
              <p className="mb-6">
                Utilizing online platforms has enabled us to overcome geographical constraints and deliver educational resources effectively. Guided by the National Policy on Education, SBCODL aims at strengthening and expanding open learning opportunities at pre-nursery, senior secondary, diploma, postgraduate diploma, and certificate levels both within and outside India. This independent education system is based on its own curriculum and examinations and issues valid certificates that meet the needs of diverse students and working professionals worldwide.
              </p>
              <p className="mb-6">
                At SBCODL, we offer education in a very practical and convenient manner. Students get instant access to comprehensive study materials after they complete a simple online admission process. Our language-neutral instructional resources allow students to choose their preferred language for learning, ensuring inclusivity and flexibility. Moreover, the results of successful students are verified online, maintaining transparency and trust in our educational processes.
              </p>
              <p className="mb-6">
                This project is in line with the National Policy on Education's vision to make education accessible and convenient by using online portals. By embracing this revolutionary concept, SBCODL aims to expand its reach and enable online education for learners across the globe.
              </p>
              <p className="mb-6">
                Students are free to choose subjects from a comprehensive scheme of studies. To be eligible for certification, students must pass at least five subjects, of which at least one should be a language or up to two languages, as per the prescribed norms.
              </p>
              <p className="mb-6">
                We are proud of our strides in building a global network of accessible education and remain committed to furthering the cause of learning for students across borders.
              </p>
              <p className="mb-6">
                Yours sincerely,
              </p>
              <p className="font-semibold">
                Chairman, SBCODL
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChairmanMessage;