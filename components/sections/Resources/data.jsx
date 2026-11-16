// Free resources (content from vajiram-ravi-sharon.vercel.app): the six cards, each with a small drawing of the resource
// (`mock`, one of ./ResourceMock.jsx's kinds), the word on its folder's index tab (`tab`) and its own action, and the "More free resources" links. Every link opens the
// Vajiram & Ravi site (./resource-links.js) until the resource pages exist.

export const RESOURCES = [
  { title: 'Current Affairs', desc: 'Prelims, Mains and Quest articles, written the way UPSC asks.', action: 'Read today’s articles', mock: 'paper', tab: 'Daily', image: { src: '/assets/img/resources/current-affairs.webp', w: 640, h: 410 } },
  { title: 'The Recitals', desc: 'UPSC current affairs monthly material, free to download.', action: 'Download this month', mock: 'magazine', tab: 'Monthly', image: { src: '/assets/img/resources/the-recitals.webp', w: 640, h: 520 } },
  { title: 'Previous Year Papers', desc: 'Prelims and Mains papers, with the UPSC answer key.', action: 'Browse papers', mock: 'papers', tab: 'Archive', image: { src: '/assets/img/resources/previous-year-papers.webp', w: 640, h: 595 } },
  { title: 'Infographics', desc: 'Topics made visual: one-page graphics for quick, clear recall.', action: 'View infographics', mock: 'poster', tab: 'Visual', image: { src: '/assets/img/resources/infographics.webp', w: 800, h: 580 } },
  { title: 'Kurukshetra Magazine', desc: 'The monthly journal on rural development, a staple for Mains and Essay.', action: 'Read the magazine', mock: 'kurukshetra', tab: 'Monthly', image: { src: '/assets/img/resources/kurukshetra.webp', w: 800, h: 666 } },
  { title: 'Prelims Quick Revision', desc: 'Crisp, topic-wise notes and facts for the final days before Prelims.', action: 'Start revising', mock: 'cards', tab: 'Revise', image: { src: '/assets/img/resources/quick-revision.webp', w: 800, h: 716 } },
];
