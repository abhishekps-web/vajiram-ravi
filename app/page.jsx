import NavigationBar from '@/components/layout/NavigationBar/NavigationBar';
import Footer from '@/components/layout/Footer/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton/WhatsAppButton';
import Hero from '@/components/sections/Hero/Hero';
import Programmes from '@/components/sections/Programmes/Programmes';
import Toppers from '@/components/sections/Toppers';
import WhyChoose from '@/components/sections/WhyChoose';
import Batches from '@/components/sections/Batches';
import Faculties from '@/components/sections/Faculties';
import Stories from '@/components/sections/Stories';
import TalkToUs from '@/components/sections/TalkToUs';
import Resources from '@/components/sections/Resources';
import LifeGallery from '@/components/sections/LifeGallery';
import ContactUs from '@/components/sections/ContactUs';
import Faq from '@/components/sections/Faq/Faq';
import Closing from '@/components/sections/Closing';
import CourseCatalogDialog from '@/components/dialogs/CourseCatalogDialog';

// The homepage: the sections in page order. Each section owns its markup, data, styles and behaviour in
// components/sections/<Section>/; the behaviours run in the order set by lib/behaviour.js.
export default function Home() {
  return (
    <>
      <NavigationBar />
      <main id="top">
        {/* Order from the 11 Nov 2026 direction session (WEBSITE-DIRECTION-2026-11-11.md): 1 banners (hero),
            2 courses, 3 toppers, 4 topper testimonials, 5 faculty, 6 why choose us, then the rest */}
        <div className="cover" id="cover">
          <Hero />
          <Programmes />
        </div>
        <Toppers />
        {/* one shared ground (jaali lattice) behind Success stories and Faculty, so the postcard shadows fall across an unbroken
            background (public/css/v49.css .ground-merge) */}
        <div className="ground-merge">
          <Stories />
          <Faculties />
        </div>
        <LifeGallery />
        <Batches />
        <TalkToUs />
        <Resources />
        <WhyChoose />
        <ContactUs />
        <Faq />
        <Closing />
        <CourseCatalogDialog />
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
