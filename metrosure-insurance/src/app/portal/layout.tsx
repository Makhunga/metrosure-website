import { Metadata } from 'next';
import PortalLayout from '@/components/portal/PortalLayout';

export const metadata: Metadata = {
  title: 'Client Portal | MetroSure Insurance',
  description: 'Manage your insurance policies, submit claims, and track your cover with the MetroSure Client Portal.',
};

export default function PortalRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalLayout>{children}</PortalLayout>;
}
