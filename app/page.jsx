import NavigationBar from '@/components/layout/NavigationBar/NavigationBar';
import Footer from '@/components/layout/Footer/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton/WhatsAppButton';
import Hero from '@/components/sections/Hero/Hero';
import Programmes from '@/components/sections/Programmes/Programmes';
import Toppers from '@/components/sections/Toppers/Toppers';
import WhyChoose from '@/components/sections/WhyChoose/WhyChoose';
import Batches from '@/components/sections/Batches/Batches';
import GeneralStudies from '@/components/sections/GeneralStudies/GeneralStudies';
import Faculty from '@/components/sections/Faculty/Faculty';
import Stories from '@/components/sections/Stories/Stories';
import Contact from '@/components/sections/Contact/Contact';
import Resources from '@/components/sections/Resources/Resources';
import Visit from '@/components/sections/Visit/Visit';
import Faq from '@/components/sections/Faq/Faq';
import Closing from '@/components/sections/Closing/Closing';
import Parked from '@/components/sections/Parked/Parked';
import RanksDialog from '@/components/dialogs/RanksDialog';
import CourseCatalogDialog from '@/components/dialogs/CourseCatalogDialog';

// The homepage: the sections in page order. Each section owns its markup, data, styles and behaviour in
// components/sections/<Section>/; the behaviours run in the order set by lib/behaviour.js.
export default function Home() {
  return (
    <>
      <NavigationBar />
      <main id="top">
        {/* the hero and Programmes share the cover: Programmes slides up over the pinned hero */}
        <div className="cover" id="cover">
          <Hero />
          <Programmes />
        </div>
        <Toppers />
        <WhyChoose />
        <RanksDialog />
        <CourseCatalogDialog />
        <Batches />
        <GeneralStudies />
        <Faculty />
        <Stories />
        <Contact />
        <Resources />
        <Visit />
        <Faq />
        <Closing />
        <Parked />
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
