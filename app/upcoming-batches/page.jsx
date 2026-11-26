import NavigationBar from '@/components/layout/navigation-bar';
import Footer from '@/components/layout/footer';
import Stylesheet from '@/components/ui/stylesheet';
import PageHero from '@/components/ui/page-hero';
import BatchesPage from '@/components/sections/BatchesPage';
import { BATCHES_PAGE as P, BATCH_GROUPS, upcomingBatches } from '@/lib/data/batches';

export const metadata = { title: P.title, description: P.description };

const TODAY = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
const GROUPS = BATCH_GROUPS.map(({ id, t, c }) => ({ id, t, c }));

export default function Page() {
  return (
    <>
      <NavigationBar />
      <Stylesheet href="/css/course-finder.css" />
      <main id="top" className="course-page">
        <PageHero id="batchesHero" crumbs={P.crumbs} title={P.heading}>{P.intro}</PageHero>
        <BatchesPage items={upcomingBatches(TODAY)} groups={GROUPS} copy={P} />
      </main>
      <Footer />
    </>
  );
}
