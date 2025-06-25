// Base de données complète des paramètres uro-dynamiques et logique diagnostique
export interface PatientData {
  // Données démographiques
  age: number;
  sexe: 'M' | 'F';
  
  // Paramètres cliniques
  symptomes: string[];
  antecedents: string[];
  traitements: string[];
  
  // Paramètres uro-dynamiques de base
  debitMetrie: {
    qMax: number; // ml/s
    qMoyen: number; // ml/s
    volumeVide: number; // ml
    tempsVidange: number; // s
    formeDebitmetrie: 'normale' | 'en_plateau' | 'intermittente' | 'en_cloche';
    tempsLatence: number; // s
    tempsJusquQmax: number; // s
  };
  
  cystometrie: {
    capaciteVesicale: number; // ml
    pressionDetrusor: number; // cmH2O
    pressionAbdominale: number; // cmH2O
    pressionVesicale: number; // cmH2O
    compliance: number; // ml/cmH2O
    contractions: 'absentes' | 'stables' | 'instables';
    sensibilite: 'normale' | 'diminuee' | 'augmentee';
    // Nouveaux paramètres cystométriques
    premierBesoin: number; // ml
    besoinNormal: number; // ml
    capaciteMaximale: number; // ml
    vitesseRemplissage: number; // ml/min
    pressionFuite: number; // cmH2O
  };
  
  profilPression: {
    pressionUretrale: number; // cmH2O
    longueurUretrale: number; // mm
    pressionClotureUretrale: number; // cmH2O
    // Nouveaux paramètres du profil
    longueurFonctionnelle: number; // mm
    pressionTransmission: number; // %
    profilDynamique: 'normal' | 'altere' | 'absent';
  };
  
  // NOUVEAUX EXAMENS COMPLETS
  emg: {
    activiteBasale: 'normale' | 'augmentee' | 'diminuee' | 'absente';
    recrutementVolontaire: 'normal' | 'altere' | 'absent';
    reflexeSphincter: 'present' | 'absent' | 'retarde';
    synergieDetrusorSphincter: 'normale' | 'dyssynergie' | 'pseudodyssynergie';
    fatigabilite: 'normale' | 'augmentee';
  };
  
  etudePressionDebit: {
    pressionDetrusorQmax: number; // cmH2O
    indexObstruction: number; // BOO Index
    indexContractilite: number; // BCI
    resistanceUretrale: number; // cmH2O.s/ml
    conductanceUretrale: number; // ml/s/cmH2O
  };
  
  testsProvocation: {
    testToux: 'negatif' | 'positif_faible' | 'positif_fort';
    testValsalva: 'negatif' | 'positif_faible' | 'positif_fort';
    testStressUretral: number; // cmH2O
    pressionFuiteAbdominale: number; // cmH2O
  };
  
  cystometrieRemplissage: {
    vitesseLente: {
      compliance: number;
      contractions: 'absentes' | 'presentes';
      sensibilite: 'normale' | 'alteree';
    };
    vitesseRapide: {
      compliance: number;
      contractions: 'absentes' | 'presentes';
      sensibilite: 'normale' | 'alteree';
    };
    vitessePhysiologique: {
      compliance: number;
      contractions: 'absentes' | 'presentes';
      sensibilite: 'normale' | 'alteree';
    };
  };
  
  residuPostMictionnel: number; // ml
  
  // Paramètres calculés automatiquement
  parametresCalcules?: {
    indexObstructionBOO: number;
    indexContractiliteBCI: number;
    efficaciteVidange: number; // %
    ratioQmaxVolume: number;
    complianceCorrigee: number;
  };
}

export interface DiagnosticResult {
  diagnostic: string;
  confidence: number;
  recommandations: string[];
  examensComplementaires: string[];
  traitements: string[];
  surveillance: string[];
  pieges: string[];
  // Nouveaux éléments
  nomogrammes: {
    schafer?: string;
    abramsGriffiths?: string;
    autres?: string[];
  };
  alertesCritiques: string[];
  indexCalcules: {
    [key: string]: number;
  };
  // Ajout des explications pour les tooltips
  explications: {
    recommandations: string[];
    examensComplementaires: string[];
    traitements: string[];
    surveillance: string[];
    pieges: string[];
  };
}

// Symptômes disponibles (étendus)
export const SYMPTOMES = [
  'Pollakiurie diurne',
  'Nycturie',
  'Urgenturies',
  'Incontinence d\'urgence',
  'Incontinence d\'effort',
  'Incontinence mixte',
  'Incontinence par regorgement',
  'Dysurie',
  'Jet faible',
  'Jet interrompu',
  'Jet dévié',
  'Poussée abdominale',
  'Sensation de vidange incomplète',
  'Gouttes retardataires',
  'Rétention urinaire',
  'Rétention aiguë',
  'Douleurs pelviennes',
  'Brûlures urinaires',
  'Hématurie',
  'Énurésie nocturne',
  'Incontinence coïtale',
  'Douleurs pendant la miction'
];

export const ANTECEDENTS = [
  'Diabète',
  'Hypertension',
  'Maladie neurologique',
  'Sclérose en plaques',
  'Maladie de Parkinson',
  'AVC',
  'Traumatisme médullaire',
  'Spina bifida',
  'Chirurgie pelvienne',
  'Radiothérapie pelvienne',
  'Accouchements difficiles',
  'Hystérectomie',
  'Prostatectomie',
  'RTUP',
  'Sténose urétrale',
  'Infection urinaire récidivante',
  'Lithiase urinaire',
  'Prolapsus génital',
  'Chirurgie anti-incontinence',
  'Fracture du bassin'
];

export const TRAITEMENTS = [
  'Alpha-bloquants',
  'Anticholinergiques',
  'Bêta-3 agonistes',
  'Inhibiteurs 5-alpha réductase',
  'Œstrogènes locaux',
  'Injections de toxine botulique',
  'Neuromodulation',
  'Rééducation périnéale',
  'Bandelettes sous-urétrales',
  'Sphincter artificiel',
  'Auto-sondages',
  'Sonde à demeure',
  'Diurétiques',
  'Antispasmodiques'
];

// Templates d'examens pré-définis
export const TEMPLATES_EXAMENS = {
  'homme_senior': {
    nom: 'Homme Senior (>65 ans)',
    description: 'Template pour suspicion d\'obstruction prostatique',
    defaultValues: {
      age: 70,
      sexe: 'M' as const,
      symptomes: ['Dysurie', 'Jet faible', 'Nycturie'],
      antecedents: [],
      traitements: []
    }
  },
  'femme_incontinence': {
    nom: 'Femme avec Incontinence',
    description: 'Template pour bilan d\'incontinence féminine',
    defaultValues: {
      age: 55,
      sexe: 'F' as const,
      symptomes: ['Incontinence d\'effort'],
      antecedents: ['Accouchements difficiles'],
      traitements: []
    }
  },
  'neurologique': {
    nom: 'Patient Neurologique',
    description: 'Template pour vessie neurologique',
    defaultValues: {
      age: 45,
      sexe: 'M' as const,
      symptomes: ['Urgenturies', 'Rétention urinaire'],
      antecedents: ['Maladie neurologique'],
      traitements: []
    }
  },
  'enfant_enuresie': {
    nom: 'Enfant avec Énurésie',
    description: 'Template pédiatrique pour énurésie nocturne',
    defaultValues: {
      age: 8,
      sexe: 'M' as const,
      symptomes: ['Énurésie nocturne', 'Urgenturies'],
      antecedents: [],
      traitements: []
    }
  },
  'adolescent_dysurie': {
    nom: 'Adolescent avec Dysurie',
    description: 'Template pédiatrique pour troubles mictionnels',
    defaultValues: {
      age: 14,
      sexe: 'F' as const,
      symptomes: ['Dysurie', 'Pollakiurie diurne'],
      antecedents: [],
      traitements: []
    }
  }
};

