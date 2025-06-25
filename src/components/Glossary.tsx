import React, { useState } from 'react';
import { GLOSSAIRE } from '../data/urodynamicData';
import { BookOpen, Search, Info } from 'lucide-react';

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  const filteredTerms = Object.entries(GLOSSAIRE).filter(([term, data]) =>
    term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Glossaire Urodynamique</h1>
          <p className="text-lg text-gray-600">
            Définitions complètes des paramètres et termes techniques en urodynamique
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Rechercher un terme..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Liste des termes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTerms.map(([term, data]) => (
            <div
              key={term}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-blue-900">{term}</h3>
                  <button
                    onClick={() => setSelectedTerm(selectedTerm === term ? null : term)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-gray-700 mb-3">{data.definition}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className="font-medium mr-2">Unité:</span>
                  <span>{data.unite}</span>
                </div>
                
                <div className="text-sm text-gray-500 mb-2">
                  <span className="font-medium">Valeurs normales:</span>
                  <span className="ml-2">{data.valeursNormales}</span>
                </div>

                {selectedTerm === term && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Comment l'obtenir</h4>
                    <p className="text-blue-800 text-sm mb-3">{data.obtention}</p>
                    
                    <h4 className="font-medium text-blue-900 mb-2">Interprétation</h4>
                    <p className="text-blue-800 text-sm">{data.interpretation}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun terme trouvé</h3>
            <p className="text-gray-500">
              Essayez avec d'autres mots-clés ou parcourez tous les termes disponibles.
            </p>
          </div>
        )}

        {/* Section informative */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">À Propos de ce Glossaire</h2>
          <div className="text-blue-800 space-y-2">
            <p>
              Ce glossaire contient les définitions des principaux paramètres utilisés en urodynamique, 
              conformément aux recommandations de l'International Continence Society (ICS).
            </p>
            <p>
              Chaque terme inclut sa définition, son unité de mesure, les valeurs de référence, 
              la méthode d'obtention et son interprétation clinique.
            </p>
            <p>
              Ces informations sont essentielles pour une interprétation correcte des examens 
              urodynamiques et une prise en charge optimale des patients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}