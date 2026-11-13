// Success stories: a quote per rank holder (by AIR) of the latest result. The quotes come from the Figma and are attributed
// to real rankers: confirm them with the rankers before launch.
import { top10 } from '@/components/sections/Toppers/data/rankers';

export const TESTIMONIALS = {
  1: '“The GS classes gave me a clear rhythm for Prelims and Mains. The test feedback showed me exactly what to improve each week.”',
  2: '“I needed consistency more than another resource. The current-affairs notes and regular tests kept my preparation focused.”',
  3: '“The interview guidance helped me speak with structure and confidence while still sounding like myself.”',
  // STAND-INS: ranks 4 to 9 below are placeholder wording, written around the programmes each ranker took in the results data.
  // They are NOT real quotes. Replace each with the ranker's own words (and get their approval) before launch.
  4: '“The mock interview boards felt close to the real one. I knew how to present my DAF by the day.”',
  5: '“The optional crash course gave my Sociology a clean, final revision before Mains.”',
  6: '“The Ethics module changed how I wrote case studies, and the interview sessions kept me steady.”',
  7: '“Interview guidance helped me organise my background and answer plainly.”',
  8: '“The mock interviews showed me what a panel notices. I corrected it before the day.”',
  9: '“I walked into the interview having rehearsed the hard questions, not just the easy ones.”'
};

// how each postcard lies on the table, repeating every four cards: [tilt in deg, vertical offset in px]
const LIE = [[-3.2, 12], [1.8, -14], [-1.5, 6], [2.6, -6]];

// the postcards, in track order: the latest top-ten rankers who have a quote (at most nine)
export const POSTCARDS = top10.filter(p => TESTIMONIALS[p.r]).slice(0, 9).map((p, i) => ({
  name: p.n,
  rank: p.r,
  year: p.y,
  photo: '/' + p.src,
  quote: TESTIMONIALS[p.r].replace(/^“|”$/g, ''),
  tilt: LIE[i % 4][0],
  lift: LIE[i % 4][1],
}));
