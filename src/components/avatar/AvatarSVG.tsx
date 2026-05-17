import { AvatarConfig, SKIN_COLORS, HAIR_COLORS } from './types';

type Props = {
  config: AvatarConfig;
  size?: number;
};

/* ─── Couleurs utilitaires ─── */
function lighten(hex: string, amount = 30): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/* ─── Forme du visage ─── */
function FaceShape({ shape, skin }: { shape: number; skin: string }) {
  switch (shape) {
    case 1: // Rond
      return <circle cx="100" cy="118" r="65" fill={skin} />;
    case 2: // Carré
      return <rect x="37" y="58" width="126" height="118" rx="24" fill={skin} />;
    case 3: // Cœur
      return (
        <path
          d="M100,185 C58,162 36,124 36,100 C36,73 58,55 80,55 C92,55 100,63 100,63 C100,63 108,55 120,55 C142,55 164,73 164,100 C164,124 142,162 100,185Z"
          fill={skin}
        />
      );
    default: // Oval (0)
      return <ellipse cx="100" cy="118" rx="60" ry="74" fill={skin} />;
  }
}

/* ─── Oreilles ─── */
function Ears({ skin }: { skin: string }) {
  const inner = lighten(skin, -20);
  return (
    <>
      <ellipse cx="39" cy="118" rx="10" ry="14" fill={skin} />
      <ellipse cx="39" cy="118" rx="6"  ry="9"  fill={inner} />
      <ellipse cx="161" cy="118" rx="10" ry="14" fill={skin} />
      <ellipse cx="161" cy="118" rx="6"  ry="9"  fill={inner} />
    </>
  );
}

/* ─── Sourcils ─── */
function Eyebrows({ hairColor }: { hairColor: string }) {
  return (
    <g stroke={hairColor} strokeWidth="3.5" fill="none" strokeLinecap="round">
      <path d="M63,91 Q74,86 86,91" />
      <path d="M114,91 Q126,86 137,91" />
    </g>
  );
}

/* ─── Yeux ─── */
function Eyes({ shape }: { shape: number }) {
  const irisColor = '#5B3A29';
  const positions = [
    { cx: 74, cy: 108 },
    { cx: 126, cy: 108 },
  ];

  return (
    <g>
      {positions.map(({ cx, cy }, i) => {
        if (shape === 1) {
          // Rond
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={11} fill="white" />
              <circle cx={cx} cy={cy} r={7}  fill={irisColor} />
              <circle cx={cx} cy={cy} r={4}  fill="#111" />
              <circle cx={cx - 2} cy={cy - 2} r={1.5} fill="white" />
            </g>
          );
        }
        if (shape === 2) {
          // Fin / allongé
          return (
            <g key={i}>
              <ellipse cx={cx} cy={cy} rx={13} ry={6}  fill="white" />
              <ellipse cx={cx} cy={cy} rx={7}  ry={5}  fill={irisColor} />
              <ellipse cx={cx} cy={cy} rx={3.5} ry={3} fill="#111" />
              <ellipse cx={cx - 2} cy={cy - 1} rx={1.2} ry={1} fill="white" />
            </g>
          );
        }
        // Amande (0 = default)
        return (
          <g key={i}>
            <ellipse cx={cx} cy={cy} rx={11} ry={9}  fill="white" />
            <circle  cx={cx} cy={cy} r={6.5}          fill={irisColor} />
            <circle  cx={cx} cy={cy} r={3.8}          fill="#111" />
            <circle  cx={cx - 2} cy={cy - 2} r={1.5} fill="white" />
          </g>
        );
      })}
    </g>
  );
}

/* ─── Nez ─── */
function Nose({ skin }: { skin: string }) {
  const dark = lighten(skin, -40);
  return (
    <g>
      <ellipse cx="96"  cy="132" rx="3" ry="2" fill={dark} opacity="0.5" />
      <ellipse cx="104" cy="132" rx="3" ry="2" fill={dark} opacity="0.5" />
    </g>
  );
}

/* ─── Bouche ─── */
function Mouth({ shape }: { shape: number }) {
  switch (shape) {
    case 1: // Neutre
      return (
        <path
          d="M80,150 Q100,155 120,150"
          stroke="#C0524A" strokeWidth="3" fill="none" strokeLinecap="round"
        />
      );
    case 2: // Grand sourire ouvert
      return (
        <g>
          <path d="M72,146 Q100,168 128,146" fill="#C0524A" />
          <ellipse cx="100" cy="156" rx="21" ry="9" fill="#E8756D" />
          <ellipse cx="100" cy="152" rx="18" ry="5" fill="white" opacity="0.6" />
        </g>
      );
    default: // Sourire (0)
      return (
        <path
          d="M76,147 Q100,163 124,147"
          stroke="#C0524A" strokeWidth="3.5" fill="none" strokeLinecap="round"
        />
      );
  }
}