// Cas cliniques de démonstration (12 cas complets incluant pédiatriques)
export const CAS_CLINIQUES = [
  {
    id: 1,
    titre: 'Hyperactivité vésicale idiopathique',
    description: 'Femme de 65 ans, pollakiurie et urgenturies',
    donnee: {
      age: 65,
      sexe: 'F' as const,
      symptomes: ['Pollakiurie diurne', 'Nycturie', 'Urgenturies', 'Incontinence d\'urgence'],
      antecedents: ['Hystérectomie'],
      traitements: [],
      debitMetrie: {
        qMax: 18,
        qMoyen: 12,
        volumeVide: 280,
        tempsVidange: 25,
        formeDebitmetrie: 'normale' as const,
        tempsLatence: 8,
        tempsJusquQmax: 12
      },
      cystometrie: {
        capaciteVesicale: 320,
        pressionDetrusor: 45,
        pressionAbdominale: 15,
        pressionVesicale: 60,
        compliance: 8,
        contractions: 'instables' as const,
        sensibilite: 'augmentee' as const,
        premierBesoin: 120,
        besoinNormal: 200,
        capaciteMaximale: 320,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 65,
        longueurUretrale: 28,
        pressionClotureUretrale: 45,
        longueurFonctionnelle: 25,
        pressionTransmission: 85,
        profilDynamique: 'normal' as const
      },
      emg: {
        activiteBasale: 'normale' as const,
        recrutementVolontaire: 'normal' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 35,
        indexObstruction: -5,
        indexContractilite: 120,
        resistanceUretrale: 0.8,
        conductanceUretrale: 22
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 10,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitesseRapide: {
          compliance: 6,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        },
        vitessePhysiologique: {
          compliance: 8,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        }
      },
      residuPostMictionnel: 25
    }
  },
  {
    id: 2,
    titre: 'Obstruction sous-vésicale masculine',
    description: 'Homme de 70 ans, dysurie et jet faible',
    donnee: {
      age: 70,
      sexe: 'M' as const,
      symptomes: ['Dysurie', 'Jet faible', 'Poussée abdominale', 'Sensation de vidange incomplète'],
      antecedents: [],
      traitements: ['Alpha-bloquants'],
      debitMetrie: {
        qMax: 8,
        qMoyen: 5,
        volumeVide: 180,
        tempsVidange: 45,
        formeDebitmetrie: 'en_plateau' as const,
        tempsLatence: 15,
        tempsJusquQmax: 25
      },
      cystometrie: {
        capaciteVesicale: 450,
        pressionDetrusor: 85,
        pressionAbdominale: 20,
        pressionVesicale: 105,
        compliance: 15,
        contractions: 'stables' as const,
        sensibilite: 'normale' as const,
        premierBesoin: 180,
        besoinNormal: 300,
        capaciteMaximale: 450,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 95,
        longueurUretrale: 35,
        pressionClotureUretrale: 75,
        longueurFonctionnelle: 32,
        pressionTransmission: 70,
        profilDynamique: 'normal' as const
      },
      emg: {
        activiteBasale: 'normale' as const,
        recrutementVolontaire: 'normal' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 75,
        indexObstruction: 45,
        indexContractilite: 140,
        resistanceUretrale: 4.2,
        conductanceUretrale: 8
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 18,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitesseRapide: {
          compliance: 12,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitessePhysiologique: {
          compliance: 15,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        }
      },
      residuPostMictionnel: 120
    }
  },
  {
    id: 3,
    titre: 'Incontinence urinaire d\'effort',
    description: 'Femme de 45 ans, fuites à l\'effort post-accouchement',
    donnee: {
      age: 45,
      sexe: 'F' as const,
      symptomes: ['Incontinence d\'effort'],
      antecedents: ['Accouchements difficiles'],
      traitements: ['Rééducation périnéale'],
      debitMetrie: {
        qMax: 22,
        qMoyen: 15,
        volumeVide: 350,
        tempsVidange: 20,
        formeDebitmetrie: 'normale' as const,
        tempsLatence: 5,
        tempsJusquQmax: 8
      },
      cystometrie: {
        capaciteVesicale: 380,
        pressionDetrusor: 25,
        pressionAbdominale: 12,
        pressionVesicale: 37,
        compliance: 20,
        contractions: 'stables' as const,
        sensibilite: 'normale' as const,
        premierBesoin: 150,
        besoinNormal: 250,
        capaciteMaximale: 380,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 35,
        longueurUretrale: 25,
        pressionClotureUretrale: 20,
        longueurFonctionnelle: 22,
        pressionTransmission: 45,
        profilDynamique: 'altere' as const
      },
      emg: {
        activiteBasale: 'diminuee' as const,
        recrutementVolontaire: 'altere' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'augmentee' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 20,
        indexObstruction: -15,
        indexContractilite: 95,
        resistanceUretrale: 0.4,
        conductanceUretrale: 28
      },
      testsProvocation: {
        testToux: 'positif_fort' as const,
        testValsalva: 'positif_faible' as const,
        testStressUretral: 45,
        pressionFuiteAbdominale: 35
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 22,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitesseRapide: {
          compliance: 18,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitessePhysiologique: {
          compliance: 20,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        }
      },
      residuPostMictionnel: 15
    }
  },
  {
    id: 4,
    titre: 'Vessie neurologique hyperactive',
    description: 'Homme de 55 ans, sclérose en plaques avec troubles mictionnels',
    donnee: {
      age: 55,
      sexe: 'M' as const,
      symptomes: ['Urgenturies', 'Incontinence d\'urgence', 'Pollakiurie diurne', 'Nycturie'],
      antecedents: ['Sclérose en plaques'],
      traitements: ['Anticholinergiques'],
      debitMetrie: {
        qMax: 12,
        qMoyen: 8,
        volumeVide: 220,
        tempsVidange: 35,
        formeDebitmetrie: 'intermittente' as const,
        tempsLatence: 12,
        tempsJusquQmax: 18
      },
      cystometrie: {
        capaciteVesicale: 250,
        pressionDetrusor: 65,
        pressionAbdominale: 18,
        pressionVesicale: 83,
        compliance: 5,
        contractions: 'instables' as const,
        sensibilite: 'diminuee' as const,
        premierBesoin: 80,
        besoinNormal: 150,
        capaciteMaximale: 250,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 85,
        longueurUretrale: 32,
        pressionClotureUretrale: 67,
        longueurFonctionnelle: 28,
        pressionTransmission: 60,
        profilDynamique: 'normal' as const
      },
      emg: {
        activiteBasale: 'augmentee' as const,
        recrutementVolontaire: 'altere' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'dyssynergie' as const,
        fatigabilite: 'augmentee' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 55,
        indexObstruction: 25,
        indexContractilite: 110,
        resistanceUretrale: 2.8,
        conductanceUretrale: 12
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 8,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        },
        vitesseRapide: {
          compliance: 3,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        },
        vitessePhysiologique: {
          compliance: 5,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        }
      },
      residuPostMictionnel: 80
    }
  },
  {
    id: 5,
    titre: 'Incontinence mixte post-ménopausique',
    description: 'Femme de 68 ans, incontinence d\'effort et d\'urgence',
    donnee: {
      age: 68,
      sexe: 'F' as const,
      symptomes: ['Incontinence mixte', 'Urgenturies', 'Pollakiurie diurne', 'Nycturie'],
      antecedents: ['Accouchements difficiles', 'Hystérectomie'],
      traitements: ['Œstrogènes locaux'],
      debitMetrie: {
        qMax: 16,
        qMoyen: 11,
        volumeVide: 290,
        tempsVidange: 28,
        formeDebitmetrie: 'normale' as const,
        tempsLatence: 7,
        tempsJusquQmax: 10
      },
      cystometrie: {
        capaciteVesicale: 340,
        pressionDetrusor: 38,
        pressionAbdominale: 14,
        pressionVesicale: 52,
        compliance: 12,
        contractions: 'instables' as const,
        sensibilite: 'augmentee' as const,
        premierBesoin: 100,
        besoinNormal: 180,
        capaciteMaximale: 340,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 42,
        longueurUretrale: 24,
        pressionClotureUretrale: 28,
        longueurFonctionnelle: 20,
        pressionTransmission: 50,
        profilDynamique: 'altere' as const
      },
      emg: {
        activiteBasale: 'diminuee' as const,
        recrutementVolontaire: 'altere' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'augmentee' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 28,
        indexObstruction: -8,
        indexContractilite: 100,
        resistanceUretrale: 0.6,
        conductanceUretrale: 20
      },
      testsProvocation: {
        testToux: 'positif_faible' as const,
        testValsalva: 'positif_faible' as const,
        testStressUretral: 25,
        pressionFuiteAbdominale: 40
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 15,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitesseRapide: {
          compliance: 8,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        },
        vitessePhysiologique: {
          compliance: 12,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        }
      },
      residuPostMictionnel: 35
    }
  },
  {
    id: 6,
    titre: 'Rétention chronique avec trop-plein',
    description: 'Homme de 78 ans, diabétique avec rétention et incontinence paradoxale',
    donnee: {
      age: 78,
      sexe: 'M' as const,
      symptomes: ['Rétention urinaire', 'Gouttes retardataires', 'Sensation de vidange incomplète', 'Jet faible', 'Incontinence par regorgement'],
      antecedents: ['Diabète', 'Infection urinaire récidivante'],
      traitements: ['Alpha-bloquants', 'Inhibiteurs 5-alpha réductase'],
      debitMetrie: {
        qMax: 6,
        qMoyen: 3,
        volumeVide: 120,
        tempsVidange: 60,
        formeDebitmetrie: 'en_plateau' as const,
        tempsLatence: 25,
        tempsJusquQmax: 35
      },
      cystometrie: {
        capaciteVesicale: 650,
        pressionDetrusor: 15,
        pressionAbdominale: 25,
        pressionVesicale: 40,
        compliance: 25,
        contractions: 'absentes' as const,
        sensibilite: 'diminuee' as const,
        premierBesoin: 400,
        besoinNormal: 500,
        capaciteMaximale: 650,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 88,
        longueurUretrale: 38,
        pressionClotureUretrale: 63,
        longueurFonctionnelle: 35,
        pressionTransmission: 65,
        profilDynamique: 'normal' as const
      },
      emg: {
        activiteBasale: 'diminuee' as const,
        recrutementVolontaire: 'altere' as const,
        reflexeSphincter: 'retarde' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'augmentee' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 12,
        indexObstruction: 15,
        indexContractilite: 45,
        resistanceUretrale: 3.5,
        conductanceUretrale: 6
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 28,
          contractions: 'absentes' as const,
          sensibilite: 'alteree' as const
        },
        vitesseRapide: {
          compliance: 22,
          contractions: 'absentes' as const,
          sensibilite: 'alteree' as const
        },
        vitessePhysiologique: {
          compliance: 25,
          contractions: 'absentes' as const,
          sensibilite: 'alteree' as const
        }
      },
      residuPostMictionnel: 380
    }
  },
  // NOUVEAUX CAS CLINIQUES (6 cas supplémentaires dont 2 pédiatriques)
  {
    id: 7,
    titre: 'Énurésie nocturne primaire (Pédiatrique)',
    description: 'Garçon de 8 ans, énurésie nocturne résistante',
    donnee: {
      age: 8,
      sexe: 'M' as const,
      symptomes: ['Énurésie nocturne', 'Urgenturies', 'Pollakiurie diurne'],
      antecedents: [],
      traitements: [],
      debitMetrie: {
        qMax: 12,
        qMoyen: 8,
        volumeVide: 150,
        tempsVidange: 20,
        formeDebitmetrie: 'normale' as const,
        tempsLatence: 3,
        tempsJusquQmax: 8
      },
      cystometrie: {
        capaciteVesicale: 180,
        pressionDetrusor: 35,
        pressionAbdominale: 10,
        pressionVesicale: 45,
        compliance: 12,
        contractions: 'instables' as const,
        sensibilite: 'diminuee' as const,
        premierBesoin: 80,
        besoinNormal: 120,
        capaciteMaximale: 180,
        vitesseRemplissage: 30,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 45,
        longueurUretrale: 20,
        pressionClotureUretrale: 35,
        longueurFonctionnelle: 18,
        pressionTransmission: 75,
        profilDynamique: 'normal' as const
      },
      emg: {
        activiteBasale: 'normale' as const,
        recrutementVolontaire: 'normal' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 25,
        indexObstruction: 1,
        indexContractilite: 85,
        resistanceUretrale: 1.2,
        conductanceUretrale: 18
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 15,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        },
        vitesseRapide: {
          compliance: 10,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        },
        vitessePhysiologique: {
          compliance: 12,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        }
      },
      residuPostMictionnel: 10
    }
  },
  {
    id: 8,
    titre: 'Vessie hyperactive pédiatrique (Pédiatrique)',
    description: 'Fille de 12 ans, urgenturies et fuites diurnes',
    donnee: {
      age: 12,
      sexe: 'F' as const,
      symptomes: ['Urgenturies', 'Incontinence d\'urgence', 'Pollakiurie diurne'],
      antecedents: ['Infection urinaire récidivante'],
      traitements: [],
      debitMetrie: {
        qMax: 15,
        qMoyen: 10,
        volumeVide: 200,
        tempsVidange: 22,
        formeDebitmetrie: 'normale' as const,
        tempsLatence: 4,
        tempsJusquQmax: 9
      },
      cystometrie: {
        capaciteVesicale: 220,
        pressionDetrusor: 42,
        pressionAbdominale: 12,
        pressionVesicale: 54,
        compliance: 8,
        contractions: 'instables' as const,
        sensibilite: 'augmentee' as const,
        premierBesoin: 90,
        besoinNormal: 140,
        capaciteMaximale: 220,
        vitesseRemplissage: 40,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 50,
        longueurUretrale: 22,
        pressionClotureUretrale: 38,
        longueurFonctionnelle: 20,
        pressionTransmission: 80,
        profilDynamique: 'normal' as const
      },
      emg: {
        activiteBasale: 'normale' as const,
        recrutementVolontaire: 'normal' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 32,
        indexObstruction: 2,
        indexContractilite: 107,
        resistanceUretrale: 1.0,
        conductanceUretrale: 20
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 12,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        },
        vitesseRapide: {
          compliance: 6,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        },
        vitessePhysiologique: {
          compliance: 8,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        }
      },
      residuPostMictionnel: 15
    }
  },
  {
    id: 9,
    titre: 'Sténose urétrale post-traumatique',
    description: 'Homme de 35 ans, dysurie après accident',
    donnee: {
      age: 35,
      sexe: 'M' as const,
      symptomes: ['Dysurie', 'Jet faible', 'Jet dévié', 'Sensation de vidange incomplète'],
      antecedents: ['Fracture du bassin'],
      traitements: [],
      debitMetrie: {
        qMax: 5,
        qMoyen: 3,
        volumeVide: 200,
        tempsVidange: 80,
        formeDebitmetrie: 'en_plateau' as const,
        tempsLatence: 20,
        tempsJusquQmax: 40
      },
      cystometrie: {
        capaciteVesicale: 420,
        pressionDetrusor: 95,
        pressionAbdominale: 18,
        pressionVesicale: 113,
        compliance: 18,
        contractions: 'stables' as const,
        sensibilite: 'normale' as const,
        premierBesoin: 160,
        besoinNormal: 280,
        capaciteMaximale: 420,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 120,
        longueurUretrale: 30,
        pressionClotureUretrale: 102,
        longueurFonctionnelle: 15,
        pressionTransmission: 60,
        profilDynamique: 'altere' as const
      },
      emg: {
        activiteBasale: 'normale' as const,
        recrutementVolontaire: 'normal' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 85,
        indexObstruction: 75,
        indexContractilite: 110,
        resistanceUretrale: 8.5,
        conductanceUretrale: 3
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 20,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitesseRapide: {
          compliance: 16,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitessePhysiologique: {
          compliance: 18,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        }
      },
      residuPostMictionnel: 180
    }
  },
  {
    id: 10,
    titre: 'Vessie de lutte post-radiothérapie',
    description: 'Femme de 62 ans, antécédent de cancer du col',
    donnee: {
      age: 62,
      sexe: 'F' as const,
      symptomes: ['Urgenturies', 'Pollakiurie diurne', 'Nycturie', 'Douleurs pelviennes'],
      antecedents: ['Radiothérapie pelvienne'],
      traitements: ['Anticholinergiques'],
      debitMetrie: {
        qMax: 14,
        qMoyen: 9,
        volumeVide: 180,
        tempsVidange: 25,
        formeDebitmetrie: 'normale' as const,
        tempsLatence: 8,
        tempsJusquQmax: 12
      },
      cystometrie: {
        capaciteVesicale: 200,
        pressionDetrusor: 55,
        pressionAbdominale: 16,
        pressionVesicale: 71,
        compliance: 4,
        contractions: 'instables' as const,
        sensibilite: 'augmentee' as const,
        premierBesoin: 60,
        besoinNormal: 120,
        capaciteMaximale: 200,
        vitesseRemplissage: 30,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 55,
        longueurUretrale: 26,
        pressionClotureUretrale: 39,
        longueurFonctionnelle: 22,
        pressionTransmission: 70,
        profilDynamique: 'altere' as const
      },
      emg: {
        activiteBasale: 'augmentee' as const,
        recrutementVolontaire: 'altere' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'augmentee' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 45,
        indexObstruction: 17,
        indexContractilite: 115,
        resistanceUretrale: 1.8,
        conductanceUretrale: 16
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 6,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        },
        vitesseRapide: {
          compliance: 2,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        },
        vitessePhysiologique: {
          compliance: 4,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        }
      },
      residuPostMictionnel: 40
    }
  },
  {
    id: 11,
    titre: 'Insuffisance sphinctérienne intrinsèque',
    description: 'Femme de 58 ans, incontinence sévère post-chirurgie',
    donnee: {
      age: 58,
      sexe: 'F' as const,
      symptomes: ['Incontinence d\'effort', 'Incontinence coïtale'],
      antecedents: ['Chirurgie anti-incontinence', 'Hystérectomie'],
      traitements: [],
      debitMetrie: {
        qMax: 25,
        qMoyen: 18,
        volumeVide: 320,
        tempsVidange: 18,
        formeDebitmetrie: 'normale' as const,
        tempsLatence: 3,
        tempsJusquQmax: 6
      },
      cystometrie: {
        capaciteVesicale: 380,
        pressionDetrusor: 22,
        pressionAbdominale: 14,
        pressionVesicale: 36,
        compliance: 22,
        contractions: 'stables' as const,
        sensibilite: 'normale' as const,
        premierBesoin: 140,
        besoinNormal: 240,
        capaciteMaximale: 380,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 25,
        longueurUretrale: 22,
        pressionClotureUretrale: 11,
        longueurFonctionnelle: 15,
        pressionTransmission: 25,
        profilDynamique: 'altere' as const
      },
      emg: {
        activiteBasale: 'diminuee' as const,
        recrutementVolontaire: 'altere' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'augmentee' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 18,
        indexObstruction: -32,
        indexContractilite: 143,
        resistanceUretrale: 0.2,
        conductanceUretrale: 35
      },
      testsProvocation: {
        testToux: 'positif_fort' as const,
        testValsalva: 'positif_fort' as const,
        testStressUretral: 15,
        pressionFuiteAbdominale: 20
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 24,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitesseRapide: {
          compliance: 20,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitessePhysiologique: {
          compliance: 22,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        }
      },
      residuPostMictionnel: 8
    }
  },
  {
    id: 12,
    titre: 'Syndrome douloureux vésical',
    description: 'Femme de 42 ans, douleurs pelviennes et pollakiurie',
    donnee: {
      age: 42,
      sexe: 'F' as const,
      symptomes: ['Douleurs pelviennes', 'Pollakiurie diurne', 'Nycturie', 'Urgenturies', 'Douleurs pendant la miction'],
      antecedents: [],
      traitements: ['Antispasmodiques'],
      debitMetrie: {
        qMax: 20,
        qMoyen: 14,
        volumeVide: 150,
        tempsVidange: 12,
        formeDebitmetrie: 'normale' as const,
        tempsLatence: 6,
        tempsJusquQmax: 8
      },
      cystometrie: {
        capaciteVesicale: 180,
        pressionDetrusor: 35,
        pressionAbdominale: 15,
        pressionVesicale: 50,
        compliance: 8,
        contractions: 'instables' as const,
        sensibilite: 'augmentee' as const,
        premierBesoin: 50,
        besoinNormal: 100,
        capaciteMaximale: 180,
        vitesseRemplissage: 30,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 58,
        longueurUretrale: 26,
        pressionClotureUretrale: 43,
        longueurFonctionnelle: 24,
        pressionTransmission: 75,
        profilDynamique: 'normal' as const
      },
      emg: {
        activiteBasale: 'augmentee' as const,
        recrutementVolontaire: 'normal' as const,
        reflexeSphincter: 'present' as const,
        synergieDetrusorSphincter: 'normale' as const,
        fatigabilite: 'normale' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 28,
        indexObstruction: -12,
        indexContractilite: 128,
        resistanceUretrale: 0.7,
        conductanceUretrale: 22
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 10,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        },
        vitesseRapide: {
          compliance: 6,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        },
        vitessePhysiologique: {
          compliance: 8,
          contractions: 'presentes' as const,
          sensibilite: 'alteree' as const
        }
      },
      residuPostMictionnel: 20
    }
  }
];

