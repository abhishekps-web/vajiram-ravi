import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import Stylesheet from '@/components/ui/Stylesheet';
import CourseFinder from '@/components/sections/CourseFinder/CourseFinder';

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
        <CourseFinder />
      </main>
      <Footer />
    </>
  );
}
