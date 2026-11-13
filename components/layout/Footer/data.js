// footer menu, refined (user 2026-11-11): 6 columns / 37 links -> 5 / 25. Online and classroom versions and the Hindi-medium variants
// are one entry each (the course pages cover both), "UPSC exam" and "Exam updates" are one column, and the column
// heading carries the context, so the links drop the repeated "UPSC" prefix.
export const FOOTER = [
  ['Vajiram & Ravi', ['About Us', 'Careers', 'Contact Us', 'FAQs']],
  // Courses and Test series merged into one column (user 2026-11-11: 4 link columns + news); test series are programmes too
  ['Courses & Test Series', ['GS Course 2027', '2 Year Course', 'Online Coaching', 'CSAT Course', 'Current Affairs Course', 'Prelims Test Series 2027', 'Mains Test Series 2027', 'Optional Test Series', 'Mentorship Program 2027', 'Interview Guidance Program']],
  ['UPSC exam', ['Syllabus & Exam Pattern', 'Optional Subjects List', 'Eligibility & Age Limit', 'Exam Calendar 2027', 'Admit Card & Answer Key', 'Cut Off & Results', 'IAS Salary']],
  ['Free resources', ['Current Affairs', 'Previous Year Papers', 'Books & Study Material', 'Model Answers for Mains 2026']]
];
export const SOCIAL = ['YouTube', 'Facebook', 'Instagram', 'Telegram'];   // footer social links (the WhatsApp chat-bubble icon, which read as SMS, was removed)

// links that stay on the page; every other footer link opens the institute's site
export const FOOTER_HREF = { 'About Us': '#story', 'Contact Us': '#contact', FAQs: '#faq' };
