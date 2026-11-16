// Free resources (content from vajiram-ravi-sharon.vercel.app): the six cards, each with a small drawing of the resource
// (`mock`, one of ./ResourceMock.jsx's kinds), the word on its folder's index tab (`tab`) and its own action, and the "More free resources" links. Every link opens the
// Vajiram & Ravi site (./resource-links.js) until the resource pages exist.

export const RESOURCES = [
  { title: 'Current Affairs', desc: 'Prelims, Mains and Quest articles, written the way UPSC asks.', action: 'Read today’s articles', mock: 'paper', tab: 'Daily' },
  { title: 'The Recitals', desc: 'UPSC current affairs monthly material, free to download.', action: 'Download this month', mock: 'magazine', tab: 'Monthly' },
  { title: 'Previous Year Papers', desc: 'Prelims and Mains papers, with the UPSC answer key.', action: 'Browse papers', mock: 'papers', tab: 'Archive' },
  { title: 'Infographics', desc: 'Topics made visual: one-page graphics for quick, clear recall.', action: 'View infographics', mock: 'poster', tab: 'Visual' },
  { title: 'Kurukshetra Magazine', desc: 'The monthly journal on rural development, a staple for Mains and Essay.', action: 'Read the magazine', mock: 'kurukshetra', tab: 'Monthly' },
  { title: 'Prelims Quick Revision', desc: 'Crisp, topic-wise notes and facts for the final days before Prelims.', action: 'Start revising', mock: 'cards', tab: 'Revise' },
];
