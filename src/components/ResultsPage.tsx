import React from 'react';
import { DiagnosticResult } from '../data/urodynamicData';
import { AlertCircle, CheckCircle, FileText, TrendingUp, Users, AlertTriangle, Calculator, Target } from 'lucide-react';

interface ResultsPageProps {
  result: DiagnosticResult | null;
  onNewExam: () => void;
}

export default function ResultsPage({ result, onNewExam }: ResultsPageProps) {
  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Aucun Résultat Disponible</h2>
          <p className="text-gray-600 mb-6">Veuillez d'abord effectuer un examen pour voir les résultats.</p>
          <button
            onClick={onNewExam}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Commencer un Examen
          </button>
        </div>
      </div>
    );
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-100';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 0.8) return CheckCircle;
    if (confidence >= 0.6) return AlertCircle;
    return AlertTriangle;
  };

  const ConfidenceIcon = getConfidenceIcon(result.confidence);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Rapport d'Analyse Urodynamique Complète</h1>
            <p className="text-blue-100 mt-1">Résultats détaillés avec nomogrammes et index calculés</p>
          </div>
        </div>

        {/* Alertes critiques */}
        {result.alertesCritiques.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Alertes Critiques</h3>
                <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                  {result.alertesCritiques.map((alerte, index) => (
                    <li key={index}>{alerte}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Diagnostic Principal */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Diagnostic Principal</h2>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
                <ConfidenceIcon className="w-4 h-4 mr-1" />
                Confiance: {Math.round(result.confidence * 100)}%
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <h3 className="text-lg font-medium text-blue-900">{result.diagnostic}</h3>
            </div>
          </div>
        </div>

        {/* Index Calculés et Nomogrammes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Index Calculés */}
          {Object.keys(result.indexCalcules).length > 0 && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-purple-50 px-6 py-4 border-b border-purple-100">
                <div className="flex items-center">
                  <Calculator className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="text-lg font-semibold text-purple-800">Index Calculés</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {Object.entries(result.indexCalcules).map(([index, valeur]) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{index}:</span>
                      <span className="text-lg font-bold text-purple-600">
                        {typeof valeur === 'number' ? valeur.toFixed(1) : valeur}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Nomogrammes */}
          {(result.nomogrammes.schafer || result.nomogrammes.abramsGriffiths) && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                <div className="flex items-center">
                  <Target className="w-5 h-5 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-indigo-800">Nomogrammes</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {result.nomogrammes.schafer && (
                    <div>
                      <span className="font-medium text-gray-700">Schafer:</span>
                      <span className="ml-2 text-indigo-600">{result.nomogrammes.schafer}</span>
                    </div>
                  )}
                  {result.nomogrammes.abramsGriffiths && (
                    <div>
                      <span className="font-medium text-gray-700">Abrams-Griffiths:</span>
                      <span className="ml-2 text-indigo-600">{result.nomogrammes.abramsGriffiths}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Grid des résultats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recommandations */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-green-50 px-6 py-4 border-b border-green-100">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-green-800">Recommandations</h3>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {result.recommandations.map((recommandation, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">{recommandation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Examens Complémentaires */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-purple-50 px-6 py-4 border-b border-purple-100">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-purple-800">Examens Complémentaires</h3>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {result.examensComplementaires.map((examen, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">{examen}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Traitements */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-blue-800">Options Thérapeutiques</h3>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {result.traitements.map((traitement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">{traitement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Surveillance */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-100">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-yellow-800">Surveillance</h3>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {result.surveillance.map((surveillance, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">{surveillance}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Pièges Diagnostiques */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-6">
          <div className="bg-red-50 px-6 py-4 border-b border-red-100">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-red-800">Pièges Diagnostiques à Éviter</h3>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {result.pieges.map((piege, index) => (
                <li key={index} className="flex items-start">
                  <AlertTriangle className="flex-shrink-0 w-4 h-4 text-red-400 mt-1 mr-3" />
                  <span className="text-gray-700">{piege}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={onNewExam}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Nouvel Examen
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Imprimer le Rapport
          </button>
        </div>
      </div>
    </div>
  );
}