// Types de base
export interface PatientData {
  age: number;
  sexe: 'M' | 'F';
  symptomes: string[];
  antecedents: string[];
  traitements: string[];
  debitMetrie: DebitMetrie;
  cystometrie: Cystometrie;
  profilPression: ProfilPression;
  emg: EMG;
  etudePressionDebit: EtudePressionDebit;
  testsProvocation: TestsProvocation;
  cystometrieRemplissage: CystometrieRemplissage;
  residuPostMictionnel: number;
}

export interface DebitMetrie {
  qMax: number;
  qMoyen: number;
  volumeVide: number;
  tempsVidange: number;
  formeDebitmetrie: 'normale' | 'en_plateau' | 'intermittente' | 'en_cloche';
  tempsLatence: number;
  tempsJusquQmax: number;
}

export interface Cystometrie {
  capaciteVesicale: number;
  pressionDetrusor: number;
  pressionAbdominale: number;
  pressionVesicale: number;
  compliance: number;
  contractions: 'absentes' | 'stables' | 'instables';
  sensibilite: 'normale' | 'diminuee' | 'augmentee';
  premierBesoin: number;
  besoinNormal: number;
  capaciteMaximale: number;
  vitesseRemplissage: number;
  pressionFuite: number;
}

export interface ProfilPression {
  pressionUretrale: number;
  longueurUretrale: number;
  pressionClotureUretrale: number;
  longueurFonctionnelle: number;
  pressionTransmission: number;
  profilDynamique: 'normal' | 'anormal';
}

export interface EMG {
  activiteBasale: 'normale' | 'augmentee' | 'diminuee' | 'absente';
  recrutementVolontaire: 'normal' | 'diminue' | 'absent';
  reflexeSphincter: 'present' | 'absent' | 'retarde';
  synergieDetrusorSphincter: 'normale' | 'dyssynergie' | 'pseudodyssynergie';
  fatigabilite: 'normale' | 'augmentee';
}

export interface EtudePressionDebit {
  pressionDetrusorQmax: number;
  indexObstruction: number;
  indexContractilite: number;
  resistanceUretrale: number;
  conductanceUretrale: number;
}

export interface TestsProvocation {
  testToux: 'negatif' | 'positif_faible' | 'positif_fort';
  testValsalva: 'negatif' | 'positif_faible' | 'positif_fort';
  testStressUretral: number;
  pressionFuiteAbdominale: number;
}

