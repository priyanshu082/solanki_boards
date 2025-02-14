import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { memberships } from '../../data/membership';

const AccreditationCards = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState<typeof memberships[number] | null>(null);

  const openDialog = (membership: typeof memberships[number]) => {
    setSelectedMembership(membership);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedMembership(null);
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">
        SBCODL Accreditations & Memberships
      </h1>
      <div className="grid grid-cols-1 gap-6">
        {memberships.map((membership) => (
          <Card 
            key={membership.id} 
            className="flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => openDialog(membership)}
          >
            <div className="w-1/4 min-w-[200px] h-64 flex-shrink-0">
              <img
                src={membership.image}
                alt={membership.title}
                className="w-full h-full object-fill"
              />
            </div>
            <CardContent className="flex-1 p-6">
              <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                {membership.title}
              </h2>
              <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                {membership.description}
              </p>
              <a
                href={`https://${membership.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {membership.website}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      {isDialogOpen && selectedMembership && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl h-fit max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
            <div className="w-full md:w-2/5 p-6 bg-gray-50">
              <img
                src={selectedMembership.image}
                alt={selectedMembership.title}
                className="w-full h-48 md:h-80 object-contain"
              />
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto scrollbar-hide relative">
              <button 
                onClick={closeDialog} 
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <span className="text-gray-600 text-xl">&times;</span>
              </button>
              
              <div className="pr-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  {selectedMembership.title}
                </h2>
                <p className="text-gray-600 mb-6 whitespace-pre-line leading-relaxed">
                  {selectedMembership.description}
                </p>
                <a
                  href={`https://${selectedMembership.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccreditationCards;