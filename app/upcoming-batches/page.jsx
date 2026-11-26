import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import BatchesPage from '@/components/sections/BatchesPage';
import { BATCHES_PAGE } from '@/lib/data/batches';

export const metadata = { title: BATCHES_PAGE.title, description: BATCHES_PAGE.description };

export default function Page() {
  return (
    <>
      <NavigationBar />
      <main id="top" className="course-page">
        <BatchesPage />
      </main>
      <Footer />
    </>
  );
}
