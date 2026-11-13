// Programme families for the batch tickets: every batch of a family wears its colour (ticket head, and the tag, which names the family). Colours come from the site's ticket palette plus one indigo.
export const BFAM = {
  gs:     { t: 'General Studies', c: '#C64613' },
  pre:    { t: 'Prelims',         c: '#B47A20' },
  ca:     { t: 'Current affairs', c: '#9D485B' },
  mains:  { t: 'Mains',           c: '#326F66' },
  mentor: { t: 'Mentorship',      c: '#3F5B87' }
};
// The first four are from the Figma (the year isn't given there; confirm before launch).
// The last four are STAND-INS: real programmes from the admission banners, but the start dates are placeholders. Replace them
// with the real batch dates before launch.
export const BATCHES = [
  { n: 'GS Comprehensive', fam: 'gs', full: '11-Month Prelims cum Mains General Studies Comprehensive Programme', d: '29 Jan', tgt: 'CSE 2027', what: 'The full GS syllabus for Prelims and Mains, in 11 months.', chip: 'Flagship', hi: true },
  { n: 'Prelims CAMP', fam: 'pre', full: 'Prelims CAMP, Batch 3', d: '3 Jan', tgt: 'CSE 2027', what: 'Prelims revision camp, batch 3.', chip: 'Limited seats' },
  { n: 'SMART Prelims', fam: 'ca', full: 'SMART Prelims Current Affairs Programme 2026', d: '17 Jan', tgt: 'CSE 2027', what: 'Current affairs for Prelims.' },
  { n: 'SMART', fam: 'ca', full: 'SMART Current Affairs Programme 2026', d: '17 Jan', tgt: 'CSE 2026', what: 'Current affairs for Prelims and Mains.', chip: 'Limited seats' },
  { n: 'GS 2-Year Fledgling', fam: 'gs', full: 'General Studies PCM 2-year Fledgling Programme 2028', d: '5 Feb', tgt: 'CSE 2028', what: 'The GS programme over two years, for college students.' },
  { n: 'PowerUp Prelims Tests', fam: 'pre', full: 'PowerUp Prelims Test Series 2027', d: '8 Feb', tgt: 'CSE 2027', what: 'Full-length Prelims tests with the reasoning behind every answer.' },
  { n: 'Sure Shot Mains', fam: 'mains', full: 'Sure Shot Mains Test Series 2027', d: '22 Feb', tgt: 'CSE 2027', what: 'Mains answer writing, evaluated, in English and Hindi.', chip: 'Limited seats' },
  { n: 'StepUp Mentorship', fam: 'mentor', full: 'StepUp Mentorship Programme 2027', d: '15 Jan', tgt: 'CSE 2027', what: 'A mentor keeps your plan on track, week by week.' }
];

// the start dates are for the 2027 attempt: confirm before launch
export const BYEAR = 2027;

// Admission banners (files in assets/img/banners) with the programme each one advertises
export const BANNERS = [
  ['Desktop_Size_GS_11_Months_Banner_16_f1fa678225', 'General Studies Prelims cum Mains Programme for UPSC 2027'],
  ['Desktop_Size_GS_2_year_2_508da0d9c9', 'General Studies PCM 2-year Fledgling Programme 2028'],
  ['Desktop_Size_Stepup_6_8b18a6bbf0', 'StepUp Mentorship Programme 2027'],
  ['Desktop_Size_Powerup_9_79a81c3370', 'PowerUp Prelims Test Series 2027'],
  ['SURE_SHOT_Desktop_Size_Sure_Shot_16_4d2c3b30ad', 'Sure Shot Mains Test Series 2027'],
  ['Desktop_Size_CSAT_Banner_5eca6e8ca4', 'CSAT course for UPSC 2027'],
  ['Desktop_Size_optional_Banner_19621e0d08', 'Optional Subject Programme for UPSC CSE 2027'],
  ['Desktop_Size_History_Optional_35fde8138a', 'History Optional Enrichment and Mentorship Programme 2027'],
  ['Desktop_Size_economics_module_5_ba1f0b5527', 'Economics Module 2027 for General Studies'],
  ['SMART_Web_banner_95ee4752b3', 'SMART Current Affairs Programme for UPSC Prelims and Mains 2027'],
  ['Desktop_Size_Scholership_test_Banner_2_eeb8fb48a8', 'Scholarship test for Sure Shot Mains Programme 2027'],
  ['Desktop_Size_sureshot_hindi_8_18ae1e3e5f', 'Sure Shot Mains Programme 2027, Hindi medium'],
  ['2911_575px_Desktop_be707365f9', 'Sure Shot Seniors Super 50'],
  ['Desktop_size_14_edd2ea9021', 'Top 10 out of 10 rankers in UPSC CSE 2025 from Vajiram & Ravi']
];
