import chairman from "../../assets/images/chairman2.jpeg"

const ChairmanMessage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-primary text-white py-8 px-4 text-center">
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
                <h2 className="text-xl font-semibold text-gray-800">Dr. Arvind Singh</h2>
                <p className="text-gray-600 text-sm">Chairman</p>
              </div>
            </div>
          </div>

          {/* Message Column */}
          <div className="md:w-2/3 text-black">
            <div className="prose max-w-none">
              <p className="mb-6">
                The founders established the Solanki Brothers Council for Open and Distance Learning (SBCODL) to contribute toward creating open-access opportunities for learners, especially those unable to attend regular classroom sessions. By offering flexible and accessible instructional delivery, we ensure an educational experience that is just as effective as conventional in-person learning.
              </p>
              <p className="mb-6">
                Leveraging online platforms has allowed us to overcome geographical limitations and deliver educational resources efficiently. Guided by the National Policy on Education, SBCODL is committed to strengthening and expanding open learning opportunities across K-12 education, Undergraduate, Postgraduate, and Doctoral (Ph.D.) programs, serving students both within and outside India. Our independent education system operates with its own curriculum and examinations, issuing valid certificates that cater to the needs of diverse learners and working professionals worldwide.
              </p>
              <p className="mb-6">
                At SBCODL, we prioritize practical and convenient education delivery. Upon completing a simple online admission process, students gain instant access to comprehensive study materials. Our language-neutral instructional resources enable learners to choose their preferred language for study, fostering inclusivity and adaptability. Additionally, we maintain transparency and trust by allowing online verification of successful students' results.
              </p>
              <p className="mb-6">
                This initiative has followed the vision of the National Policy on Education to make learning accessible and convenient through digital platforms. By embracing this innovative model, SBCODL continues to extend its reach, empowering learners across the globe.
              </p>
              <p className="mb-6">
                Students can choose their subjects under a well-planned scheme of studies. Students qualify for certification by passing at least five subjects, including at least one language, according to prescribed norms.
              </p>
              <p className="mb-6">
                We are proud of our steps toward the construction of a worldwide network of accessible education and stay committed to fostering learning opportunities across borders.
              </p>
              <p className="mb-6">
                Sincerely,
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