// Fonction de calcul des paramètres automatiques
export function calculerParametres(donnee: PatientData): PatientData {
  const parametresCalcules = {
    // Index d'obstruction BOO (Bladder Outlet Obstruction)
    indexObstructionBOO: donnee.etudePressionDebit.pressionDetrusorQmax - 2 * donnee.debitMetrie.qMax,
    
    // Index de contractilité BCI (Bladder Contractility Index)
    indexContractiliteBCI: donnee.etudePressionDebit.pressionDetrusorQmax + 5 * donnee.debitMetrie.qMax,
    
    // Efficacité de vidange
    efficaciteVidange: (donnee.debitMetrie.volumeVide / (donnee.debitMetrie.volumeVide + donnee.residuPostMictionnel)) * 100,
    
    // Ratio Qmax/Volume
    ratioQmaxVolume: donnee.debitMetrie.qMax / donnee.debitMetrie.volumeVide * 1000,
    
    // Compliance corrigée
    complianceCorrigee: donnee.cystometrie.capaciteVesicale / (donnee.cystometrie.pressionVesicale - donnee.cystometrie.pressionAbdominale)
  };

  return {
    ...donnee,
    parametresCalcules
  };
}

// Logique diagnostique complète et avancée
export function analyserUrodynamique(donnee: PatientData): DiagnosticResult {
  // Calculer les paramètres automatiquement
  const donneeComplete = calculerParametres(donnee);
  const resultats: DiagnosticResult[] = [];
  
  // Analyse de l'obstruction sous-vésicale (avec nomogrammes)
  if (donneeComplete.parametresCalcules!.indexObstructionBOO > 40 || 
      (donnee.debitMetrie.qMax < 10 && donnee.etudePressionDebit.pressionDetrusorQmax > 40)) {
    
    let severite = 'modérée';
    if (donneeComplete.parametresCalcules!.indexObstructionBOO > 60) severite = 'sévère';
    else if (donneeComplete.parametresCalcules!.indexObstructionBOO < 20) severite = 'légère';
    
    resultats.push({
      diagnostic: `Obstruction sous-vésicale ${severite}`,
      confidence: 0.92,
      recommandations: [
        'Confirmer l\'obstruction par nomogramme de Schafer',
        'Rechercher la cause de l\'obstruction (prostate, sténose)',
        'Évaluer le retentissement sur le haut appareil',
        'Mesurer l\'index de contractilité détrusorienne'
      ],
      examensComplementaires: [
        'Échographie prostatique transrectale',
        'Urographie ou uro-scanner',
        'Cystoscopie avec mesure urétrale',
        'Bilan de la fonction rénale'
      ],
      traitements: [
        'Traitement médical par alpha-bloquants ± inhibiteurs 5-alpha réductase',
        'Résection endoscopique de prostate si échec médical',
        'Surveillance du résidu post-mictionnel',
        'Cathétérisme intermittent si rétention'
      ],
      surveillance: [
        'Débitométrie de contrôle à 3 mois',
        'Surveillance de la fonction rénale semestrielle',
        'Évaluation des symptômes par questionnaires validés',
        'Mesure du résidu post-mictionnel'
      ],
      pieges: [
        'Ne pas confondre avec une hypocontractilité détrusorienne',
        'Attention aux obstructions cervico-urétrales chez la femme',
        'Éliminer une dyssynergie vésico-sphinctérienne'
      ],
      nomogrammes: {
        schafer: donneeComplete.parametresCalcules!.indexObstructionBOO > 40 ? 'Obstruction confirmée' : 'Obstruction douteuse',
        abramsGriffiths: donnee.etudePressionDebit.pressionDetrusorQmax > 50 ? 'Obstruction probable' : 'Normal'
      },
      alertesCritiques: donnee.residuPostMictionnel > 300 ? ['Rétention importante - Risque rénal'] : [],
      indexCalcules: {
        'BOO Index': donneeComplete.parametresCalcules!.indexObstructionBOO,
        'BCI Index': donneeComplete.parametresCalcules!.indexContractiliteBCI
      },
      explications: {
        recommandations: [
          'Le nomogramme de Schafer permet de différencier obstruction vraie et hypocontractilité',
          'L\'identification de la cause guide le traitement spécifique',
          'L\'évaluation du haut appareil détecte les complications rénales',
          'L\'index BCI évalue la réserve contractile du détrusor'
        ],
        examensComplementaires: [
          'Mesure du volume prostatique et recherche de nodules',
          'Détection d\'une dilatation des voies urinaires',
          'Visualisation directe de l\'urètre et recherche de sténose',
          'Créatinine et clairance pour évaluer la fonction rénale'
        ],
        traitements: [
          'Les alpha-bloquants relaxent le col vésical et l\'urètre prostatique',
          'La résection enlève le tissu prostatique obstructif',
          'Le suivi du RPM évalue l\'efficacité du traitement',
          'Les sondages évitent la rétention et protègent les reins'
        ],
        surveillance: [
          'Objectiver l\'amélioration du débit urinaire',
          'Dépister précocement une insuffisance rénale',
          'Évaluer l\'impact sur la qualité de vie',
          'Surveiller l\'efficacité de la vidange vésicale'
        ],
        pieges: [
          'Une vessie hypocontractile peut mimer une obstruction',
          'Les femmes peuvent avoir des obstructions cervico-urétrales',
          'La dyssynergie nécessite un traitement spécifique différent'
        ]
      }
    });
  }
  
  // Analyse de l'hyperactivité vésicale (avec EMG)
  if (donnee.cystometrie.contractions === 'instables' || 
      (donnee.symptomes.includes('Urgenturies') && donnee.symptomes.includes('Pollakiurie diurne'))) {
    
    let origine = 'idiopathique';
    if (donnee.antecedents.some(ant => ant.includes('neurologique') || ant.includes('Sclérose') || ant.includes('Parkinson'))) {
      origine = 'neurologique';
    }
    
    resultats.push({
      diagnostic: `Hyperactivité vésicale ${origine}`,
      confidence: origine === 'neurologique' ? 0.90 : 0.85,
      recommandations: [
        'Confirmer par cystométrie avec contractions non inhibées',
        'Évaluer la compliance vésicale',
        'Rechercher une dyssynergie vésico-sphinctérienne par EMG',
        'Quantifier l\'impact sur la qualité de vie'
      ],
      examensComplementaires: [
        origine === 'neurologique' ? 'IRM médullaire complète' : 'Bilan infectieux urinaire',
        'Électromyographie du sphincter externe',
        'Échographie post-mictionnelle',
        'Urodynamique vidéo si dyssynergie suspectée'
      ],
      traitements: [
        'Rééducation vésico-sphinctérienne',
        'Anticholinergiques ou bêta-3 agonistes',
        'Toxine botulique intra-détrusorienne si résistance',
        'Neuromodulation sacrée en dernier recours',
        'Auto-sondages si dyssynergie associée'
      ],
      surveillance: [
        'Calendrier mictionnel mensuel',
        'Évaluation des effets secondaires des traitements',
        'Urodynamique de contrôle après toxine botulique',
        'Surveillance de la fonction rénale si neurologique'
      ],
      pieges: [
        'Éliminer une infection urinaire chronique',
        'Ne pas méconnaître une vessie de lutte',
        'Attention à la dyssynergie vésico-sphinctérienne masquée'
      ],
      nomogrammes: {},
      alertesCritiques: donnee.cystometrie.compliance < 10 ? ['Compliance très diminuée - Risque rénal'] : [],
      indexCalcules: {
        'Compliance': donnee.cystometrie.compliance,
        'Pression détrusor max': donnee.cystometrie.pressionDetrusor
      },
      explications: {
        recommandations: [
          'Les contractions non inhibées définissent l\'hyperactivité détrusorienne',
          'Une compliance basse augmente le risque de complications rénales',
          'La dyssynergie complique le traitement et nécessite des sondages',
          'L\'évaluation de la qualité de vie guide l\'intensité du traitement'
        ],
        examensComplementaires: [
          'L\'IRM recherche des lésions médullaires causales',
          'L\'EMG détecte une dyssynergie vésico-sphinctérienne',
          'L\'échographie mesure le résidu post-mictionnel',
          'La vidéo-urodynamique visualise la dyssynergie'
        ],
        traitements: [
          'La rééducation améliore le contrôle volontaire',
          'Les anticholinergiques réduisent les contractions involontaires',
          'La toxine botulique paralyse temporairement le détrusor',
          'La neuromodulation module les réflexes vésicaux',
          'Les sondages évitent la rétention en cas de dyssynergie'
        ],
        surveillance: [
          'Le calendrier objective l\'amélioration des symptômes',
          'Surveillance de la sécheresse buccale, constipation',
          'Contrôle de l\'efficacité et de la durée d\'action',
          'Prévention de l\'insuffisance rénale'
        ],
        pieges: [
          'Une infection peut mimer une hyperactivité',
          'Une vessie de lutte a une cause obstructive à traiter',
          'La dyssynergie peut être masquée par l\'hyperactivité'
        ]
      }
    });
  }
  
  // Analyse de l'incontinence urinaire d'effort (avec tests de provocation)
  if (donnee.symptomes.includes('Incontinence d\'effort') || 
      donnee.testsProvocation.testToux !== 'negatif') {
    
    let severite = 'modérée';
    if (donnee.profilPression.pressionClotureUretrale < 20) severite = 'sévère';
    else if (donnee.profilPression.pressionClotureUretrale > 40) severite = 'légère';
    
    resultats.push({
      diagnostic: `Incontinence urinaire d'effort ${severite}`,
      confidence: 0.88,
      recommandations: [
        'Quantifier les fuites par pad-test de 24h',
        'Évaluer le degré d\'insuffisance sphinctérienne',
        'Rechercher un prolapsus génital associé',
        'Tester la transmission des pressions abdominales'
      ],
      examensComplementaires: [
        'Échographie périnéale dynamique',
        'Cystographie mictionnelle',
        'Évaluation du prolapsus (classification POP-Q)',
        'IRM pelvienne si anatomie complexe'
      ],
      traitements: [
        'Rééducation périnéale en première intention (3 mois)',
        'Bandelettes sous-urétrales si échec rééducation',
        'Sphincter artificiel si insuffisance sphinctérienne sévère',
        'Injections péri-urétrales si contre-indication chirurgicale'
      ],
      surveillance: [
        'Pad-test de contrôle à 3 et 6 mois',
        'Évaluation de la satisfaction par questionnaires',
        'Dépistage des complications post-chirurgicales',
        'Urodynamique de contrôle si récidive'
      ],
      pieges: [
        'Ne pas opérer en cas d\'hyperactivité vésicale associée non traitée',
        'Attention aux obstructions iatrogènes post-bandelettes',
        'Éliminer une incontinence mixte méconnue'
      ],
      nomogrammes: {},
      alertesCritiques: donnee.testsProvocation.pressionFuiteAbdominale < 30 ? ['Insuffisance sphinctérienne sévère'] : [],
      indexCalcules: {
        'Pression clôture urétrale': donnee.profilPression.pressionClotureUretrale,
        'Pression fuite abdominale': donnee.testsProvocation.pressionFuiteAbdominale
      },
      explications: {
        recommandations: [
          'Le pad-test quantifie objectivement les pertes urinaires',
          'La pression de clôture urétrale évalue la sévérité',
          'Le prolapsus peut aggraver l\'incontinence',
          'La transmission évalue la qualité du support urétral'
        ],
        examensComplementaires: [
          'Visualise la mobilité urétrale et cervicale',
          'Recherche un reflux vésico-urétéral',
          'Quantifie le degré de prolapsus',
          'Analyse fine de l\'anatomie pelvienne'
        ],
        traitements: [
          'Renforce les muscles du plancher pelvien',
          'Soutient l\'urètre moyen lors des efforts',
          'Remplace la fonction sphinctérienne défaillante',
          'Augmente la résistance urétrale par comblement'
        ],
        surveillance: [
          'Mesure objective de l\'amélioration',
          'Évalue l\'impact sur la qualité de vie',
          'Détecte érosion, infection, obstruction',
          'Confirme la persistance de l\'efficacité'
        ],
        pieges: [
          'L\'hyperactivité peut persister après chirurgie',
          'Les bandelettes peuvent créer une obstruction',
          'La composante d\'urgence peut être sous-estimée'
        ]
      }
    });
  }
  
  // Analyse de la dyssynergie vésico-sphinctérienne (EMG)
  if (donnee.emg.synergieDetrusorSphincter === 'dyssynergie') {
    resultats.push({
      diagnostic: 'Dyssynergie vésico-sphinctérienne',
      confidence: 0.95,
      recommandations: [
        'Confirmer par urodynamique vidéo',
        'Rechercher la cause neurologique',
        'Évaluer le retentissement sur le haut appareil',
        'Mesurer la pression détrusorienne maximale'
      ],
      examensComplementaires: [
        'IRM médullaire complète',
        'Urographie ou uro-scanner',
        'Cystoscopie',
        'Bilan neurologique spécialisé'
      ],
      traitements: [
        'Auto-sondages intermittents',
        'Alpha-bloquants',
        'Toxine botulique dans le sphincter externe',
        'Sphinctérotomie en dernier recours'
      ],
      surveillance: [
        'Surveillance de la fonction rénale trimestrielle',
        'Échographie rénale semestrielle',
        'Urodynamique de contrôle annuelle',
        'Prévention des infections urinaires'
      ],
      pieges: [
        'Ne pas retarder le traitement - Risque rénal majeur',
        'Attention à la pseudodyssynergie (apprentissage)',
        'Éliminer une obstruction anatomique associée'
      ],
      nomogrammes: {},
      alertesCritiques: ['Risque de détérioration rénale - Surveillance rapprochée nécessaire'],
      indexCalcules: {
        'Pression détrusor max': donnee.cystometrie.pressionDetrusor,
        'Résidu post-mictionnel': donnee.residuPostMictionnel
      },
      explications: {
        recommandations: [
          'La vidéo-urodynamique visualise la dyssynergie',
          'Identifier la cause guide le pronostic',
          'Les hautes pressions menacent la fonction rénale',
          'La pression élevée confirme la dyssynergie'
        ],
        examensComplementaires: [
          'Recherche de lésions médullaires causales',
          'Détecte une dilatation des voies urinaires',
          'Élimine une obstruction anatomique associée',
          'Bilan étiologique complet'
        ],
        traitements: [
          'Évitent la rétention et protègent les reins',
          'Relaxent le col vésical',
          'Paralysent temporairement le sphincter externe',
          'Section du sphincter externe (irréversible)'
        ],
        surveillance: [
          'Dépistage précoce de l\'insuffisance rénale',
          'Surveillance de la dilatation pyélocalicielle',
          'Contrôle de l\'efficacité du traitement',
          'Prévention des pyélonéphrites'
        ],
        pieges: [
          'La dyssynergie peut rapidement altérer la fonction rénale',
          'La pseudodyssynergie se corrige par apprentissage',
          'Une sténose peut coexister avec la dyssynergie'
        ]
      }
    });
  }
  
  // Analyse de l'hypocontractilité détrusorienne
  if (donneeComplete.parametresCalcules!.indexContractiliteBCI < 100 || 
      (donnee.cystometrie.pressionDetrusor < 20 && donnee.debitMetrie.qMax < 12)) {
    
    let severite = 'modérée';
    if (donneeComplete.parametresCalcules!.indexContractiliteBCI < 50) severite = 'sévère';
    
    resultats.push({
      diagnostic: `Hypocontractilité détrusorienne ${severite}`,
      confidence: 0.83,
      recommandations: [
        'Rechercher une cause neurologique ou médicamenteuse',
        'Évaluer le retentissement sur la vidange',
        'Éliminer une obstruction associée',
        'Mesurer l\'efficacité de vidange'
      ],
      examensComplementaires: [
        'Bilan neurologique complet',
        'Électromyographie périnéale',
        'IRM médullaire si contexte évocateur',
        'Révision des traitements en cours'
      ],
      traitements: [
        'Rééducation vésicale et auto-sondages',
        'Traitement de la cause si identifiée',
        'Sondage intermittent si résidu > 150ml',
        'Stimulation électrique vésicale (expérimental)'
      ],
      surveillance: [
        'Surveillance du résidu post-mictionnel hebdomadaire',
        'Prévention des infections urinaires',
        'Surveillance de la fonction rénale mensuelle',
        'Évaluation de l\'autonomie du patient'
      ],
      pieges: [
        'Ne pas confondre avec une obstruction',
        'Attention à la décompensation vésicale chronique',
        'Éliminer les causes iatrogènes'
      ],
      nomogrammes: {},
      alertesCritiques: donneeComplete.parametresCalcules!.efficaciteVidange < 50 ? ['Efficacité de vidange très diminuée'] : [],
      indexCalcules: {
        'BCI Index': donneeComplete.parametresCalcules!.indexContractiliteBCI,
        'Efficacité vidange (%)': donneeComplete.parametresCalcules!.efficaciteVidange
      },
      explications: {
        recommandations: [
          'Diabète, médicaments, lésions neurologiques',
          'Mesurer le résidu post-mictionnel',
          'Éliminer une cause obstructive traitable',
          'Calculer le pourcentage de vidange'
        ],
        examensComplementaires: [
          'Recherche de neuropathie périphérique',
          'Évalue l\'innervation du plancher pelvien',
          'Recherche de lésions médullaires',
          'Arrêt des médicaments anticholinergiques'
        ],
        traitements: [
          'Apprentissage de la vidange assistée',
          'Traitement étiologique si possible',
          'Évite la rétention et les infections',
          'Stimulation électrique du détrusor'
        ],
        surveillance: [
          'Contrôle de l\'efficacité de la vidange',
          'Prévention des infections sur résidu',
          'Dépistage de l\'insuffisance rénale',
          'Maintien de l\'indépendance fonctionnelle'
        ],
        pieges: [
          'Une obstruction peut coexister',
          'La décompensation peut être irréversible',
          'Médicaments anticholinergiques, opiacés'
        ]
      }
    });
  }
  
  // Analyse de l'incontinence mixte
  if (donnee.symptomes.includes('Incontinence mixte') || 
      (donnee.symptomes.includes('Incontinence d\'effort') && donnee.symptomes.includes('Urgenturies'))) {
    resultats.push({
      diagnostic: 'Incontinence urinaire mixte',
      confidence: 0.82,
      recommandations: [
        'Identifier la composante prédominante par questionnaires',
        'Traiter en priorité le symptôme le plus gênant',
        'Évaluation urodynamique complète indispensable',
        'Quantifier chaque composante séparément'
      ],
      examensComplementaires: [
        'Pad-test avec épreuve d\'effort spécifique',
        'Calendrier mictionnel détaillé sur 7 jours',
        'Échographie périnéale dynamique',
        'Questionnaires de qualité de vie validés'
      ],
      traitements: [
        'Rééducation périnéale globale en première intention',
        'Traitement médical de l\'hyperactivité si prédominante',
        'Chirurgie anti-incontinence après stabilisation vésicale',
        'Approche séquentielle selon la composante dominante'
      ],
      surveillance: [
        'Réévaluation après chaque étape thérapeutique',
        'Surveillance des effets secondaires des anticholinergiques',
        'Adaptation du traitement selon l\'évolution clinique',
        'Questionnaires de satisfaction réguliers'
      ],
      pieges: [
        'Ne jamais opérer l\'incontinence d\'effort sans traiter l\'hyperactivité',
        'Risquer l\'aggravation d\'une composante en traitant l\'autre',
        'Sous-estimer la complexité du traitement'
      ],
      nomogrammes: {},
      alertesCritiques: [],
      indexCalcules: {
        'Pression clôture': donnee.profilPression.pressionClotureUretrale,
        'Contractions détrusor': donnee.cystometrie.contractions === 'instables' ? 1 : 0
      },
      explications: {
        recommandations: [
          'Questionnaires UDI-6, IIQ-7 pour hiérarchiser',
          'Traitement de la gêne principale en premier',
          'Analyse complète des deux composantes',
          'Pad-test et calendrier mictionnel'
        ],
        examensComplementaires: [
          'Quantification des fuites d\'effort',
          'Analyse de la fréquence et des urgenturies',
          'Évaluation de la mobilité urétrale',
          'Impact sur la qualité de vie'
        ],
        traitements: [
          'Renforcement musculaire et contrôle vésical',
          'Anticholinergiques pour l\'hyperactivité',
          'Chirurgie après stabilisation de la vessie',
          'Adaptation selon la réponse thérapeutique'
        ],
        surveillance: [
          'Évaluation de chaque composante séparément',
          'Sécheresse buccale, constipation',
          'Modification des symptômes après traitement',
          'Satisfaction globale du traitement'
        ],
        pieges: [
          'L\'hyperactivité peut s\'aggraver après chirurgie',
          'Le traitement d\'une composante peut révéler l\'autre',
          'Nécessite une approche multimodale'
        ]
      }
    });
  }
  
  // Cas pédiatriques spécifiques
  if (donnee.age < 16) {
    if (donnee.symptomes.includes('Énurésie nocturne')) {
      resultats.push({
        diagnostic: 'Énurésie nocturne primaire',
        confidence: 0.88,
        recommandations: [
          'Évaluer la capacité vésicale fonctionnelle',
          'Rechercher une hyperactivité détrusorienne',
          'Éliminer une cause organique',
          'Évaluer le contexte psycho-social'
        ],
        examensComplementaires: [
          'Échographie rénale et vésicale',
          'ECBU et uroculture',
          'Calendrier mictionnel pédiatrique',
          'Bilan psychologique si nécessaire'
        ],
        traitements: [
          'Mesures comportementales et hygiéno-diététiques',
          'Alarme nocturne (première intention)',
          'Desmopressine si échec de l\'alarme',
          'Anticholinergiques si hyperactivité associée'
        ],
        surveillance: [
          'Évaluation mensuelle de la réponse',
          'Surveillance de la croissance',
          'Adaptation du traitement selon l\'âge',
          'Soutien psychologique de l\'enfant et famille'
        ],
        pieges: [
          'Ne pas débuter le traitement avant 6 ans',
          'Éliminer une constipation associée',
          'Attention aux troubles psychologiques secondaires'
        ],
        nomogrammes: {},
        alertesCritiques: [],
        indexCalcules: {
          'Capacité vésicale': donnee.cystometrie.capaciteVesicale,
          'Âge': donnee.age
        },
        explications: {
          recommandations: [
            'Capacité attendue = (âge + 1) × 30 ml',
            'Contractions non inhibées fréquentes',
            'Éliminer malformations, infections',
            'Impact sur l\'estime de soi'
          ],
          examensComplementaires: [
            'Dépistage de malformations',
            'Élimination d\'une infection',
            'Évaluation des habitudes mictionnelles',
            'Retentissement psychologique'
          ],
          traitements: [
            'Restriction hydrique vespérale, mictions programmées',
            'Conditionnement par réveil au début de miction',
            'Hormone antidiurétique de synthèse',
            'Réduction des contractions vésicales'
          ],
          surveillance: [
            'Nombre de nuits sèches par semaine',
            'Courbe de croissance normale',
            'Adaptation posologique selon maturation',
            'Prévention de l\'isolement social'
          ],
          pieges: [
            'Maturation vésicale incomplète avant 6 ans',
            'La constipation aggrave l\'énurésie',
            'Éviter la culpabilisation de l\'enfant'
          ]
        }
      });
    }
  }
  
  // Si aucun diagnostic spécifique, analyser les valeurs normales
  if (resultats.length === 0) {
    resultats.push({
      diagnostic: 'Examen urodynamique dans les limites de la normale',
      confidence: 0.7,
      recommandations: [
        'Corréler avec la symptomatologie clinique',
        'Envisager des explorations complémentaires selon les symptômes',
        'Réévaluer si aggravation clinique',
        'Considérer les dysfonctions intermittentes'
      ],
      examensComplementaires: [
        'Calendrier mictionnel prolongé (7 jours)',
        'Pad-test si incontinence rapportée',
        'Urétrocystoscopie selon le contexte clinique',
        'Échographie rénale et vésicale'
      ],
      traitements: [
        'Mesures hygiéno-diététiques',
        'Rééducation comportementale',
        'Surveillance clinique',
        'Traitement symptomatique si nécessaire'
      ],
      surveillance: [
        'Réévaluation clinique à 6 mois',
        'Nouvel examen urodynamique si aggravation',
        'Questionnaires de qualité de vie',
        'Suivi selon l\'évolution des symptômes'
      ],
      pieges: [
        'Ne pas rassurer à tort si symptômes invalidants',
        'Penser aux dysfonctions intermittentes',
        'Considérer les facteurs psychologiques'
      ],
      nomogrammes: {},
      alertesCritiques: [],
      indexCalcules: {},
      explications: {
        recommandations: [
          'Les symptômes peuvent exister malgré un bilan normal',
          'Autres examens selon la clinique',
          'Surveillance de l\'évolution',
          'Dysfonctions non permanentes'
        ],
        examensComplementaires: [
          'Analyse détaillée des habitudes',
          'Quantification objective des fuites',
          'Exploration endoscopique',
          'Bilan morphologique'
        ],
        traitements: [
          'Modification des habitudes de vie',
          'Techniques de contrôle vésical',
          'Suivi régulier sans traitement',
          'Traitement selon les symptômes'
        ],
        surveillance: [
          'Évolution de la symptomatologie',
          'Répéter si aggravation',
          'Impact sur la vie quotidienne',
          'Adaptation selon l\'évolution'
        ],
        pieges: [
          'Symptômes réels malgré bilan normal',
          'Dysfonctions par intermittence',
          'Composante psychosomatique possible'
        ]
      }
    });
  }
  
  // Retourner le diagnostic avec la plus haute confidence
  return resultats.reduce((prev, current) => 
    prev.confidence > current.confidence ? prev : current
  );
}

