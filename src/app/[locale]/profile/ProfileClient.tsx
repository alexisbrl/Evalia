'use client';

import { useState, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { updateProfile } from '@/app/actions/profile';
import AvatarBuilder from '@/components/avatar/AvatarBuilder';
import AvatarSVG from '@/components/avatar/AvatarSVG';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { AvatarConfig } from '@/components/avatar/types';
import { PROFESSIONS_FR, PROFESSIONS_EN } from '@/components/avatar/types';
import {
  Copy,
  Check,
  Save,
  Loader2,
  User,
  Phone,
  MapPin,
  Briefcase,
  Palette,
  Info,
} from 'lucide-react';

type InitialData = {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  profession: string;
  company: string;
  avatarConfig: AvatarConfig;
};

type Props = {
  locale: string;
  uniqueId: string;
  initialData: InitialData;
};

export default function ProfileClient({ locale, uniqueId, initialData }: Props) {
  const [data, setData] = useState(initialData);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'avatar'>('info');

  const professions = locale === 'fr' ? PROFESSIONS_FR : PROFESSIONS_EN;

  function update(field: keyof InitialData, value: string | AvatarConfig) {
    setData((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    startTransition(async () => {
      const result = await updateProfile(data);
      if (result.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(result.error ?? 'Erreur inconnue');
      }
    });
  }

  function copyId() {
    navigator.clipboard.writeText(uniqueId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isFr = locale === 'fr';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-950 via-violet-950 to-indigo-950 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl ring-4 ring-violet-400/30 flex-shrink-0">
            <AvatarSVG config={data.avatarConfig} size={80} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {data.firstName || data.lastName
                ? `${data.firstName} ${data.lastName}`
                : (isFr ? 'Mon profil' : 'My profile')}
            </h1>
            {/* Identifiant unique */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-violet-300 text-sm">{isFr ? 'Identifiant ami :' : 'Friend ID:'}</span>
              <span className="font-mono font-bold text-white bg-violet-600/40 px-2.5 py-0.5 rounded-lg text-sm tracking-widest border border-violet-400/30">
                {uniqueId}
              </span>
              <button
                onClick={copyId}
                className="p-1 rounded-md text-violet-300 hover:text-white hover:bg-violet-500/30 transition-colors"
                title={isFr ? 'Copier' : 'Copy'}
              >
                {copied
                  ? <Check className="w-4 h-4 text-emerald-400" />
                  : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-violet-300/70 text-xs mt-1">
              {isFr
                ? '🔒 Identifiant permanent — partagez-le pour que vos amis vous retrouvent'
                : '🔒 Permanent ID — share it so friends can find you'}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 -mt-0">
        <div className="flex border-b border-gray-200 bg-white rounded-t-none">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'info'
                ? 'border-violet-600 text-violet-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <User className="w-4 h-4" />
            {isFr ? 'Informations' : 'Information'}
          </button>
          <button
            onClick={() => setActiveTab('avatar')}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'avatar'
                ? 'border-violet-600 text-violet-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Palette className="w-4 h-4" />
            {isFr ? 'Mon avatar' : 'My avatar'}
          </button>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Identité */}
              <Card className="border border-gray-100">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <User className="w-4 h-4 text-violet-500" />
                    {isFr ? 'Identité' : 'Identity'}
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm text-gray-600 mb-1 block">
                      {isFr ? 'Prénom' : 'First name'}
                    </Label>
                    <Input
                      id="firstName"
                      value={data.firstName}
                      onChange={(e) => update('firstName', e.target.value)}
                      placeholder={isFr ? 'Votre prénom' : 'Your first name'}
                      className="h-11 rounded-xl border-gray-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm text-gray-600 mb-1 block">
                      {isFr ? 'Nom' : 'Last name'}
                    </Label>
                    <Input
                      id="lastName"
                      value={data.lastName}
                      onChange={(e) => update('lastName', e.target.value)}
                      placeholder={isFr ? 'Votre nom' : 'Your last name'}
                      className="h-11 rounded-xl border-gray-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth" className="text-sm text-gray-600 mb-1 block">
                      {isFr ? 'Date de naissance' : 'Date of birth'}
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={data.dateOfBirth}
                      onChange={(e) => update('dateOfBirth', e.target.value)}
                      className="h-11 rounded-xl border-gray-200"
                    />
                  </div>
                  {/* ID unique (lecture seule) */}
                  <div>
                    <Label className="text-sm text-gray-600 mb-1 flex items-center gap-1.5">
                      {isFr ? 'Identifiant ami' : 'Friend ID'}
                      <span title={isFr ? 'Permanent et unique — impossible à modifier' : 'Permanent and unique — cannot be changed'}>
                        <Info className="w-3.5 h-3.5 text-gray-400" />
                      </span>
                    </Label>
                    <div className="flex items-center gap-2 h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl">
                      <span className="font-mono font-bold text-violet-700 tracking-widest">{uniqueId}</span>
                      <Badge variant="outline" className="text-xs text-gray-500 border-gray-200 ml-auto">
                        {isFr ? 'Permanent' : 'Permanent'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card className="border border-gray-100">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <Phone className="w-4 h-4 text-violet-500" />
                    {isFr ? 'Contact' : 'Contact'}
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-sm text-gray-600 mb-1 block">
                      {isFr ? 'Téléphone' : 'Phone'}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={data.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="+33 6 00 00 00 00"
                      className="h-11 rounded-xl border-gray-200"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address" className="text-sm text-gray-600 mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {isFr ? 'Adresse' : 'Address'}
                    </Label>
                    <Input
                      id="address"
                      value={data.address}
                      onChange={(e) => update('address', e.target.value)}
                      placeholder={isFr ? '12 rue de la Paix, 75001 Paris' : '123 Main Street, City'}
                      className="h-11 rounded-xl border-gray-200"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Professionnel */}
              <Card className="border border-gray-100">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-gray-700 font-semibold">
                    <Briefcase className="w-4 h-4 text-violet-500" />
                    {isFr ? 'Professionnel' : 'Professional'}
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="profession" className="text-sm text-gray-600 mb-1 block">
                      {isFr ? 'Profession' : 'Profession'}
                    </Label>
                    <select
                      id="profession"
                      value={data.profession}
                      onChange={(e) => update('profession', e.target.value)}
                      className="w-full h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      <option value="">{isFr ? '— Sélectionner —' : '— Select —'}</option>
                      {professions.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-sm text-gray-600 mb-1 block">
                      {isFr ? 'Entreprise / Établissement' : 'Company / Institution'}
                    </Label>
                    <Input
                      id="company"
                      value={data.company}
                      onChange={(e) => update('company', e.target.value)}
                      placeholder={isFr ? 'Nom de votre entreprise' : 'Your company name'}
                      className="h-11 rounded-xl border-gray-200"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'avatar' && (
            <Card className="border border-gray-100">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                  <Palette className="w-4 h-4 text-violet-500" />
                  {isFr ? 'Personnalisez votre avatar' : 'Customize your avatar'}
                </div>
                <p className="text-sm text-gray-500">
                  {isFr
                    ? 'Votre avatar est visible dans les ateliers et par vos amis.'
                    : 'Your avatar is visible in workshops and to your friends.'}
                </p>
              </CardHeader>
              <CardContent>
                <AvatarBuilder
                  value={data.avatarConfig}
                  onChange={(cfg) => update('avatarConfig', cfg)}
                />
              </CardContent>
            </Card>
          )}

          {/* Bouton de sauvegarde */}
          <div className="mt-6 flex items-center gap-4">
            <Button
              type="submit"
              disabled={isPending}
              className="gradient-primary text-white border-0 hover:opacity-90 h-11 px-6 rounded-xl font-semibold shadow-lg shadow-violet-200"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isFr ? 'Sauvegarde...' : 'Saving...'}
                </>
              ) : saved ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-emerald-300" />
                  {isFr ? 'Sauvegardé !' : 'Saved!'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isFr ? 'Sauvegarder' : 'Save'}
                </>
              )}
            </Button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
