import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { ensureUniqueId, getPrivateProfileData } from '@/app/actions/profile';
import ProfileClient from './ProfileClient';
import type { AvatarConfig } from '@/components/avatar/types';
import { DEFAULT_AVATAR } from '@/components/avatar/types';

export default async function ProfilePage() {
  const user = await currentUser();
  const locale = await getLocale();

  if (!user) redirect(`/${locale}/sign-in`);

  // Garantit qu'un ID unique existe
  const uniqueId = await ensureUniqueId();

  // Récupère les données privées (serveur uniquement)
  const privateData = await getPrivateProfileData();

  // Avatar uniquement en publicMetadata (affiché partout dans l'UI)
  const publicMeta = user.publicMetadata as Record<string, unknown>;
  const avatarConfig: AvatarConfig = (publicMeta?.avatarConfig as AvatarConfig) ?? DEFAULT_AVATAR;

  return (
    <ProfileClient
      locale={locale}
      uniqueId={uniqueId}
      initialData={{
        firstName:   user.firstName      ?? '',
        lastName:    user.lastName       ?? '',
        phone:       privateData.phone,
        dateOfBirth: privateData.dateOfBirth,
        address:     privateData.address,
        profession:  privateData.profession,  // ← lu depuis privateMetadata
        company:     privateData.company,     // ← lu depuis privateMetadata
        avatarConfig,
      }}
    />
  );
}
