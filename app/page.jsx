import NavigationBar from '@/components/layout/NavigationBar/NavigationBar';
import Footer from '@/components/layout/Footer/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton/WhatsAppButton';
import Hero from '@/components/sections/Hero/Hero';
import Programmes from '@/components/sections/Programmes/Programmes';
import Toppers from '@/components/sections/Toppers/Toppers';
import WhyChoose from '@/components/sections/WhyChoose/WhyChoose';
import Batches from '@/components/sections/Batches/Batches';
import GeneralStudies from '@/components/sections/GeneralStudies/GeneralStudies';
import Faculties from '@/components/sections/Faculties/Faculties';
import Stories from '@/components/sections/Stories/Stories';
import Contact from '@/components/sections/Contact/Contact';
import Resources from '@/components/sections/Resources/Resources';
import LifeGallery from '@/components/sections/LifeGallery/LifeGallery';
import Visit from '@/components/sections/Visit/Visit';
import Faq from '@/components/sections/Faq/Faq';
import Closing from '@/components/sections/Closing/Closing';
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
        <WhyChoose />
        <Batches />
        <GeneralStudies />
        <Resources />
        {/* Life at Vajiram & Ravi (user 2026-11-16, from Kevin's branch, where it follows Free resources) */}
        <LifeGallery />
        <Contact />
        <Visit />
        <Faq />
        <Closing />
        {/* the "All courses" pop-up (not a section): the nav's course menu and "View GS courses" open it */}
        <CourseCatalogDialog />
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