// Valeurs de référence étendues pour l'aide à l'interprétation
export const VALEURS_REFERENCE = {
  debitMetrie: {
    qMaxHomme: { normal: '>15', limite: '10-15', anormal: '<10' },
    qMaxFemme: { normal: '>20', limite: '15-20', anormal: '<15' },
    qMoyen: { normal: '>10', limite: '5-10', anormal: '<5' },
    tempsLatence: { normal: '<10', prolonge: '>15' }
  },
  cystometrie: {
    capacite: { normal: '300-500', augmentee: '>500', diminuee: '<300' },
    compliance: { normale: '>20', diminuee: '10-20', severe: '<10' },
    pressionDetrusor: { normale: '<40', elevee: '>40' },
    premierBesoin: { normal: '150-250', precoce: '<150', retarde: '>300' }
  },
  profilPression: {
    pressionClotureUretrale: { 
      normale: '>30', 
      insuffisance: '20-30',
      insuffisanceSevere: '<20'
    },
    longueurFonctionnelle: {
      normale: '>20',
      diminuee: '<20'
    }
  },
  residuPostMictionnel: {
    normal: '<50',
    limite: '50-100',
    pathologique: '>100',
    severe: '>200'
  },
  emg: {
    activiteBasale: 'Activité tonique continue normale',
    recrutement: 'Recrutement progressif et complet',
    synergie: 'Relaxation sphinctér ienne pendant la miction'
  },
  indexCalcules: {
    BOO: { normal: '<20', douteux: '20-40', obstruction: '>40' },
    BCI: { faible: '<100', normal: '100-150', fort: '>150' }
  }
};

