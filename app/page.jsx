import NavigationBar from '@/components/layout/navigation-bar';
import Footer from '@/components/layout/footer';
import WhatsAppButton from '@/components/layout/whatsapp-button';
import Hero from '@/components/sections/home/hero';
import Programmes from '@/components/sections/home/programmes';
import Toppers from '@/components/sections/home/toppers';
import WhyChoose from '@/components/sections/home/why-choose';
import Batches from '@/components/sections/home/batches';
import Faculties from '@/components/sections/home/faculties';
import Stories from '@/components/sections/home/stories';
import VideoStories from '@/components/sections/home/video-stories';
import TalkToUs from '@/components/sections/home/talk-to-us';
import Resources from '@/components/sections/home/resources';
import LifeGallery from '@/components/sections/home/life-gallery';
import ContactUs from '@/components/sections/home/contact-us';
import Faq from '@/components/sections/home/faq';
import Closing from '@/components/sections/home/closing';

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
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
