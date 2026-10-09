import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import GlobalLoadingScreen from '@/components/ui/GlobalLoadingScreen';

export const metadata: Metadata = {
  title: {
    default: 'PlantPedia — Garden-Based Plant Encyclopedia',
    template: '%s | PlantPedia',
  },
  description:
    'Digital campus plant encyclopedia and botanical repository. Explore species, physical QR tagging, ecological metrics, and AI assistant care guidance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased font-sans">
      <body className="min-h-full flex flex-col bg-[#F4FAF4] text-[#1F2A1F]">
        <GlobalLoadingScreen />
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