export interface CystometrieRemplissage {
  vitesseLente: {
    compliance: number;
    contractions: 'absentes' | 'presentes';
    sensibilite: 'normale' | 'diminuee' | 'augmentee';
  };
  vitesseRapide: {
    compliance: number;
    contractions: 'absentes' | 'presentes';
    sensibilite: 'normale' | 'diminuee' | 'augmentee';
  };
  vitessePhysiologique: {
    compliance: number;
    contractions: 'absentes' | 'presentes';
    sensibilite: 'normale' | 'diminuee' | 'augmentee';
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
  alertesCritiques: string[];
  indexCalcules: Record<string, number>;
  nomogrammes: {
    schafer?: string;
    abramsGriffiths?: string;
  };
  explications: {
    recommandations: string[];
    examensComplementaires: string[];
    traitements: string[];
    surveillance: string[];
    pieges: string[];
  };
  patientData?: PatientData;
}

// Constantes
export const SYMPTOMES = [
  'Pollakiurie diurne',
  'Nycturie',
  'Urgenturies',
  'Incontinence d\'urgence',
  'Incontinence d\'effort',
  'Incontinence mixte',
  'Dysurie',
  'Jet faible',
  'Jet intermittent',
  'Poussée abdominale',
  'Sensation de vidange incomplète',
  'Gouttes retardataires',
  'Rétention urinaire',
  'Douleurs pelviennes',
  'Brûlures mictionnelles',
  'Hématurie'
];

export const ANTECEDENTS = [
  'Diabète',
  'Hypertension artérielle',
  'Maladie neurologique',
  'AVC',
  'Sclérose en plaques',
  'Maladie de Parkinson',
  'Traumatisme médullaire',
  'Chirurgie pelvienne',
  'Chirurgie prostatique',
  'Hystérectomie',
  'Radiothérapie pelvienne',
  'Infections urinaires récidivantes',
  'Lithiase urinaire',
  'Cancer de la prostate',
  'Cancer de la vessie',
  'Prolapsus génital'
];

export const TRAITEMENTS = [
  'Alpha-bloquants',
  'Anticholinergiques',
  'Agonistes β3-adrénergiques',
  'Inhibiteurs 5α-réductase',
  'Antispasmodiques',
  'Œstrogènes locaux',
  'Toxine botulique',
  'Neuromodulation sacrée',
  'Sondage intermittent',
  'Sonde à demeure',
  'Rééducation périnéale',
  'Biofeedback'
];

// Templates d'examens prédéfinis
export const TEMPLATES_EXAMENS = {
  hyperactivite_vesicale: {
    nom: "Hyperactivité vésicale",
    description: "Patient avec urgenturies et pollakiurie",
    defaultValues: {
      symptomes: ['Urgenturies', 'Pollakiurie diurne', 'Nycturie'],
      cystometrie: {
        capaciteVesicale: 250,
        contractions: 'instables' as const,
        premierBesoin: 80,
        besoinNormal: 150
      }
    }
  },
  obstruction_prostatique: {
    nom: "Obstruction prostatique",
    description: "Homme avec dysurie et jet faible",
    defaultValues: {
      sexe: 'M' as const,
      symptomes: ['Dysurie', 'Jet faible', 'Sensation de vidange incomplète'],
      debitMetrie: {
        qMax: 8,
        formeDebitmetrie: 'en_plateau' as const
      },
      etudePressionDebit: {
        pressionDetrusorQmax: 65,
        indexObstruction: 45
      }
    }
  },
  incontinence_effort: {
    nom: "Incontinence d'effort",
    description: "Femme avec fuites à l'effort",
    defaultValues: {
      sexe: 'F' as const,
      symptomes: ['Incontinence d\'effort'],
      testsProvocation: {
        testToux: 'positif_fort' as const,
        pressionFuiteAbdominale: 45
      },
      profilPression: {
        pressionClotureUretrale: 25
      }
    }
  }
};

// Glossaire (version simplifiée - la version complète est dans glossaryData.ts)
export const GLOSSAIRE = {
  "Qmax": {
    definition: "Débit urinaire maximum atteint pendant la miction",
    unite: "ml/s",
    valeursNormales: "Homme: >15 ml/s, Femme: >15 ml/s",
    obtention: "Mesuré par débitmètre libre",
    interpretation: "Qmax <10 ml/s évoque une obstruction"
  },
  "Compliance": {
    definition: "Capacité de la vessie à se distendre",
    unite: "ml/cmH2O",
    valeursNormales: ">20 ml/cmH2O",
    obtention: "ΔVolume / ΔPression",
    interpretation: "Compliance réduite évoque fibrose vésicale"
  }
  // ... autres définitions de base
};

// Cas cliniques de démonstration
export const CAS_CLINIQUES = [
  {
    id: 1,
    titre: "Hyperactivité Vésicale Idiopathique",
    description: "Femme de 65 ans avec urgenturies et pollakiurie diurne",
    donnee: {
      age: 65,
      sexe: 'F' as const,
      symptomes: ['Urgenturies', 'Pollakiurie diurne', 'Nycturie', 'Incontinence d\'urgence'],
      antecedents: ['Hypertension artérielle'],
      traitements: [],
      debitMetrie: {
        qMax: 22,
        qMoyen: 14,
        volumeVide: 280,
        tempsVidange: 25,
        formeDebitmetrie: 'normale' as const,
        tempsLatence: 3,
        tempsJusquQmax: 8
      },
      cystometrie: {
        capaciteVesicale: 220,
        pressionDetrusor: 25,
        pressionAbdominale: 12,
        pressionVesicale: 37,
        compliance: 18,
        contractions: 'instables' as const,
        sensibilite: 'augmentee' as const,
        premierBesoin: 80,
        besoinNormal: 150,
        capaciteMaximale: 220,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 65,
        longueurUretrale: 35,
        pressionClotureUretrale: 40,
        longueurFonctionnelle: 28,
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
        pressionDetrusorQmax: 28,
        indexObstruction: -16,
        indexContractilite: 138,
        resistanceUretrale: 1.3,
        conductanceUretrale: 0.79
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
          contractions: 'presentes' as const,
          sensibilite: 'augmentee' as const
        },
        vitesseRapide: {
          compliance: 16,
          contractions: 'presentes' as const,
          sensibilite: 'augmentee' as const
        },
        vitessePhysiologique: {
          compliance: 18,
          contractions: 'presentes' as const,
          sensibilite: 'augmentee' as const
        }
      },
      residuPostMictionnel: 15
    }
  },
  {
    id: 2,
    titre: "Obstruction Prostatique Modérée",
    description: "Homme de 72 ans avec dysurie et jet faible",
    donnee: {
      age: 72,
      sexe: 'M' as const,
      symptomes: ['Dysurie', 'Jet faible', 'Sensation de vidange incomplète', 'Nycturie'],
      antecedents: ['Hypertension artérielle', 'Diabète'],
      traitements: ['Alpha-bloquants'],
      debitMetrie: {
        qMax: 9,
        qMoyen: 6,
        volumeVide: 320,
        tempsVidange: 55,
        formeDebitmetrie: 'en_plateau' as const,
        tempsLatence: 8,
        tempsJusquQmax: 25
      },
      cystometrie: {
        capaciteVesicale: 480,
        pressionDetrusor: 35,
        pressionAbdominale: 18,
        pressionVesicale: 53,
        compliance: 25,
        contractions: 'stables' as const,
        sensibilite: 'normale' as const,
        premierBesoin: 180,
        besoinNormal: 320,
        capaciteMaximale: 480,
        vitesseRemplissage: 50,
        pressionFuite: 0
      },
      profilPression: {
        pressionUretrale: 85,
        longueurUretrale: 22,
        pressionClotureUretrale: 50,
        longueurFonctionnelle: 18,
        pressionTransmission: 90,
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
        pressionDetrusorQmax: 58,
        indexObstruction: 40,
        indexContractilite: 103,
        resistanceUretrale: 6.4,
        conductanceUretrale: 0.16
      },
      testsProvocation: {
        testToux: 'negatif' as const,
        testValsalva: 'negatif' as const,
        testStressUretral: 0,
        pressionFuiteAbdominale: 0
      },
      cystometrieRemplissage: {
        vitesseLente: {
          compliance: 26,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitesseRapide: {
          compliance: 24,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        },
        vitessePhysiologique: {
          compliance: 25,
          contractions: 'absentes' as const,
          sensibilite: 'normale' as const
        }
      },
      residuPostMictionnel: 85
    }
  }
  // Ajout d'autres cas cliniques...
];

// Fonction d'analyse urodynamique (version simplifiée)
export function analyserUrodynamique(data: PatientData): DiagnosticResult {
  let diagnostic = "Fonction vésico-sphinctérienne normale";
  let confidence = 0.7;
  const recommandations: string[] = [];
  const examensComplementaires: string[] = [];
  const traitements: string[] = [];
  const surveillance: string[] = [];
  const pieges: string[] = [];
  const alertesCritiques: string[] = [];
  const indexCalcules: Record<string, number> = {};
  const nomogrammes: { schafer?: string; abramsGriffiths?: string } = {};
  
  // Calculs des index
  indexCalcules["Index d'obstruction (Abrams-Griffiths)"] = data.etudePressionDebit.pressionDetrusorQmax - (2 * data.debitMetrie.qMax);
  indexCalcules["Index de contractilité"] = data.etudePressionDebit.pressionDetrusorQmax + (5 * data.debitMetrie.qMax);
  indexCalcules["Résistance urétrale"] = data.etudePressionDebit.pressionDetrusorQmax / data.debitMetrie.qMax;
  
  // Nomogrammes
  const indexObstruction = indexCalcules["Index d'obstruction (Abrams-Griffiths)"];
  if (indexObstruction > 40) {
    nomogrammes.abramsGriffiths = "Obstruction";
  } else if (indexObstruction > 20) {
    nomogrammes.abramsGriffiths = "Équivoque";
  } else {
    nomogrammes.abramsGriffiths = "Non obstrué";
  }
  
  // Analyse des symptômes et paramètres
  if (data.symptomes.includes('Urgenturies') && data.cystometrie.contractions === 'instables') {
    diagnostic = "Hyperactivité détrusorienne";
    confidence = 0.85;
    recommandations.push("Traitement anticholinergique en première intention");
    recommandations.push("Rééducation vésico-sphinctérienne");
    traitements.push("Anticholinergiques (oxybutynine, solifénacine)");
    traitements.push("Agonistes β3 (mirabegron) si contre-indication aux anticholinergiques");
    surveillance.push("Évaluation de l'efficacité à 3 mois");
    surveillance.push("Surveillance du résidu post-mictionnel");
  }
  
  if (data.debitMetrie.qMax < 10 && indexObstruction > 40) {
    diagnostic = "Obstruction sous-vésicale";
    confidence = 0.9;
    if (data.sexe === 'M') {
      diagnostic += " (probable hypertrophie prostatique)";
      traitements.push("Alpha-bloquants en première intention");
      traitements.push("Inhibiteurs 5α-réductase si prostate >40g");
      examensComplementaires.push("Échographie prostatique");
      examensComplementaires.push("PSA");
    }
    surveillance.push("Contrôle débitmétrie à 3 mois");
    pieges.push("Ne pas confondre avec hypocontractilité détrusorienne");
  }
  
  if (data.symptomes.includes('Incontinence d\'effort') && data.testsProvocation.testToux !== 'negatif') {
    diagnostic = "Incontinence urinaire d'effort";
    confidence = 0.8;
    recommandations.push("Rééducation périnéale en première intention");
    traitements.push("Kinésithérapie périnéale");
    if (data.profilPression.pressionClotureUretrale < 30) {
      traitements.push("Chirurgie (bandelette sous-urétrale)");
      examensComplementaires.push("Bilan pré-opératoire complet");
    }
    surveillance.push("Évaluation à 6 mois de rééducation");
  }
  
  // Alertes critiques
  if (data.residuPostMictionnel > 150) {
    alertesCritiques.push("Résidu post-mictionnel élevé - Risque de rétention");
  }
  
  if (data.cystometrie.compliance < 10) {
    alertesCritiques.push("Compliance vésicale très réduite - Risque pour le haut appareil");
  }
  
  // Explications détaillées
  const explications = {
    recommandations: [
      "Les anticholinergiques bloquent les récepteurs muscariniques du détrusor, réduisant les contractions involontaires et améliorant les symptômes d'hyperactivité vésicale.",
      "La rééducation vésico-sphinctérienne permet d'améliorer le contrôle volontaire de la vessie et de réduire l'urgence mictionnelle par des techniques comportementales.",
      "La rééducation périnéale renforce les muscles du plancher pelvien, améliorant le soutien urétral et la continence à l'effort."
    ],
    examensComplementaires: [
      "L'échographie prostatique permet d'évaluer le volume prostatique et de guider le choix thérapeutique (alpha-bloquants seuls si <40g, association si >40g).",
      "Le dosage du PSA est recommandé chez l'homme >50 ans avec troubles mictionnels pour dépister un cancer prostatique.",
      "Le bilan pré-opératoire comprend cystoscopie, imagerie du haut appareil et évaluation de la fonction rénale avant chirurgie de l'incontinence."
    ],
    traitements: [
      "Les alpha-bloquants (tamsulosine, alfuzosine) relaxent le muscle lisse prostatique et du col vésical, améliorant le débit urinaire.",
      "Les inhibiteurs 5α-réductase (finastéride, dutastéride) réduisent le volume prostatique à long terme, particulièrement efficaces si prostate >40g.",
      "La kinésithérapie périnéale utilise exercices de Kegel, biofeedback et électrostimulation pour renforcer le plancher pelvien.",
      "La chirurgie par bandelette sous-urétrale est le gold standard pour l'incontinence d'effort féminine avec insuffisance sphinctérienne."
    ],
    surveillance: [
      "L'évaluation à 3 mois permet d'ajuster le traitement anticholinergique (dose, molécule) selon l'efficacité et la tolérance.",
      "La surveillance du résidu post-mictionnel détecte précocement une rétention urinaire, effet indésirable des anticholinergiques.",
      "Le contrôle débitmétrique objective l'amélioration du débit après traitement de l'obstruction prostatique.",
      "L'évaluation à 6 mois de rééducation détermine la nécessité d'un traitement chirurgical si échec conservateur."
    ],
    pieges: [
      "L'hypocontractilité détrusorienne peut mimer une obstruction (débit faible) mais avec pression détrusorienne basse. L'étude pression-débit est essentielle.",
      "Une vessie de lutte peut masquer une hyperactivité détrusorienne par augmentation de la capacité vésicale et réduction des contractions.",
      "L'incontinence mixte nécessite de traiter en priorité la composante la plus gênante, souvent l'urgence avant l'effort."
    ]
  };
  
  return {
    diagnostic,
    confidence,
    recommandations,
    examensComplementaires,
    traitements,
    surveillance,
    pieges,
    alertesCritiques,
    indexCalcules,
    nomogrammes,
    explications,
    patientData: data
  };
}