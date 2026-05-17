import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import LinkButton from '@/components/LinkButton';
import { getLocale } from 'next-intl/server';
import { Upload, Settings, Share2, BarChart3, FileText, Film, Image, Presentation, ArrowRight } from 'lucide-react';

export default async function CreatePage() {
  const locale = await getLocale();
  return <CreatePageClient locale={locale} />;
}

function CreatePageClient({ locale }: { locale: string }) {
  const t = useTranslations('create');

  const steps = [
    {
      icon: Upload,
      title: t('step1.title'),
      desc: t('step1.desc'),
      color: 'from-violet-500 to-violet-600',
      bg: 'bg-violet-50',
      border: 'border-violet-200',
    },
    {
      icon: Settings,
      title: t('step2.title'),
      desc: t('step2.desc'),
      color: 'from-orange-400 to-orange-500',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
    },
    {
      icon: Share2,
      title: t('step3.title'),
      desc: t('step3.desc'),
      color: 'from-emerald-500 to-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
    {
      icon: BarChart3,
      title: t('step4.title'),
      desc: t('step4.desc'),
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
    },
  ];

  const formats = [
    { icon: FileText, label: 'PDF', color: 'text-red-500' },
    { icon: FileText, label: 'Word', color: 'text-blue-500' },
    { icon: Presentation, label: 'PowerPoint', color: 'text-orange-500' },
    { icon: Film, label: locale === 'fr' ? 'Vidéo' : 'Video', color: 'text-purple-500' },
    { icon: Image, label: locale === 'fr' ? 'Images' : 'Images', color: 'text-emerald-500' },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-950 via-violet-950 to-indigo-950 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-violet-500/20 text-violet-300 border-violet-400/30">
            {t('badge')}
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className={`flex flex-col md:flex-row gap-6 p-8 rounded-2xl border ${step.border} ${step.bg} hover:shadow-md transition-shadow`}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:flex items-center">
                      <ArrowRight className="w-5 h-5 text-gray-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('formats')}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {formats.map((format) => {
              const Icon = format.icon;
              return (
                <div
                  key={format.label}
                  className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-violet-200 hover:shadow-md transition-all"
                >
                  <Icon className={`w-5 h-5 ${format.color}`} />
                  <span className="font-medium text-gray-700">{format.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-violet-600 to-indigo-700 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('cta')}</h2>
          <p className="text-violet-200 mb-8">{t('ctaNote')}</p>
          <LinkButton
            href={`/${locale}#waitlist`}
            className="h-14 px-8 bg-white text-violet-700 hover:bg-violet-50 border-0 rounded-xl font-semibold shadow-xl inline-flex items-center gap-2"
          >
            {t('cta')}
            <ArrowRight className="w-5 h-5" />
          </LinkButton>
        </div>
      </section>
    </>
  );
}