// Glossaire des termes urodynamiques
export const GLOSSAIRE = {
  'Qmax': {
    definition: 'Débit urinaire maximal mesuré pendant la miction',
    unite: 'ml/s',
    obtention: 'Débitmétrie libre - Patient urine dans un débitmètre',
    valeursNormales: 'Homme: >15 ml/s, Femme: >20 ml/s',
    interpretation: 'Reflète la perméabilité urétrale et la force de contraction détrusorienne'
  },
  'Compliance': {
    definition: 'Capacité de la vessie à se distendre sans augmentation de pression',
    unite: 'ml/cmH2O',
    obtention: 'Cystométrie - Rapport volume/pression pendant le remplissage',
    valeursNormales: '>20 ml/cmH2O',
    interpretation: 'Compliance diminuée = vessie rigide, risque pour le haut appareil'
  },
  'Pression de clôture urétrale': {
    definition: 'Différence entre pression urétrale maximale et pression vésicale',
    unite: 'cmH2O',
    obtention: 'Profil de pression urétrale - Cathéter à pression',
    valeursNormales: '>30 cmH2O',
    interpretation: 'Reflète la compétence du mécanisme de continence'
  },
  'BOO Index': {
    definition: 'Index d\'obstruction sous-vésicale de Schafer',
    unite: 'Sans unité',
    obtention: 'Calcul: Pdet Qmax - 2 × Qmax',
    valeursNormales: '<20: normal, 20-40: douteux, >40: obstruction',
    interpretation: 'Quantifie le degré d\'obstruction sous-vésicale'
  },
  'BCI Index': {
    definition: 'Index de contractilité vésicale',
    unite: 'Sans unité',
    obtention: 'Calcul: Pdet Qmax + 5 × Qmax',
    valeursNormales: '>100: contractilité normale',
    interpretation: 'Évalue la force de contraction du détrusor'
  }
};