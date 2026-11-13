import "./educators.css";
import type { CSSProperties } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import TextMotion from "@/components/sections/Faculties/ui/TextMotion";
import { educators, facultyIntro } from "@/components/sections/Faculties/data/educators";
import EducatorFlow from "./EducatorFlow";

/**
 * Meet our educators: the Faculty section of the Soloman build (Downloads/solo/Vajiram-ravi, src/components/sections/Faculty,
 * Figma "06 · Meet Our Educators", 2377:4795), ported as it is (user 2026-11-13): the educators on a circular carousel, a
 * ring of bent portrait cards, with the educator at the front introduced right under it (EducatorFlow, ui/CircularCarousel).
 * Its eyebrow, heading and lead use this site's global type (SectionLabel, .h2.h2--sec, .intro) and section rhythm
 * (educators.css). "Meet our faculty" stays hidden until the faculty page exists, as on Soloman (facultyIntro.cta.href is null).
 *
 * Motion: the site's .rv reveals on the eyebrow, heading and lead; the carousel rises into place once in view and its ring
 * turns in (ui/TextMotion, data-rise, scoped to this section).
 */
export default function Faculties() {
  const { heading, lead } = facultyIntro;
  return (
    <section id="educators" aria-labelledby="educators-h" className="relative isolate overflow-clip">
      <TextMotion rootId="educators" />
      {/* full width: --px already holds the 1440 content column (it grows by the cap on wider screens), so no max-width here */}
      <div className="edu__head w-full px-[var(--px)]">
        <SectionLabel>Faculty</SectionLabel>
        <h2 id="educators-h" className="h2 h2--sec rv" style={{ "--d": ".12s" } as CSSProperties}>
          {heading.lead} {heading.emphasis}
        </h2>
        <p className="intro rv" style={{ "--d": ".2s" } as CSSProperties}>{lead}</p>
      </div>
      <div className="mt-14">
        <div data-rise>
          <EducatorFlow educators={educators} />
        </div>
      </div>
    </section>
  );
}