/* ─── Cheveux (partie arrière, rendue AVANT le visage) ─── */
function HairBack({ style, color }: { style: number; color: string }) {
  // Calotte commune
  const cap = (
    <path
      d="M40,110 C40,42 160,42 160,110 L160,80 C160,32 40,32 40,80 Z"
      fill={color}
    />
  );

  switch (style) {
    case 0: // Long lisse
      return (
        <>
          {cap}
          <rect x="25" y="100" width="18" height="90" rx="9"  fill={color} />
          <rect x="157" y="100" width="18" height="90" rx="9" fill={color} />
        </>
      );
    case 1: // Long bouclé
      return (
        <>
          {cap}
          {/* Boucles côté gauche */}
          <circle cx="27" cy="118" r="13" fill={color} />
          <circle cx="22" cy="138" r="12" fill={color} />
          <circle cx="26" cy="157" r="12" fill={color} />
          <circle cx="30" cy="176" r="11" fill={color} />
          {/* Boucles côté droit */}
          <circle cx="173" cy="118" r="13" fill={color} />
          <circle cx="178" cy="138" r="12" fill={color} />
          <circle cx="174" cy="157" r="12" fill={color} />
          <circle cx="170" cy="176" r="11" fill={color} />
        </>
      );
    case 2: // Court mi-long (carré)
      return (
        <>
          {cap}
          <rect x="26" y="100" width="17" height="55" rx="8"  fill={color} />
          <rect x="157" y="100" width="17" height="55" rx="8" fill={color} />
        </>
      );
    case 3: // Court net (homme)
    case 4: // Court texturé (homme)
      return cap;
    default:
      return cap;
  }
}

/* ─── Cheveux (partie avant/dessus, rendue APRÈS le visage) ─── */
function HairFront({ style, color }: { style: number; color: string }) {
  switch (style) {
    case 0: // Long lisse — frange
      return (
        <path
          d="M45,78 C55,62 80,54 100,54 C120,54 145,62 155,78 L148,76 C138,62 120,56 100,56 C80,56 62,62 52,76Z"
          fill={color}
        />
      );
    case 1: // Long bouclé — mèches de devant
      return (
        <g>
          <circle cx="55" cy="72" r="12" fill={color} />
          <circle cx="71" cy="60" r="11" fill={color} />
          <circle cx="100" cy="55" r="11" fill={color} />
          <circle cx="129" cy="60" r="11" fill={color} />
          <circle cx="145" cy="72" r="12" fill={color} />
        </g>
      );
    case 2: // Court mi-long — frange nette
      return (
        <path
          d="M43,80 C55,60 80,52 100,52 C120,52 145,60 157,80 L150,78 C140,60 120,54 100,54 C80,54 60,60 50,78Z"
          fill={color}
        />
      );
    case 3: // Court net (homme) — propre
      return (
        <path
          d="M44,82 C56,62 80,54 100,54 C120,54 144,62 156,82 L148,78 C138,60 120,56 100,56 C80,56 62,60 52,78Z"
          fill={color}
        />
      );
    case 4: // Court texturé (homme) — mèches
      return (
        <g>
          <path
            d="M44,82 C56,62 80,54 100,54 C120,54 144,62 156,82 L148,78 C138,60 120,56 100,56 C80,56 62,60 52,78Z"
            fill={color}
          />
          {/* Lignes de texture */}
          <path d="M78,64 Q84,58 90,64" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M94,60 Q100,54 106,60" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M110,64 Q116,58 122,64" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      );
    default:
      return null;
  }
}

/* ─── Composant principal ─── */
export default function AvatarSVG({ config, size = 200 }: Props) {
  const skin      = SKIN_COLORS[config.skinColor]?.value  ?? SKIN_COLORS[0].value;
  const hairColor = HAIR_COLORS[config.hairColor]?.value  ?? HAIR_COLORS[0].value;

  // Couleur de fond subtile basée sur la teinte de cheveux
  const bgColor = config.skinColor === 2 ? '#EDE0D4' : '#F3EEFE';

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="avatarClip">
          <circle cx="100" cy="100" r="99" />
        </clipPath>
      </defs>

      {/* Fond */}
      <circle cx="100" cy="100" r="100" fill={bgColor} />

      {/* Contenu clippé */}
      <g clipPath="url(#avatarClip)">
        {/* 1. Cheveux arrière */}
        <HairBack style={config.hairStyle} color={hairColor} />

        {/* 2. Oreilles */}
        <Ears skin={skin} />

        {/* 3. Visage */}
        <FaceShape shape={config.faceShape} skin={skin} />

        {/* 4. Sourcils */}
        <Eyebrows hairColor={hairColor} />

        {/* 5. Yeux */}
        <Eyes shape={config.eyeShape} />

        {/* 6. Nez */}
        <Nose skin={skin} />

        {/* 7. Bouche */}
        <Mouth shape={config.mouthShape} />

        {/* 8. Cheveux avant */}
        <HairFront style={config.hairStyle} color={hairColor} />
      </g>

      {/* Bordure */}
      <circle cx="100" cy="100" r="99" fill="none" stroke="rgba(124,58,237,0.15)" strokeWidth="2" />
    </svg>
  );
}
