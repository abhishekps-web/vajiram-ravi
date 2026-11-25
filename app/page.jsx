import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton/WhatsAppButton';
import Hero from '@/components/sections/Hero/Hero';
import Programmes from '@/components/sections/Programmes';
import Toppers from '@/components/sections/Toppers';
import WhyChoose from '@/components/sections/WhyChoose';
import Batches from '@/components/sections/Batches';
import Faculties from '@/components/sections/Faculties';
import Stories from '@/components/sections/Stories';
import VideoStories from '@/components/sections/VideoStories';
import TalkToUs from '@/components/sections/TalkToUs';
import Resources from '@/components/sections/Resources';
import LifeGallery from '@/components/sections/LifeGallery';
import ContactUs from '@/components/sections/ContactUs';
import Faq from '@/components/sections/Faq';
import Closing from '@/components/sections/Closing';
import CourseCatalogDialog from '@/components/dialogs/CourseCatalogDialog';

export default function Home() {
  return (
    <>
      <NavigationBar />
      <main id="top">
        <div className="cover" id="cover">
          <Hero />
          <Programmes />
        </div>
        <Toppers />
        <div className="ground-merge">
          <Stories />
          <VideoStories />
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
