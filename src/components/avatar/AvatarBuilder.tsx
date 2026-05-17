'use client';

import { useState } from 'react';
import AvatarSVG from './AvatarSVG';
import {
  AvatarConfig,
  SKIN_COLORS,
  HAIR_COLORS,
  FACE_SHAPE_LABELS,
  HAIR_STYLE_LABELS,
  EYE_SHAPE_LABELS,
  MOUTH_SHAPE_LABELS,
} from './types';

type Props = {
  value: AvatarConfig;
  onChange: (config: AvatarConfig) => void;
};

type Section = 'face' | 'skin' | 'hair' | 'hairColor' | 'eyes' | 'mouth';

const SECTIONS: { key: Section; label: string; emoji: string }[] = [
  { key: 'face',      label: 'Visage',   emoji: '😊' },
  { key: 'skin',      label: 'Peau',     emoji: '🎨' },
  { key: 'hair',      label: 'Cheveux',  emoji: '💇' },
  { key: 'hairColor', label: 'Couleur',  emoji: '🎨' },
  { key: 'eyes',      label: 'Yeux',     emoji: '👁️' },
  { key: 'mouth',     label: 'Bouche',   emoji: '😄' },
];

/* Bouton de sélection générique */
function OptionButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
        active
          ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-sm'
          : 'border-gray-200 bg-white text-gray-600 hover:border-violet-300 hover:bg-violet-50'
      }`}
    >
      {children}
    </button>
  );
}

/* Bouton de couleur */
function ColorButton({
  color,
  label,
  active,
  onClick,
}: {
  color: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`w-10 h-10 rounded-full border-4 transition-all ${
        active
          ? 'border-violet-500 scale-110 shadow-md'
          : 'border-transparent hover:border-violet-300 hover:scale-105'
      }`}
      style={{ backgroundColor: color }}
    />
  );
}

export default function AvatarBuilder({ value, onChange }: Props) {
  const [activeSection, setActiveSection] = useState<Section>('face');

  function update(key: keyof AvatarConfig, val: number) {
    onChange({ ...value, [key]: val });
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Preview de l'avatar */}
      <div className="relative">
        <div className="w-40 h-40 drop-shadow-xl">
          <AvatarSVG config={value} size={160} />
        </div>
      </div>

      {/* Onglets de section */}
      <div className="flex flex-wrap justify-center gap-1.5">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setActiveSection(s.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSection === s.key
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-violet-50 hover:text-violet-700'
            }`}
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>

      {/* Options de la section active */}
      <div className="w-full bg-gray-50 rounded-2xl p-4 min-h-[80px]">
        {activeSection === 'face' && (
          <div>
            <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">Forme du visage</p>
            <div className="flex flex-wrap gap-2">
              {FACE_SHAPE_LABELS.map((label, i) => (
                <OptionButton key={i} active={value.faceShape === i} onClick={() => update('faceShape', i)}>
                  {label}
                </OptionButton>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'skin' && (
          <div>
            <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">Couleur de peau</p>
            <div className="flex gap-4">
              {SKIN_COLORS.map((sc, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <ColorButton
                    color={sc.value}
                    label={sc.label}
                    active={value.skinColor === i}
                    onClick={() => update('skinColor', i)}
                  />
                  <span className="text-xs text-gray-500">{sc.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'hair' && (
          <div>
            <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">Style de cheveux</p>
            <div className="space-y-2">
              <div>
                <span className="text-xs text-violet-500 font-medium mb-1 block">Styles longs / mi-longs</span>
                <div className="flex flex-wrap gap-2">
                  {[0, 1, 2].map((i) => (
                    <OptionButton key={i} active={value.hairStyle === i} onClick={() => update('hairStyle', i)}>
                      {HAIR_STYLE_LABELS[i]}
                    </OptionButton>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs text-violet-500 font-medium mb-1 block">Styles courts</span>
                <div className="flex flex-wrap gap-2">
                  {[3, 4].map((i) => (
                    <OptionButton key={i} active={value.hairStyle === i} onClick={() => update('hairStyle', i)}>
                      {HAIR_STYLE_LABELS[i]}
                    </OptionButton>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'hairColor' && (
          <div>
            <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">Couleur des cheveux</p>
            <div className="flex gap-4">
              {HAIR_COLORS.map((hc, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <ColorButton
                    color={hc.value}
                    label={hc.label}
                    active={value.hairColor === i}
                    onClick={() => update('hairColor', i)}
                  />
                  <span className="text-xs text-gray-500">{hc.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'eyes' && (
          <div>
            <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">Forme des yeux</p>
            <div className="flex flex-wrap gap-2">
              {EYE_SHAPE_LABELS.map((label, i) => (
                <OptionButton key={i} active={value.eyeShape === i} onClick={() => update('eyeShape', i)}>
                  {label}
                </OptionButton>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'mouth' && (
          <div>
            <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">Forme de la bouche</p>
            <div className="flex flex-wrap gap-2">
              {MOUTH_SHAPE_LABELS.map((label, i) => (
                <OptionButton key={i} active={value.mouthShape === i} onClick={() => update('mouthShape', i)}>
                  {label}
                </OptionButton>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
