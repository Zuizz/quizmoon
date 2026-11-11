// Biochemistry quiz questions
// correctIndex is 0-based (0=A, 1=B, 2=C, 3=D)
export const questions = [
  {
    id: 1,
    question: 'What determines the primary structure of a protein?',
    options: [
      'Disulfide bonds',
      'Hydrogen bonds',
      'Amino acid sequence',
      'Protein aggregation',
    ],
    correctIndex: 2, // C
  },
  {
    id: 2,
    question: 'What is protein misfolding?',
    options: [
      'Protein achieving its normal shape',
      'Protein synthesis at ribosomes',
      'Protein acquiring an abnormal three-dimensional shape',
      'Protein digestion in the stomach',
    ],
    correctIndex: 2, // C
  },
  {
    id: 3,
    question: 'Which molecules help newly synthesized proteins fold correctly?',
    options: [
      'Hemoglobin',
      'Digestive enzymes',
      'Antibodies',
      'Molecular chaperones',
    ],
    correctIndex: 3, // D
  },
  {
    id: 4,
    question: 'Which disease is strongly associated with amyloid-beta accumulation in the brain?',
    options: [
      'Sickle cell disease',
      "Alzheimer's disease",
      'Hemophilia',
      "Parkinson's disease",
    ],
    correctIndex: 1, // B
  },
  {
    id: 5,
    question: 'Amyloid-beta is produced from which precursor protein?',
    options: [
      'Hemoglobin',
      'Collagen',
      'Amyloid precursor protein (APP)',
      'Albumin',
    ],
    correctIndex: 2, // C
  },
  {
    id: 6,
    question: "Where are amyloid plaques mainly found in Alzheimer's disease?",
    options: [
      'Inside mitochondria',
      'Outside neurons',
      'Inside the nucleus',
      'Inside red blood cells',
    ],
    correctIndex: 1, // B
  },
  {
    id: 7,
    question: "Which protein forms neurofibrillary tangles in Alzheimer's disease?",
    options: [
      'Tau protein',
      'Hemoglobin',
      'Albumin',
      'Insulin',
    ],
    correctIndex: 0, // A
  },
  {
    id: 8,
    question: 'Amyloid-beta oligomers can interfere with communication between neurons.',
    options: [
      'True',
      'False',
      'Only in liver cells',
      'None of the above',
    ],
    correctIndex: 0, // A (True)
  },
  {
    id: 9,
    question: 'What happens when tau protein becomes abnormally hyperphosphorylated?',
    options: [
      'It converts into amyloid-beta',
      'It increases oxygen transport',
      'It binds more strongly to microtubules',
      'It detaches from microtubules and may aggregate',
    ],
    correctIndex: 3, // D
  },
  {
    id: 10,
    question: "Which of the following best explains memory loss in Alzheimer's disease?",
    options: [
      'Increased muscle contraction',
      'Increased bone formation',
      'Increased red blood cell production',
      'Damage to neurons and synaptic connections',
    ],
    correctIndex: 3, // D
  },
];
