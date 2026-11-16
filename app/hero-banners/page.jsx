import NavigationBar from '@/components/layout/NavigationBar/NavigationBar';
import Footer from '@/components/layout/Footer/Footer';
import SectionLabel from '@/components/ui/SectionLabel';
import Stylesheet from '@/components/ui/Stylesheet';
import {
  RankReveal, Lineup, Marquee, ToppersStack, CourseSpotlight, StageTabs, BatchCountdown, TopperCourse, CourseToppers, Playlist,
} from '@/components/hero-banners/HeroTypes';

/**
 * Hero banner types (user 2026-11-16): ten carousel ideas for the homepage hero, built side by side so the best can be picked
 * and the chosen one moved into components/sections/Hero. Not linked from the site and not indexed. Content comes from the
 * site's own data (components/hero-banners/data.js); styles public/css/hero-banners.css.
 */
export const metadata = {
  title: 'Hero banner types | Vajiram & Ravi IAS Institute',
  description: 'Ten hero carousel ideas for toppers and course highlights, to compare.',
  robots: { index: false, follow: false },
};

const GROUPS = [
  { key: 'A', name: 'Toppers', types: [
    { id: 'a1', name: 'Rank reveal', C: RankReveal, best: 'Results season: one rank holder at a time, the rank number huge behind them.' },
    { id: 'a2', name: 'Line-up with a spotlight', C: Lineup, best: '“10 of the top 10” in one picture; a click on any face spotlights it.' },
    { id: 'a3', name: 'Results marquee + featured topper', C: Marquee, best: 'Shows how many there are (all 26 on the list, in the top 50) without 26 slides.' },
    { id: 'a4', name: 'Topper card stack', C: ToppersStack, best: 'The current hero’s card stack, dealing toppers instead of photos.' },
  ] },
  { key: 'B', name: 'Course highlights', types: [
    { id: 'b1', name: 'Course spotlight', C: CourseSpotlight, best: 'Selling courses directly: GS first, each with Enrol and its page.' },
    { id: 'b2', name: 'Course tabs by stage', C: StageTabs, best: 'An aspirant finds the course for their stage at a glance; the tabs are the navigation.' },
    { id: 'b3', name: 'Upcoming batch countdown', C: BatchCountdown, best: 'Urgency: the next batches by date, each with a countdown and its seats.' },
  ] },
  { key: 'C', name: 'Toppers + courses', types: [
    { id: 'c1', name: '“Their course could be yours”', C: TopperCourse, best: 'Proof into action: a topper beside the course they took.' },
    { id: 'c2', name: 'Course first, with its toppers', C: CourseToppers, best: 'Each course carries the faces of the rank holders who took it.' },
    { id: 'c3', name: 'Mixed playlist', C: Playlist, best: 'The 11 Nov order: results, the GS course, toppers with courses, in one hero.' },
  ] },
];

export default function HeroBannersPage() {
  return (
    <>
      <Stylesheet href="/css/hero-banners.css" />
      <NavigationBar />
      <main id="top" className="hbp">
        <header className="hbp__intro">
          <SectionLabel>Hero banner types</SectionLabel>
          <h1 className="h2 h2--sec rv" style={{ '--d': '.12s' }}>Ten heroes for toppers and courses</h1>
          <p className="intro rv" style={{ '--d': '.2s' }}>
            Each one is a working carousel with the site’s own toppers, programmes and batches. Hover or focus one to hold it;
            arrows, the indicators, arrow keys and a swipe change slides.
          </p>
          <nav className="hbp__toc rv" style={{ '--d': '.28s' }} aria-label="Banner types">
            {GROUPS.map(g => (
              <div key={g.key} className="hbp__grp">
                <span className="hbp__gk">{g.key} · {g.name}</span>
                {g.types.map(t => <a key={t.id} href={`/hero-banners#${t.id}`}><b>{t.id.toUpperCase()}</b> {t.name}</a>)}
              </div>
            ))}
          </nav>
        </header>
        {GROUPS.map(g => g.types.map(({ id, name, best, C }) => (
          <section key={id} id={id} className="hbp__type" aria-labelledby={`${id}H`}>
            <div className="hbp__label rv">
              <span className="hbp__code">{id.toUpperCase()}</span>
              <div>
                <h2 id={`${id}H`}>{name} <span className="hbp__g">{g.name}</span></h2>
                <p>{best}</p>
              </div>
            </div>
            <div className="hbp__demo rv" style={{ '--d': '.1s' }}><C /></div>
          </section>
        )))}
      </main>
      <Footer />
    </>
  );
}
