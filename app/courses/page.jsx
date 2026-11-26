import NavigationBar from '@/components/layout/navigation-bar';
import Footer from '@/components/layout/footer';
import Stylesheet from '@/components/ui/stylesheet';
import PageHero from '@/components/ui/page-hero';
import { COURSES_HERO as H } from '@/lib/data/course-finder';
import CourseFinder from '@/components/sections/CourseFinder';

// The course finder: every course, grouped. Layout from the Figma courses page; header, footer, ground, type and buttons are the site's.
export const metadata = {
  title: 'UPSC Courses: Course Finder | Vajiram & Ravi IAS Institute',
  description: 'Find your UPSC course: GS Foundation, Optional, CSAT, test series, mentorship and more. Classroom and LIVE-Online, in English and Hindi.',
};

export default function CoursesPage() {
  return (
    <>
      <NavigationBar />
      <Stylesheet href="/css/course-finder.css" />
      <main id="top" className="course-page">
        <PageHero id="cfHero" crumbs={H.crumbs} title={H.heading}>
          {H.lede} <span className="cu:[font-family:'Tiro_Devanagari_Hindi',var(--f)]" lang="hi">{H.ledeHi}</span>.
        </PageHero>
        <CourseFinder />
      </main>
      <Footer />
    </>
  );
}
