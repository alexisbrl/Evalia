'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function WaitlistForm({ className }: { className?: string }) {
  const t = useTranslations('waitlist');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role }),
      });
      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setRole('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`text-center p-6 rounded-2xl bg-emerald-50 border border-emerald-200 ${className}`}>
        <div className="text-3xl mb-2">🎉</div>
        <p className="font-semibold text-emerald-800">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder={t('namePlaceholder')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="flex-1 h-12 rounded-xl border-violet-200 focus-visible:ring-violet-500 bg-white"
        />
        <Input
          type="email"
          placeholder={t('emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 h-12 rounded-xl border-violet-200 focus-visible:ring-violet-500 bg-white"
        />
      </div>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full h-12 rounded-xl border border-violet-200 bg-white px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        <option value="">{t('rolePlaceholder')}</option>
        <option value="formateur">{t('roleFormateur')}</option>
        <option value="entreprise">{t('roleEntreprise')}</option>
        <option value="ecole">{t('roleEcole')}</option>
        <option value="autre">{t('roleAutre')}</option>
      </select>
      <Button
        type="submit"
        disabled={status === 'loading'}
        className="w-full h-12 gradient-primary text-white border-0 hover:opacity-90 rounded-xl text-base font-semibold shadow-lg shadow-violet-200"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {t('sending')}
          </>
        ) : (
          <>
            {t('button')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
      {status === 'error' && (
        <p className="text-sm text-red-600 text-center">{t('error')}</p>
      )}
    </form>
  );
}
