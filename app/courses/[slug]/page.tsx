import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import NavigationBar from "@/components/layout/NavigationBar/NavigationBar";
import Footer from "@/components/layout/Footer/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button/Button";
import { programmes, programmeSlug } from "@/components/sections/Programmes/data/programmes";

/**
 * A programme's course detail page: a PLACEHOLDER (user 2026-11-13) until the real course content is ready. "View course" on a
 * book in the Programmes shelf links here (coursePageHref). One page per programme, built at build time; any other slug is a 404.
 * It uses the site's header, footer, type, rhythm (--sec-y) and buttons; the real page will replace the body below.
 */
export const dynamicParams = false;
export function generateStaticParams() {
  return programmes.map((p) => ({ slug: programmeSlug(p.name) }));
}

const find = (slug: string) => programmes.find((p) => programmeSlug(p.name) === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = find((await params).slug);
  return p ? { title: `${p.name} | Vajiram & Ravi IAS Institute`, description: p.line } : {};
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const p = find((await params).slug);
  if (!p) notFound();
  return (
    <>
      <NavigationBar />
      <main id="top" className="course-page">
        <section className="course-ph" aria-labelledby="coursePhH">
          <SectionLabel>{p.category}</SectionLabel>
          <h1 id="coursePhH" className="h2 h2--sec rv" style={{ "--d": ".12s" } as CSSProperties}>{p.name}</h1>
          <p className="intro rv" style={{ "--d": ".2s" } as CSSProperties}>{p.line}</p>
          <div className="course-ph__card rv" style={{ "--d": ".28s" } as CSSProperties}>
            <p className="course-ph__k">Course details coming soon</p>
            <p className="course-ph__p">
              The full page for this programme ({p.count} {p.count === 1 ? "course" : "courses"}) is being prepared. Meanwhile, our
              counsellors can walk you through it.
            </p>
            {p.courses.length > 0 && (
              <ul className="course-ph__list">
                {p.courses.map((c) => <li key={c}>{c}</li>)}
              </ul>
            )}
            <div className="course-ph__btns">
              <Button href="/#contact" iconEnd="arrow">Talk to a counsellor</Button>
              <Button variant="secondary" href="/#courses" iconStart="arrow-left">All programmes</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
