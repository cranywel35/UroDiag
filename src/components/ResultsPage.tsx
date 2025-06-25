import React, { useState } from 'react';
import { DiagnosticResult } from '../data/urodynamicData';
import { AlertCircle, CheckCircle, FileText, TrendingUp, Users, AlertTriangle, Calculator, Target, Info, MousePointer } from 'lucide-react';

interface ResultsPageProps {
  result: DiagnosticResult | null;
  onNewExam: () => void;
}

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-50 w-80 p-3 text-sm bg-white border border-gray-300 rounded-lg shadow-xl bottom-full left-0 mb-2 transform">
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-300 transform translate-y-px"></div>
          <div className="text-gray-800 leading-relaxed">
            {content}
          </div>
        </div>
      )}
    </div>
  );
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

  const formatNumber = (value: number | string): string => {
    if (typeof value === 'string') return value;
    
    // Si c'est un nombre entier, l'afficher sans décimale
    if (Number.isInteger(value)) {
      return value.toString();
    }
    
    // Sinon, l'afficher avec une décimale
    return value.toFixed(1);
  };

  const ConfidenceIcon = getConfidenceIcon(result.confidence);

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:bg-white print:py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 print:px-2">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 print:shadow-none print:border print:border-gray-300">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 print:bg-blue-600">
            <h1 className="text-2xl font-bold text-white print:text-xl">Rapport d'Analyse Urodynamique Complète</h1>
            <p className="text-blue-100 mt-1 print:text-blue-200">Résultats détaillés avec nomogrammes et index calculés</p>
          </div>
        </div>

        {/* Info pour les tooltips */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 print:hidden">
          <div className="flex items-center">
            <MousePointer className="w-5 h-5 text-blue-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">Information Interactive</h3>
              <p className="text-sm text-blue-700 mt-1">
                Passez votre curseur sur chaque recommandation, examen complémentaire, traitement, surveillance ou piège 
                pour obtenir des explications détaillées et comprendre le raisonnement médical.
              </p>
            </div>
          </div>
        </div>

        {/* Alertes critiques */}
        {result.alertesCritiques.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded print:border print:border-red-400">
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
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 print:shadow-none print:border print:border-gray-300">
          <div className="p-6 print:p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 print:text-lg">Diagnostic Principal</h2>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(result.confidence)}`}>
                <ConfidenceIcon className="w-4 h-4 mr-1" />
                Confiance: {Math.round(result.confidence * 100)}%
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded print:border print:border-blue-400">
              <h3 className="text-lg font-medium text-blue-900 print:text-base">{result.diagnostic}</h3>
            </div>
          </div>
        </div>

        {/* Index Calculés et Nomogrammes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 print:gap-4">
          {/* Index Calculés */}
          {Object.keys(result.indexCalcules).length > 0 && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none print:border print:border-gray-300">
              <div className="bg-purple-50 px-6 py-4 border-b border-purple-100 print:bg-purple-100 print:p-3">
                <div className="flex items-center">
                  <Calculator className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="text-lg font-semibold text-purple-800 print:text-base">Index Calculés</h3>
                </div>
              </div>
              <div className="p-6 print:p-4">
                <div className="space-y-3">
                  {Object.entries(result.indexCalcules).map(([index, valeur]) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 print:text-sm">{index}:</span>
                      <span className="text-lg font-bold text-purple-600 print:text-base">
                        {formatNumber(valeur)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Nomogrammes */}
          {(result.nomogrammes.schafer || result.nomogrammes.abramsGriffiths) && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none print:border print:border-gray-300">
              <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100 print:bg-indigo-100 print:p-3">
                <div className="flex items-center">
                  <Target className="w-5 h-5 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-indigo-800 print:text-base">Nomogrammes</h3>
                </div>
              </div>
              <div className="p-6 print:p-4">
                <div className="space-y-3">
                  {result.nomogrammes.schafer && (
                    <div>
                      <span className="font-medium text-gray-700 print:text-sm">Schafer:</span>
                      <span className="ml-2 text-indigo-600 print:text-sm">{result.nomogrammes.schafer}</span>
                    </div>
                  )}
                  {result.nomogrammes.abramsGriffiths && (
                    <div>
                      <span className="font-medium text-gray-700 print:text-sm">Abrams-Griffiths:</span>
                      <span className="ml-2 text-indigo-600 print:text-sm">{result.nomogrammes.abramsGriffiths}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Grid des résultats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:gap-4">
          {/* Recommandations */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none print:border print:border-gray-300">
            <div className="bg-green-50 px-6 py-4 border-b border-green-100 print:bg-green-100 print:p-3">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-green-800 print:text-base">Recommandations</h3>
              </div>
            </div>
            <div className="p-6 print:p-4">
              <ul className="space-y-3">
                {result.recommandations.map((recommandation, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
                    <Tooltip content={result.explications.recommandations[index] || "Explication non disponible"}>
                      <span className="text-gray-700 cursor-help hover:text-green-700 transition-colors print:text-sm print:cursor-default border-b border-dotted border-green-300 hover:border-green-500">
                        {recommandation}
                      </span>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Examens Complémentaires */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none print:border print:border-gray-300">
            <div className="bg-purple-50 px-6 py-4 border-b border-purple-100 print:bg-purple-100 print:p-3">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-purple-800 print:text-base">Examens Complémentaires</h3>
              </div>
            </div>
            <div className="p-6 print:p-4">
              <ul className="space-y-3">
                {result.examensComplementaires.map((examen, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3"></div>
                    <Tooltip content={result.explications.examensComplementaires[index] || "Explication non disponible"}>
                      <span className="text-gray-700 cursor-help hover:text-purple-700 transition-colors print:text-sm print:cursor-default border-b border-dotted border-purple-300 hover:border-purple-500">
                        {examen}
                      </span>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Traitements */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none print:border print:border-gray-300">
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 print:bg-blue-100 print:p-3">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-blue-800 print:text-base">Options Thérapeutiques</h3>
              </div>
            </div>
            <div className="p-6 print:p-4">
              <ul className="space-y-3">
                {result.traitements.map((traitement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                    <Tooltip content={result.explications.traitements[index] || "Explication non disponible"}>
                      <span className="text-gray-700 cursor-help hover:text-blue-700 transition-colors print:text-sm print:cursor-default border-b border-dotted border-blue-300 hover:border-blue-500">
                        {traitement}
                      </span>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Surveillance */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none print:border print:border-gray-300">
            <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-100 print:bg-yellow-100 print:p-3">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-yellow-800 print:text-base">Surveillance</h3>
              </div>
            </div>
            <div className="p-6 print:p-4">
              <ul className="space-y-3">
                {result.surveillance.map((surveillance, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3"></div>
                    <Tooltip content={result.explications.surveillance[index] || "Explication non disponible"}>
                      <span className="text-gray-700 cursor-help hover:text-yellow-700 transition-colors print:text-sm print:cursor-default border-b border-dotted border-yellow-300 hover:border-yellow-500">
                        {surveillance}
                      </span>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Pièges Diagnostiques */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-6 print:shadow-none print:border print:border-gray-300 print:mt-4">
          <div className="bg-red-50 px-6 py-4 border-b border-red-100 print:bg-red-100 print:p-3">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-red-800 print:text-base">Pièges Diagnostiques à Éviter</h3>
            </div>
          </div>
          <div className="p-6 print:p-4">
            <ul className="space-y-3">
              {result.pieges.map((piege, index) => (
                <li key={index} className="flex items-start">
                  <AlertTriangle className="flex-shrink-0 w-4 h-4 text-red-400 mt-1 mr-3" />
                  <Tooltip content={result.explications.pieges[index] || "Explication non disponible"}>
                    <span className="text-gray-700 cursor-help hover:text-red-700 transition-colors print:text-sm print:cursor-default border-b border-dotted border-red-300 hover:border-red-500">
                      {piege}
                    </span>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4 mt-8 print:hidden">
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

        {/* Footer pour impression */}
        <div className="hidden print:block mt-8 pt-4 border-t border-gray-300 text-center text-sm text-gray-600">
          <p>Rapport généré par UroDiag - Plateforme d'aide au diagnostic urodynamique</p>
          <p>Date d'impression: {new Date().toLocaleDateString('fr-FR')}</p>
        </div>
      </div>

      {/* Styles d'impression */}
      <style jsx>{`
        @media print {
          @page {
            margin: 1cm;
            size: A4;
          }
          
          .print\\:text-sm {
            font-size: 0.875rem !important;
          }
          
          .print\\:text-base {
            font-size: 1rem !important;
          }
          
          .print\\:text-lg {
            font-size: 1.125rem !important;
          }
          
          .print\\:text-xl {
            font-size: 1.25rem !important;
          }
          
          .print\\:p-2 {
            padding: 0.5rem !important;
          }
          
          .print\\:p-3 {
            padding: 0.75rem !important;
          }
          
          .print\\:p-4 {
            padding: 1rem !important;
          }
          
          .print\\:px-2 {
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
          }
          
          .print\\:py-4 {
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
          }
          
          .print\\:mt-4 {
            margin-top: 1rem !important;
          }
          
          .print\\:gap-4 {
            gap: 1rem !important;
          }
          
          .print\\:bg-white {
            background-color: white !important;
          }
          
          .print\\:bg-blue-600 {
            background-color: #2563eb !important;
          }
          
          .print\\:bg-blue-100 {
            background-color: #dbeafe !important;
          }
          
          .print\\:bg-green-100 {
            background-color: #dcfce7 !important;
          }
          
          .print\\:bg-purple-100 {
            background-color: #f3e8ff !important;
          }
          
          .print\\:bg-yellow-100 {
            background-color: #fef3c7 !important;
          }
          
          .print\\:bg-red-100 {
            background-color: #fee2e2 !important;
          }
          
          .print\\:bg-indigo-100 {
            background-color: #e0e7ff !important;
          }
          
          .print\\:text-blue-200 {
            color: #bfdbfe !important;
          }
          
          .print\\:border {
            border-width: 1px !important;
          }
          
          .print\\:border-gray-300 {
            border-color: #d1d5db !important;
          }
          
          .print\\:border-blue-400 {
            border-color: #60a5fa !important;
          }
          
          .print\\:border-red-400 {
            border-color: #f87171 !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:block {
            display: block !important;
          }
          
          .print\\:cursor-default {
            cursor: default !important;
          }
        }
      `}</style>
    </div>
  );
}