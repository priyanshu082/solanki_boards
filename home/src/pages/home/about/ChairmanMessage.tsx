import chairman from "../../../assets/images/chairman2.jpeg"

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
              <h3 className="font-bold mb-4">Solanki Brothers Council for Open and Distance Learning (SBCODL)</h3>
              <p className="mb-6">
                The Solanki Brothers Council for Open and Distance Learning (SBCODL) has been created with a focus on giving good quality education to everyone. SBCODL is working actively towards spreading educational, social, and economic improvement among individuals from all over India. The Council is also involved in uplifting economically backward learners through Open Schooling and Distance Education courses that help in offering flexible and inclusive study opportunities.
              </p>
              <p className="mb-6">
                SBCODL aims to build a world-class education system that promotes innovation, creativity, and excellence. We are of the opinion that excellence is a mindset, and we aim to instill it in our students by adopting contemporary, flexible, and technology-based learning methods.
              </p>
              <p className="mb-6">
                The Open Learning System developed by SBCODL seeks to democratize learning, as it provides education to everyone as a lifelong learning process. The flexibility and innovativeness of the system meet the varied learning needs of learners, ranging from those seeking vocational education and skill acquisition.
              </p>
              <p className="mb-6">
                In the highly competitive world we live in today, remaining ahead means that there must be ongoing learning and development of skills. Education has to be action-based, and our committed instructors take up the important job of molding the future of the students. Teachers are capable of changing people, we think, and through our challenging academic framework, we equip students to succeed professionally.
              </p>
              <p className="mb-6">
                The need for good education is increasing, and a large number of students tend to look for opportunities in education overseas. Understanding this, SBCODL has introduced UG & PG, Certificate, Diploma, PG Diploma, Diploma Engineering, and Management Courses using the Open and Distance Learning Mode, providing access to students of high-quality education that is globally relevant in India.
              </p>
              <p className="mb-6">
                We believe in empowering students, academic excellence, and creating improved career opportunities for all our students.
              </p>
              <p className="mb-2">
                Sd/-
              </p>
              <p className="font-semibold">
                The Chairman
              </p>
              <p className="font-semibold">
                Solanki Brothers Council for Open and Distance Learning (SBCODL)
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChairmanMessage;