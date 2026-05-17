import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import LinkButton from '@/components/LinkButton';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { CheckCircle2, Zap, Building2, Rocket } from 'lucide-react';

export default async function PricingPage() {
  const locale = await getLocale();
  return <PricingPageClient locale={locale} />;
}

function PricingPageClient({ locale }: { locale: string }) {
  const t = useTranslations('pricing');

  const plans = [
    {
      key: 'starter',
      icon: Rocket,
      name: t('starter.name'),
      price: t('starter.price'),
      period: t('starter.period'),
      desc: t('starter.desc'),
      cta: t('starter.cta'),
      ctaHref: `/${locale}#waitlist`,
      features: [
        t('starter.features.0'),
        t('starter.features.1'),
        t('starter.features.2'),
        t('starter.features.3'),
        t('starter.features.4'),
      ],
      popular: false,
      iconColor: 'text-gray-600',
      iconBg: 'bg-gray-100',
    },
    {
      key: 'pro',
      icon: Zap,
      name: t('pro.name'),
      price: t('pro.priceMonthly'),
      period: t('pro.period'),
      desc: t('pro.desc'),
      cta: t('pro.cta'),
      ctaHref: `/${locale}#waitlist`,
      features: [
        t('pro.features.0'),
        t('pro.features.1'),
        t('pro.features.2'),
        t('pro.features.3'),
        t('pro.features.4'),
        t('pro.features.5'),
        t('pro.features.6'),
        t('pro.features.7'),
      ],
      popular: true,
      iconColor: 'text-violet-600',
      iconBg: 'bg-violet-100',
    },
    {
      key: 'enterprise',
      icon: Building2,
      name: t('enterprise.name'),
      price: t('enterprise.price'),
      period: t('enterprise.period'),
      desc: t('enterprise.desc'),
      cta: t('enterprise.cta'),
      ctaHref: `/${locale}/contact`,
      features: [
        t('enterprise.features.0'),
        t('enterprise.features.1'),
        t('enterprise.features.2'),
        t('enterprise.features.3'),
        t('enterprise.features.4'),
        t('enterprise.features.5'),
        t('enterprise.features.6'),
      ],
      popular: false,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-100',
    },
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
          <p className="text-slate-300 text-lg">{t('subtitle')}</p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <Card
                  key={plan.key}
                  className={`relative border ${
                    plan.popular
                      ? 'border-violet-400 shadow-2xl shadow-violet-100 scale-105'
                      : 'border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="gradient-primary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                        {t('popular')}
                      </span>
                    </div>
                  )}
                  <CardHeader className="p-6 pb-4">
                    <div className={`w-12 h-12 rounded-xl ${plan.iconBg} flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${plan.iconColor}`} />
                    </div>
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      {plan.name}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-bold ${plan.popular ? 'text-violet-600' : 'text-gray-900'}`}>
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-gray-500 text-sm">{plan.period}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{plan.desc}</p>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <LinkButton
                      href={plan.ctaHref}
                      className={`w-full mb-6 h-11 rounded-xl font-semibold flex items-center justify-center ${
                        plan.popular
                          ? 'gradient-primary text-white border-0 hover:opacity-90 shadow-lg shadow-violet-200'
                          : 'border border-gray-200 text-gray-700 hover:bg-gray-50 bg-white'
                      }`}
                    >
                      {plan.cta}
                    </LinkButton>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-violet-500' : 'text-emerald-500'}`} />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <p className="text-center text-sm text-gray-500 mt-12">
            {locale === 'fr'
              ? 'Des questions sur les tarifs ? '
              : 'Questions about pricing? '}
            <Link href={`/${locale}/contact`} className="text-violet-600 hover:underline font-medium">
              {locale === 'fr' ? 'Contactez-nous' : 'Contact us'}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
