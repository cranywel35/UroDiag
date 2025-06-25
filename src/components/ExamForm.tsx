import React, { useState } from 'react';
import { PatientData, SYMPTOMES, ANTECEDENTS, TRAITEMENTS, TEMPLATES_EXAMENS } from '../data/urodynamicData';
import { User, Activity, BarChart3, Target, Zap, TestTube, RotateCcw, FileText, AlertCircle } from 'lucide-react';

interface ExamFormProps {
  onAnalyze: (data: PatientData) => void;
}

export default function ExamForm({ onAnalyze }: ExamFormProps) {
  const [activeSection, setActiveSection] = useState('patient');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [formData, setFormData] = useState<PatientData>({
    age: 50,
    sexe: 'M',
    symptomes: [],
    antecedents: [],
    traitements: [],
    debitMetrie: {
      qMax: 15,
      qMoyen: 10,
      volumeVide: 300,
      tempsVidange: 30,
      formeDebitmetrie: 'normale',
      tempsLatence: 5,
      tempsJusquQmax: 10
    },
    cystometrie: {
      capaciteVesicale: 400,
      pressionDetrusor: 30,
      pressionAbdominale: 15,
      pressionVesicale: 45,
      compliance: 20,
      contractions: 'stables',
      sensibilite: 'normale',
      premierBesoin: 150,
      besoinNormal: 250,
      capaciteMaximale: 400,
      vitesseRemplissage: 50,
      pressionFuite: 0
    },
    profilPression: {
      pressionUretrale: 60,
      longueurUretrale: 30,
      pressionClotureUretrale: 45,
      longueurFonctionnelle: 25,
      pressionTransmission: 80,
      profilDynamique: 'normal'
    },
    emg: {
      activiteBasale: 'normale',
      recrutementVolontaire: 'normal',
      reflexeSphincter: 'present',
      synergieDetrusorSphincter: 'normale',
      fatigabilite: 'normale'
    },
    etudePressionDebit: {
      pressionDetrusorQmax: 25,
      indexObstruction: 0,
      indexContractilite: 100,
      resistanceUretrale: 1.0,
      conductanceUretrale: 15
    },
    testsProvocation: {
      testToux: 'negatif',
      testValsalva: 'negatif',
      testStressUretral: 0,
      pressionFuiteAbdominale: 0
    },
    cystometrieRemplissage: {
      vitesseLente: {
        compliance: 22,
        contractions: 'absentes',
        sensibilite: 'normale'
      },
      vitesseRapide: {
        compliance: 18,
        contractions: 'absentes',
        sensibilite: 'normale'
      },
      vitessePhysiologique: {
        compliance: 20,
        contractions: 'absentes',
        sensibilite: 'normale'
      }
    },
    residuPostMictionnel: 30
  });

  const [errors, setErrors] = useState<string[]>([]);

  const sections = [
    { id: 'patient', label: 'Patient', icon: User },
    { id: 'debitmetrie', label: 'Débitmétrie', icon: BarChart3 },
    { id: 'cystometrie', label: 'Cystométrie', icon: Activity },
    { id: 'profil', label: 'Profil Urétral', icon: Target },
    { id: 'emg', label: 'EMG', icon: Zap },
    { id: 'tests', label: 'Tests Complémentaires', icon: TestTube }
  ];

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (templateId && TEMPLATES_EXAMENS[templateId as keyof typeof TEMPLATES_EXAMENS]) {
      const template = TEMPLATES_EXAMENS[templateId as keyof typeof TEMPLATES_EXAMENS];
      setFormData(prev => ({
        ...prev,
        ...template.defaultValues
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (formData.age < 1 || formData.age > 120) {
      newErrors.push('L\'âge doit être entre 1 et 120 ans');
    }

    if (formData.debitMetrie.qMax <= 0) {
      newErrors.push('Le Qmax doit être supérieur à 0');
    }

    if (formData.cystometrie.capaciteVesicale <= 0) {
      newErrors.push('La capacité vésicale doit être supérieure à 0');
    }

    if (formData.residuPostMictionnel < 0) {
      newErrors.push('Le résidu post-mictionnel ne peut pas être négatif');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAnalyze(formData);
    }
  };

  const resetForm = () => {
    setSelectedTemplate('');
    setFormData({
      age: 50,
      sexe: 'M',
      symptomes: [],
      antecedents: [],
      traitements: [],
      debitMetrie: {
        qMax: 15,
        qMoyen: 10,
        volumeVide: 300,
        tempsVidange: 30,
        formeDebitmetrie: 'normale',
        tempsLatence: 5,
        tempsJusquQmax: 10
      },
      cystometrie: {
        capaciteVesicale: 400,
        pressionDetrusor: 30,
        pressionAbdominale: 15,
        pressionVesicale: 45,
        compliance: 20,
        contractions: 'stables',
        sensibilite: 'normale',
        premierBesoin: 150,
        besoinNormal: 250,
        capaciteMaximale: 400,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 60,
        longueurUretrale: 30,
        pressionClotureUretrale: 45,
        longueurFonctionnelle: 25,
        pressionTransmission: 80,
        profilDynamique: 'normal'
      },
      emg: {
        activiteBasale: 'normale',
        recrutementVolontaire: 'normal',
        reflexeSphincter: 'present',
        synergieDetrusorSphincter: 'normale',
        fatigabilite: 'normale'
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 25,
        indexObstruction: 0,
        indexContractilite: 100,
        resistanceUretrale: 1.0,
        conductanceUretrale: 15
      },
      testsProvocation: {
        testToux: 'negatif',
        testValsalva: 'negatif',
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 22,
          contractions: 'absentes',
          sensibilite: 'normale'
        },
        vitesseRapide: {
          compliance: 18,
          contractions: 'absentes',
          sensibilite: 'normale'
        },
        vitessePhysiologique: {
          compliance: 20,
          contractions: 'absentes',
          sensibilite: 'normale'
        }
      },
      residuPostMictionnel: 30
    });
    setErrors([]);
  };

  const toggleArrayItem = (array: string[], item: string, setter: (value: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  const renderPatientSection = () => (
    <div className="space-y-6">
      {/* Template Selection */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-3">Templates Pré-définis</h4>
        <select
          value={selectedTemplate}
          onChange={(e) => handleTemplateChange(e.target.value)}
          className="w-full p-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Sélectionner un template...</option>
          {Object.entries(TEMPLATES_EXAMENS).map(([key, template]) => (
            <option key={key} value={key}>{template.nom}</option>
          ))}
        </select>
        {selectedTemplate && (
          <p className="text-sm text-blue-700 mt-2">
            {TEMPLATES_EXAMENS[selectedTemplate as keyof typeof TEMPLATES_EXAMENS].description}
          </p>
        )}
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Âge</label>
          <input
            type="number"
            min="1"
            max="120"
            value={formData.age}
            onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sexe</label>
          <select
            value={formData.sexe}
            onChange={(e) => setFormData(prev => ({ ...prev, sexe: e.target.value as 'M' | 'F' }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">RPM (ml)</label>
          <input
            type="number"
            min="0"
            value={formData.residuPostMictionnel}
            onChange={(e) => setFormData(prev => ({ ...prev, residuPostMictionnel: parseInt(e.target.value) || 0 }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Symptoms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Symptômes</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {SYMPTOMES.map(symptome => (
            <label key={symptome} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
              <input
                type="checkbox"
                checked={formData.symptomes.includes(symptome)}
                onChange={() => toggleArrayItem(
                  formData.symptomes,
                  symptome,
                  (newSymptomes) => setFormData(prev => ({ ...prev, symptomes: newSymptomes }))
                )}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{symptome}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Antecedents */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Antécédents</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {ANTECEDENTS.map(antecedent => (
            <label key={antecedent} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
              <input
                type="checkbox"
                checked={formData.antecedents.includes(antecedent)}
                onChange={() => toggleArrayItem(
                  formData.antecedents,
                  antecedent,
                  (newAntecedents) => setFormData(prev => ({ ...prev, antecedents: newAntecedents }))
                )}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{antecedent}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Treatments */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Traitements en cours</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {TRAITEMENTS.map(traitement => (
            <label key={traitement} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
              <input
                type="checkbox"
                checked={formData.traitements.includes(traitement)}
                onChange={() => toggleArrayItem(
                  formData.traitements,
                  traitement,
                  (newTraitements) => setFormData(prev => ({ ...prev, traitements: newTraitements }))
                )}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{traitement}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDebitmetrieSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Qmax (ml/s)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={formData.debitMetrie.qMax}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              debitMetrie: { ...prev.debitMetrie, qMax: parseFloat(e.target.value) || 0 }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Q moyen (ml/s)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={formData.debitMetrie.qMoyen}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              debitMetrie: { ...prev.debitMetrie, qMoyen: parseFloat(e.target.value) || 0 }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Volume vidé (ml)</label>
          <input
            type="number"
            min="0"
            value={formData.debitMetrie.volumeVide}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              debitMetrie: { ...prev.debitMetrie, volumeVide: parseInt(e.target.value) || 0 }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Temps vidange (s)</label>
          <input
            type="number"
            min="0"
            value={formData.debitMetrie.tempsVidange}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              debitMetrie: { ...prev.debitMetrie, tempsVidange: parseInt(e.target.value) || 0 }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Temps latence (s)</label>
          <input
            type="number"
            min="0"
            value={formData.debitMetrie.tempsLatence}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              debitMetrie: { ...prev.debitMetrie, tempsLatence: parseInt(e.target.value) || 0 }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Forme débitmétrie</label>
          <select
            value={formData.debitMetrie.formeDebitmetrie}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              debitMetrie: { ...prev.debitMetrie, formeDebitmetrie: e.target.value as any }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="normale">Normale</option>
            <option value="en_plateau">En plateau</option>
            <option value="intermittente">Intermittente</option>
            <option value="en_cloche">En cloche</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderCystometrieSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Capacité vésicale (ml)</label>
          <input
            type="number"
            min="0"
            value={formData.cystometrie.capaciteVesicale}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              cystometrie: { ...prev.cystometrie, capaciteVesicale: parseInt(e.target.value) || 0 }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pression détrusor (cmH2O)</label>
          <input
            type="number"
            min="0"
            value={formData.cystometrie.pressionDetrusor}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              cystometrie: { ...prev.cystometrie, pressionDetrusor: parseInt(e.target.value) || 0 }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Compliance (ml/cmH2O)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={formData.cystometrie.compliance}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              cystometrie: { ...prev.cystometrie, compliance: parseFloat(e.target.value) || 0 }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Premier besoin (ml)</label>
          <input
            type="number"
            min="0"
            value={formData.cystometrie.premierBesoin}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              cystometrie: { ...prev.cystometrie, premierBesoin: parseInt(e.target.value) || 0 }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Besoin normal (ml)</label>
          <input
            type="number"
            min="0"
            value={formData.cystometrie.besoinNormal}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              cystometrie: { ...prev.cystometrie, besoinNormal: parseInt(e.target.value) || 0 }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contractions</label>
          <select
            value={formData.cystometrie.contractions}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              cystometrie: { ...prev.cystometrie, contractions: e.target.value as any }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="absentes">Absentes</option>
            <option value="stables">Stables</option>
            <option value="instables">Instables</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderProfilSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pression urétrale (cmH2O)</label>
          <input
            type="number"
            min="0"
            value={formData.profilPression.pressionUretrale}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              profilPression: { ...prev.profilPression, pressionUretrale: parseInt(e.target.value) || 0 }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pression clôture (cmH2O)</label>
          <input
            type="number"
            min="0"
            value={formData.profilPression.pressionClotureUretrale}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              profilPression: { ...prev.profilPression, pressionClotureUretrale: parseInt(e.target.value) || 0 }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Longueur urétrale (mm)</label>
          <input
            type="number"
            min="0"
            value={formData.profilPression.longueurUretrale}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              profilPression: { ...prev.profilPression, longueurUretrale: parseInt(e.target.value) || 0 }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderEMGSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Activité basale</label>
          <select
            value={formData.emg.activiteBasale}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              emg: { ...prev.emg, activiteBasale: e.target.value as any }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="normale">Normale</option>
            <option value="augmentee">Augmentée</option>
            <option value="diminuee">Diminuée</option>
            <option value="absente">Absente</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Synergie détrusor-sphincter</label>
          <select
            value={formData.emg.synergieDetrusorSphincter}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              emg: { ...prev.emg, synergieDetrusorSphincter: e.target.value as any }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="normale">Normale</option>
            <option value="dyssynergie">Dyssynergie</option>
            <option value="pseudodyssynergie">Pseudo-dyssynergie</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderTestsSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Test à la toux</label>
          <select
            value={formData.testsProvocation.testToux}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              testsProvocation: { ...prev.testsProvocation, testToux: e.target.value as any }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="negatif">Négatif</option>
            <option value="positif_faible">Positif faible</option>
            <option value="positif_fort">Positif fort</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pression détrusor Qmax (cmH2O)</label>
          <input
            type="number"
            min="0"
            value={formData.etudePressionDebit.pressionDetrusorQmax}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              etudePressionDebit: { ...prev.etudePressionDebit, pressionDetrusorQmax: parseInt(e.target.value) || 0 }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pression fuite abdominale (cmH2O)</label>
          <input
            type="number"
            min="0"
            value={formData.testsProvocation.pressionFuiteAbdominale}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              testsProvocation: { ...prev.testsProvocation, pressionFuiteAbdominale: parseInt(e.target.value) || 0 }
            }))}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'patient': return renderPatientSection();
      case 'debitmetrie': return renderDebitmetrieSection();
      case 'cystometrie': return renderCystometrieSection();
      case 'profil': return renderProfilSection();
      case 'emg': return renderEMGSection();
      case 'tests': return renderTestsSection();
      default: return renderPatientSection();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Nouvel Examen Urodynamique</h1>
            <p className="text-blue-100 mt-1">Saisissez les paramètres de l'examen pour obtenir une analyse diagnostique</p>
          </div>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded">
            <div className="flex">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Erreurs de validation</h3>
                <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Navigation Sections */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeSection === section.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {section.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Section Content */}
            <div className="p-6">
              {renderSection()}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Réinitialiser
            </button>

            <button
              type="submit"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4 mr-2" />
              Analyser l'Examen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}