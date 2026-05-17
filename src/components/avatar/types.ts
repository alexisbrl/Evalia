export type AvatarConfig = {
  faceShape: number;   // 0-3
  skinColor: number;   // 0-2
  hairStyle: number;   // 0-4  (0,1,2 = styles longs/médiums, 3,4 = styles courts)
  hairColor: number;   // 0-3
  eyeShape: number;    // 0-2
  mouthShape: number;  // 0-2
};

export const DEFAULT_AVATAR: AvatarConfig = {
  faceShape: 0,
  skinColor: 0,
  hairStyle: 0,
  hairColor: 0,
  eyeShape: 0,
  mouthShape: 0,
};

export const SKIN_COLORS = [
  { label: 'Clair', value: '#FFDAB9' },
  { label: 'Moyen', value: '#C8956C' },
  { label: 'Foncé', value: '#7B4F3A' },
];

export const HAIR_COLORS = [
  { label: 'Brun foncé', value: '#3D2314' },
  { label: 'Blond',      value: '#C8A96E' },
  { label: 'Noir',       value: '#1A1A1A' },
  { label: 'Roux',       value: '#C05A2A' },
];

export const FACE_SHAPE_LABELS = ['Oval', 'Rond', 'Carré', 'Cœur'];
export const HAIR_STYLE_LABELS = [
  'Long lisse',    // 0 — style féminin
  'Long bouclé',   // 1 — style féminin
  'Court mi-long', // 2 — style féminin
  'Court net',     // 3 — style masculin
  'Court texturé', // 4 — style masculin
];
export const EYE_SHAPE_LABELS  = ['Amande', 'Rond', 'Fin'];
export const MOUTH_SHAPE_LABELS = ['Sourire', 'Neutre', 'Grand sourire'];

export const PROFESSIONS_FR = [
  'Étudiant(e)',
  'Enseignant(e) / Formateur/trice',
  'Ingénieur(e) / Technicien(ne)',
  'Manager / Cadre',
  'Commercial(e)',
  'Médecin / Professionnel(le) de santé',
  'Juriste / Avocat(e)',
  'Entrepreneur(e) / Indépendant(e)',
  'Artisan(e)',
  'Agriculteur/trice',
  'Artiste / Créatif/ve',
  'Fonctionnaire',
  'Chercheur/euse',
  'RH / Formation',
  'Finance / Comptabilité',
  'Marketing / Communication',
  'IT / Développeur/euse',
  'Retraité(e)',
  "En recherche d'emploi",
  'Autre',
];

export const PROFESSIONS_EN = [
  'Student',
  'Teacher / Trainer',
  'Engineer / Technician',
  'Manager / Executive',
  'Sales',
  'Healthcare Professional',
  'Legal / Lawyer',
  'Entrepreneur / Freelancer',
  'Craftsperson',
  'Farmer',
  'Artist / Creative',
  'Civil Servant',
  'Researcher',
  'HR / Training',
  'Finance / Accounting',
  'Marketing / Communications',
  'IT / Developer',
  'Retired',
  'Job seeker',
  'Other',
];
