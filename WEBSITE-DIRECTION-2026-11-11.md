# Website Direction Session: 11 Nov 2026 (13:30 IST)

Meeting notes for the Vajiram & Ravi website, kept here as a reference for future work and the review workflow.
Source: "Vajiram & Ravi _ Website Direction Session - 2026_11_11 13_30 IST - Notes by Gemini.docx" (Gemini's auto-generated
notes; the original, with its six screenshots of the design directions, is next to this file as
`WEBSITE-DIRECTION-2026-11-11.docx`). Gemini's notes and transcript are machine-generated and may contain errors: check
the transcript before acting on a detail.

**Attendees:** Nijesh K U, Midhun M Nair, Rayboy Nunez, Blesson Babu, Paresh, Yogesh Purohit (Vajiram).

## For the build: what this meeting asks of the site

These are the meeting's points that bear on this codebase, collected from the notes below (not a status report):

- **Section order** agreed by Midhun: 1) banners and course-banner scroll, 2) courses, 3) toppers, 4) topper testimonials
  (Success stories), 5) faculty, 6) "Why choose us", then the rest. Compare with `app/page.jsx` before reordering.
- **Short page:** minimise total scroll length; no long run of 10 to 12 full sections.
- **Courses:** two rows on the homepage with a "View more" button to the all-courses page. Keep the book-opening shelf
  (management liked it); fall back to linking straight to the optional-courses page if it is not approved. Improve the
  text/background contrast on the books. List the 12 to 13 optional subjects directly (one click to each page).
- **Toppers:** about 10 shown, with a further listing or scroll; no duplicate rank-one listing on both sides of the
  screen; 15 to 20 images at most where a gallery is used, with a button for more.
- **Faculty:** cylinder-style carousel, with credentials worked into the imagery to avoid blank space.
- **Why choose us:** no zoom or scroll-triggered effects (professional look).
- **Trust layers:** toppers, then testimonials, then a social-media / office gallery of organic photos managed from
  the back end (a new section).
- **Performance and SEO:** heavy animation must not cost the Google PageSpeed score (target 90 to 95); check feasibility
  of each motion effect. SEO impact of the layout to be reviewed by Paresh and Yogesh.
- **Visual:** review font pairings and contrast for a premium look; cut redundant instructional copy.
- **Mobile first:** check every section on mobile before going further.
- **Workflow:** designs are agreed internally, then shown to Chindus and Arjun sir for final feedback; Paresh sends a
  top-to-bottom written brief reconciled with Rayboy's design links. LeadSquared: a sandbox trial for 2 to 3 days only,
  requested when integration starts (it is billed monthly).

## Summary

Homepage design directions were reviewed and combined with reduced scroll length and prioritized mobile views.

**Homepage Design Direction Review:** The team presented 3 homepage design directions to gather feedback. The first direction was entirely rejected due to poor color combinations.

**Restructuring and trust layers:** Participants agreed to mix positive elements from the remaining designs while significantly reducing scroll length. A 3 layered trust strategy incorporating toppers, testimonials, and an office gallery was established.

**Technical feasibility and navigation:** Concerns regarding heavy animations and website speed were raised. Development must prioritize mobile views first to ensure optimal rendering.

## Decisions

### Aligned

- **Limitation of homepage scroll length:** The homepage design must be compacted to minimize excessive scrolling and lengthy page structures.
- **Inclusion of social media gallery:** A dedicated section linking to organic social media and office visit photos of toppers will be included to build user trust.
- **Selection of cylinder-style faculty section:** The faculty section will utilize the cylinder-style presentation format rather than alternative layouts.
- **Establishment of homepage section chronology:** The homepage layout sequence was established starting with course banners, followed by courses, toppers, testimonials, faculty, and other sections.
- **Retaining book opening design as backup:** The team agreed to keep the current book opening design as a backup since it was already liked, but will link directly to the optional courses page if it is ultimately not approved.
- **Prioritizing mobile view development and review:** The team decided to prioritize developing and checking the mobile view of the landing page before proceeding further.
- **Establishing stakeholder review workflow:** The participants agreed that after finalizing the designs amongst themselves, they will present them to Chindus and Arjun sir for final feedback.
- **Requesting short-term LeadSquared sandbox trial:** The team decided to request a trial sandbox account for LeadSquared for a maximum duration of two to three days specifically when development and integration start.

### Shelved

- **Removal of first homepage design:** The first homepage design option was completely dropped from consideration following negative feedback.

## Next steps

- [Rayboy Nunez] Refine Homepage Design: Combine elements from the second and third design prototypes by integrating the banner into the second layout. Maintain a compact structure to minimize page length and scrolling requirements.
- [Rayboy Nunez] Conduct Feasibility Check: Evaluate proposed site animations and motion effects to ensure they do not negatively impact page load speed or performance.
- [Paresh, Yogesh Purohit] Discuss SEO: Evaluate the search engine optimization implications of the newly proposed design layout.
- [Rayboy Nunez] Integrate Social Media Gallery: Add a dedicated gallery section to the homepage that dynamically displays social media content and user interactions to establish trust.
- [Rayboy Nunez] Compact Course Section: Redesign the course listing area to display 2 rows with a view more button leading to the full courses page.
- [Rayboy Nunez] Optimize Trust Section: Remove problematic zoom and scroll-triggered animation effects from the Why Choose Vajiram section to enhance the professional appearance.
- [Rayboy Nunez] Explore Topper Layout: Develop options for displaying 10 toppers with an additional listing or scrollable functionality. Improve visibility while ensuring specific page space constraints are met.
- [Rayboy Nunez] Redesign Faculty Section: Blend text credibility into imagery to minimize blank space and reduce overall page scroll length.
- [Paresh] Draft Layout Writeup: Document the top to bottom structure for the website and reconcile it with design links provided by the team.
- [Rayboy Nunez] Share Design Links: Send the 3 relevant project links to Paresh and Yogesh for review.
- [Paresh] Request Sandbox Access: Email the LeadSquared provider to coordinate a trial period for sandbox access for integration testing.
- [Rayboy Nunez] Enhance Visual Design: Evaluate font combinations and contrast colors to improve visual focus and premium feel. Start development of the mobile view to ensure responsiveness across devices.

## Details

**Homepage Redirection Context and Objective:** Rayboy Nunez outlined the purpose of the call, explaining that the team would share different design directions for the homepage to gather feedback on likes and dislikes and converge on a single direction for creating all subsequent website pages (00:01:56).

**Overview of Homepage Direction One:** Rayboy Nunez presented the first homepage direction, which featured a landing hero carousel showcasing Vajiram toppers with their all-India ranks, an Indian-inspired aesthetic, featured courses for the 2027 attempts, credible institutional highlights spanning 50 years of experience, a student journey map, and upcoming batches emphasizing scarcity with limited seats (00:06:10) (00:12:43). Rayboy Nunez also demonstrated dedicated sections for free study materials, current affairs widgets, FAQs, and user-specific contact paths (00:14:01).

**Overview of Homepage Direction Two:** Rayboy Nunez introduced the second homepage direction, featuring a reveal brand section, a storytelling carousel, categorized bookshelf-style program layouts, a dedicated paper-structured topper section, "why choose Vajiram" value propositions, ticket-style upcoming batches, a callout for the general studies flagship program, subject specialist educator carousels, and student testimonials (00:17:54). Rayboy Nunez noted that mobile designs had not yet been fully structured (00:26:52).

**Overview of Homepage Direction Three:** Rayboy Nunez showcased the third homepage direction, which included a compacted hero carousel with a banner linking to Civil Services Examination 2025 results, a guidance section for every UPSC stage, a page-turning book-style course shelf, a stamp-inspired inquiry form, educator information, and postcard-style alumnus success stories (00:28:06) (00:31:13).

**Client Expectations and Performance Feedback:** Midhun M Nair addressed previous feedback discussions, clarifying that critiques were not personal but driven by high client expectations because Vajiram is a leading institute in UPSC training. Midhun M Nair emphasized that as client expectations and industry standards evolve, the design must deliver a "wow factor" and industry-wide recognition rather than a standard output (00:38:36).

**Evaluation and Rejection of Homepage Direction One:** Midhun M Nair completely rejected the first design direction, stating dissatisfaction with its color combinations and overall elements, and instructed that it be removed from current consideration (00:40:25).

**Restructuring and Scroll Length Reduction Strategy:** Midhun M Nair evaluated the second and third designs positively, instructing the team to mix and match elements while significantly reducing scroll length to prevent users from scrolling excessively through ten to twelve sections (00:41:11) (00:43:09). Midhun M Nair stressed that the homepage must immediately display new announcements, toppers, and primary courses such as General Studies—costing around two lakh rupees—which serves as the institute's backbone (00:42:12).

**Course Shelf Refinement and Two-Row Display:** Rayboy Nunez and Midhun M Nair reviewed the course shelf representation, agreeing to limit course display rows to two rows on the homepage and include a "view more" button directing users to the all courses page (00:44:01).

**Establishing Trust Layers Through Toppers, Testimonials, and Office Gallery:** Midhun M Nair outlined a three-layered trust-building strategy for the homepage, starting with topper displays, followed by testimonials, and incorporating an office gallery featuring organic photos and media uploaded from the back end to prove authenticity to prospective students (00:46:49).

**Technical Feasibility and Website Speed Concerns:** Paresh raised concerns regarding whether heavy animations and motion effects would hinder achieving optimal Google website speed scores of 90 to 95, prompting Rayboy Nunez to acknowledge that technical feasibility checks and motion controls are necessary (00:49:35) (00:56:59).

**Final Agreed Section Chronology for the Homepage:** Midhun M Nair established the finalized chronological order of sections for the revised homepage: 1) banners and course banner scrolls, 2) courses section, 3) topper section, 4) topper testimonials, 5) faculty section, and 6) "why choose us" value propositions, with Yogesh Purohit managing additional content spacing (00:51:31).

**Content Clarity and Duplicate Listing Feedback:** Yogesh Purohit raised usability concerns regarding the topper section, noting that repeating rank-one listings on both sides of the screen could distract or confuse aspirants, and suggested showing landing page images instead (00:58:20).

**Landing Page Toppers Section Design:** Yogesh Purohit raised a problem regarding the landing page image, suggesting in their suggestion that displaying twenty to thirty toppers was unnecessary and proposing to reduce the count to fifteen or twenty toppers while adding a button below for users wanting to view more. Paresh responded that this image was merely a backup option and requested that better section options be reviewed first, prompting Rayboy Nunez to display alternative second and third options on their screen (00:59:30).

**Optional Courses Page Navigation and Click Limitations:** Paresh suggested listing twelve to thirteen optional courses directly like an index on the optional subject program page to improve usability. Yogesh Purohit raised concerns in their discussion about extra click limitations in the current design, explaining that users had to navigate through multiple steps—such as clicking a section, viewing a book-type display, and scrolling—before reaching the target page (01:00:40). Yogesh Purohit advocated through their proposal for a single-click approach that would direct users straight to mackerel-style optional pages lists, matching the existing website structure (01:02:03).

**Optional Courses Design Retention and Contrast Colors:** Paresh noted that management already favored the existing book-opening design, and decided in their assessment that they should retain it as is, with the caveat that it could be directly linked to the target page later if management changed their mind. Additionally, Paresh observed through their analysis that the color combination lacked contrast, making text visibility difficult, and suggested exploring contrast color combinations for both the background and text on the book to improve user focus (01:03:09). Rayboy Nunez confirmed their understanding of discussing the text on the book and background combination (01:04:10).

**Text Minimization and Font Selection:** Paresh proposed minimizing redundant information on the interface, specifically suggesting in their review the removal of unnecessary instructional text such as checking upcoming start dates, learning options, and program details if not required. Paresh also recommended evaluating the contrast visibility of the section titled "the journey of our toppers and Arab in their own words" and requested through their feedback that font combinations be reviewed to create a more premium look (01:05:11).

**Mobile View Prioritization and Requirements Write-up:** Paresh emphasized the importance of mobile feasibility, instructing in their statement that development should focus on the mobile view first since certain designs do not render well on mobile devices. Following this, Rayboy Nunez requested that Paresh provide a written summary detailing their thoughts on the specific sections and ideas discussed from top to bottom, using the links shared by Rayboy Nunez (01:06:34).

**Review Process and Stakeholder Feedback Workflow:** Paresh stated that after reviewing the shared links and meeting minutes alongside Yogesh Purohit and management, they would present the options to the chindus and Arjun sir for final feedback before providing their definitive requirements to Rayboy Nunez (01:07:31).

**LeadSquared Sandbox Access and Trial Period:** Towards the end of the meeting, Blesson Babu inquired about the status of the LeadSquared sandbox access request (01:08:22). Paresh explained in their response that sandbox access incurs a significant monthly cost, requiring precise timing to utilize a trial period efficiently. Blesson Babu clarified that their team would need the sandbox account for a maximum of two to three days once development starts in order to integrate it directly with the development stage and test it. Paresh agreed to coordinate with the tech team to arrange the trial period when their availability permits (01:09:13).

## Transcript

#### 00:00:50

Blesson Babu: Hello.  
Yogesh Purohit: Hello.  
Blesson Babu: Yeah. Hi. Good afternoon, Yogesh.  
Yogesh Purohit: Hi. Good afternoon.  
Blesson Babu: Yeah. Okay. Okay. I think uh team members will Yeah.  
Yogesh Purohit: All good.  
Blesson Babu: Yes. Yeah.  
Yogesh Purohit: Midhun sir.  
Blesson Babu: I think they Okay.  
Yogesh Purohit: Midhun sir will be joining in a while like in one or two minute. We have to just wait for both of them.  
Blesson Babu: Yeah.  
Yogesh Purohit: Midhun sir and Paresh sir.  
Blesson Babu: Yeah.  
Yogesh Purohit: Anybody else is also joining from your end?  
Blesson Babu: Yeah. Yes, is also joined. He'll be presenting that this he joined.  
Yogesh Purohit: Okay. Okay. Okay. Just give me a second. Let me just ask.  
Blesson Babu: Okay, sure.  
Yogesh Purohit: Yeah, he needs 5 minutes. I just texted him. He's in a meeting right now.  
Blesson Babu: Okay, sure. We can make  
Rayboy Nunez: Hey Yogesh. Hey B.  
Blesson Babu: Yeah. Hi.  

#### 00:01:56

Yogesh Purohit: Hi boy, how doing?  
Rayboy Nunez: Good. Good. Are you  
Yogesh Purohit: All good. All good. This end also. Thank you.  
Paresh: Hi, good afternoon everyone. Sir is joining in just two minutes.  
Blesson Babu: Yeah. Okay.  
Paresh: Uh we can start the meeting like sir will join in 5 minutes. Okay.  
Rayboy Nunez: Uh yeah, we should not wait for him. Just get started. Yeah.  
Paresh: Yeah sir also join.  
Rayboy Nunez: Okay. Hi Midhun. Hi Paresh.  
Paresh: I heard Yes.  
Rayboy Nunez: Uh then shall we start? So I will give you a context up front.  
Paresh: Yes. Yes.  
Rayboy Nunez: uh for today's call what we will be doing is we will be sharing different directions that we done for the homepage. Um so can so the idea is to you know uh look into this direction and see what all that you you know like and dislike and you know come to a final homepage direction from that direction we will you know start to create all the pages for the website.  

#### 00:06:10

Rayboy Nunez: So that's a basic idea.  
Midhun M Nair: Okay.  
Rayboy Nunez: Uh so I will just get started now.  
Midhun M Nair: Okay.  
Rayboy Nunez: So I will start with the first direction that we did.  
Midhun M Nair: Okay.  
Rayboy Nunez: Let me my screen. Yeah, you can see the screen, right?  
Midhun M Nair: Yes. Yes.  
Rayboy Nunez: Yeah. So, this is a direction one. So here uh this is a landing hero. Uh this is a kerosal based of landing hero but it is like not normal kerosel.  
Midhun M Nair: Oops.  
Rayboy Nunez: So the kosal is mainly subjected to uh the passed out of the toppers uh from the Vajiram. So we will have the portraits of this toppers as lake arousal that keeps on rolling uh with their uh all India rank and you know for which course or program they did uh with some points how Vajiram helped them you know uh get uh that rank things like that. So my mentor never give up on me or myself writing answer every week that changes everything.  

#### 00:07:27

Rayboy Nunez: So this is all going to be like a uh part of like a carousel thing. So it it uh so this is the basic idea of the uh landing area. So for all these three exploration what we have done is we want to give that Indian uh class of uh you know feeling to every website uh you know on this direction. So that's the main idea behind this thing and on the left side you can see the primary CTA to you know get consultation explore programs and hit surfaces you know uh the main heading. So all the content right now on this websites are being curated by you know us. So it requires your thorough you know inputs as well to refine the content and etc. So this can be seen as like a placeholder we can change and you know uh improve. Okay moving down uh the next section is like your 2027 attempts begin this year. So this will basically going to surface the most featured courses in watch. Uh so ideally it will have this kind of beautiful animation uh which layer the all the different you know uh programs under Vajiram which uh they can you know um click and open and see uh much more details of that program and they can get into the course through the course finder that we going to you know uh get ready right so that's a basic idea of this section so it will surface like you know right now uh eight different uh featured programs so that we  

#### 00:09:03

Rayboy Nunez: want to you know um balance it out on the homepage itself. So moving down uh we have the most credible uh elements of Vajiram with with 50 plus years of experience uh you know 10 out of 10 top rangers are from Vajir courses all that pointers will be uh closely mapped to the courses so that people have that you know uh connection between codes and its value together uh managed and the next section uh we will move to where Vajiram stands out as like a coaching institute. So with different value proposition points uh you know uh we are focusing on the first is proven record then you know your faculty then personalized learning then resources right uh similarly it it autoan animates to different slides in a focused kind of interaction um so that's the idea of the section that speaks why jam stands out here and moving down uh we can see that there's a different section here that's been introduced from first call to the interview board. So through for the year's journey uh we are you know always with with uh their journey not alone.  

#### 00:10:24

Rayboy Nunez: So uh as Vajiram they will stood Vajaram will will stand with the students of Vajir through the entire journey that's the basic idea that we want to try to communicate through this section. So it starts with starts with the counseling and end with the mains exam and interview. So all these different areas um you know Vajiram will be there with the students that the main main idea they're trying to communicate here. So each will lead to appropriate pages if we are planning to have the pages. So this is also like a placeholder idea the content structure all the things can be improved but this is a highle information architecture idea that we want to present. Uh moving down uh again we are going to surface all the programs of Vajiram so that they can get into the course master page and from there they can explore and find the detailed courses. So we are listing down all the you know programs under Vajiram for anybody to get into it and we have this section that's you know aligns with Waji branding and you know emotion and that Indian uh elements and nature of it.  

#### 00:11:32

Rayboy Nunez: Um and again moving down uh we will have the uh 2026 toppers of Vajiram Ram and Devi. So so this is mainly only showing the recent uh toppers. So, so that you know we are just positioning the homepage to have only the recent topos and if they want to see the more topos we will dedicate that space to um you know uh to page specifically so that they can explore Throughout the years all the you know uh topos at Vajiram uh likewise uh we just maintain much more control on the homepage to what to see and what not to see. Um and this is also you know a a a pan panning carousel uh that moves from right to left also uh you we have a control in place uh to move between if there are like more than 550 toppers from vajar amount single layer right so you can go between uh this uh tab to get into that list so it will pan and you know that kind of interaction so I know it's not fully done but uh what I want to give you like a idea you know how that could look like.  

#### 00:12:43

Rayboy Nunez: So all these images need to be you know get uh ready and but this is the overall idea uh what we are trying to do on topos of and below like uh we have some you know closely related section to tell us why this uh you know topos or aspirant trust was right. So we can have a space dedicated for that area to empower that credibility through you know their words of collective words of toppers. Um so this the space can be utilized for us. The content is like you know placeholder but uh this is overall idea that we want to communicate through the section and below uh there is next batches upcoming next batches. So we can see all the upcoming batches like the flagship GS prime comes means it's like our flagship thing and rest of the thing we have it as like a card with the important information surface up front and if we have like you know if you want to build the idea of scarcity maybe limited seats would be a good idea. So that's why we brought in those kind of elements to this card to actually you know give a sense for the people who are trying to you know get an understanding from the site actually.  

#### 00:14:01

Rayboy Nunez: So if there is more card they can you know uh move between them using the kosal idea and you can see you know the button also have some uh fluid magnetic interaction where it will let you you know click and explore to that. And uh moving down we have a dedicated place for free study material offers for the public you know IAS uh aspirant people. So so that it can be like all in one place to find all your you know free study material. So right now there are like five and uh the more things are right now positioned into the header but the most important ones are like you know uh planned into the homepage and we can decide which one to plan and not plan maybe how to show more or you know less that can be done. Uh but this is overall idea. So if you hover on each thing, you can get into papers, you can get into the magazine for Specifically for current affairs we have given a different treatment where you know some of the main uh newses from current affairs will be surfaced as like a widget inside that card itself so that they won't miss the news uh uh you know by just having a card itself there.  

#### 00:15:16

Rayboy Nunez: So that's a basic idea here. So it clicks and it leads to that particular you know blog or article page and below uh we have uh coming to end of the homepage with the FAQs and some strips running over you know uh communicating uh different uh courses admission opens and stuff like that. Um yeah and towards the end okay yeah yeah towards the end India will need you to begin today and they have different points to uh contact you reach out you know visit so we through our you know iterative you know uh internal exercise what we found found out to be interesting is that you know there are different paths to you know get in touch to a through counseling call through you contact by visiting um you know actual institute. So this varies from you know different types of people. If it's a parent they probably want to get on a call and you know through WhatsApp and visit the facility then decide whether should should we let our you know child um join wajiram. So if it's a child who who are trying to self-discover institute then they probably can to you know chat in WhatsApp and get counseledled and things like that.  

#### 00:16:36

Rayboy Nunez: So by end uh this is like the end footer area of the site and uh we have a footer. Yeah. So footer still uh the work is still in progress but early version of a footer here. And uh I also missed to show one thing. Uh if I move to the top section uh we have this uh running yeah we have this uh running thing which I can actually you know click into and you know get into that particular program and it um you know get them into necessary uh detail page for that. Yeah. And similarly uh we have the programs uh header with all the programs inside it. Similarly for free free materials also we are all all showing all the different resources have for the IAS UPS aspirants and for UPS exam these are the different entry point that we find from the existing site. So we try to put it here we can decide what to keep and how to keep this organized. Uh but yeah so this is the first uh direction that we took in terms of site.  

#### 00:17:54

Rayboy Nunez: Yeah. Uh do you have anything or should I move to the next next direction?  
Midhun M Nair: Okay. Okay.  
Rayboy Nunez: Okay. Uh let me uh go to a second direction. Okay. You can again see the second version what I'm trying to show. So we have like a reveal uh kind of section uh that let's speak of the brand and then then get into the website and here this is much more like a uh very scene kind of you know landing area with different slides and images and it through the slides we are actually telling a story uh with setting up you know um the first one maybe I will go to the first one yeah uh talking about the legacy of wajir from preparing students and then getting into means how uh we teach and interview how we help prepare interview and how this will be on the final list. So that's the basic idea we're trying to communicate through kosel and this with this kosel we will have flexibility to add as many as you want in terms of how you want to do it.  

#### 00:19:16

Rayboy Nunez: So this can be treated as like a placeholder now and you know the you can think about the possibility of scaling it uh to any extent. So that's a basic idea of the section and for each uh you know slides we will have different CTS and content. So that's idea and moving down uh yeah so the next section like we starts with the program because from the last call we understood that you know program is more important than showing topos. So that we surfaced majority on all the direction the programs. So here uh we try to stick with um idea that uh you guys surfaced us through the cloud link uh in terms of program and program is categorized into different groups and under this group we'll have this shelf kind of a idea where they can you know open a single course and it will lead them directly to that course master page or course detail page upon you know clicking. So each will have like a book kind of feeling. So that's a basic idea that we are trying to build on our most of the you know directions.  

#### 00:20:22

Rayboy Nunez: So uh yeah and moving down uh next is next is where we try to actually position uh you know the toppers of Vajiram. So the copy has to be slightly adjusted but this is the overall idea. So they will have this section dedicated to you know showing toppers and they brief about the toppers and explore as many as toppers we want to so that we can you know uh get into all the toppers. If there is like a huge number of you know people uh as to stop then uh particular uh concern. How do we show more to right? So we thought we could actually streamline one of your idea and improve it to extent that will help them adapt this scenario um which will help them go into as many as you know toppers that we want to be so that they can explore you know toppers and their brief and how help. So it act as not just like you know showcasing toppers but will it gives a position for us to actually you know spread some uh ideas behind this toppers maybe their words maybe their uh teaching staff words about them and stuff like that can be utilized through space and you can see that we tried to imitate like a paper kind of structure here to you know indicate this top list through this section and now moving down once Once we convince you know the idea of toppers and the courses under Vajiram  

#### 00:21:55

Rayboy Nunez: then we we have a question in mind of a probable visitor to you know why choose Vajiram right so we we we just start with there and it have a dedicated section with you know beautiful intro that uh leads them to the main points why people should focus your rum number one is like proven track of the quotes and with uh yeah and the next one is like you know the faculty and the next one is like the personal guidance and the complete free study material open opensourced for them and prime location in Delhi and then you know uh personalized learning or the most suitable way of getting learn IAS and that's that basically conveys uh why they should choose Vajiram uh to do IAS right training And below we have the next uh batches starting soon section that is dedicated to you know have a similar one that you've seen but here we have introduce more interaction to this card. So this is more like a ticket you know that they can get into watch kind of idea. So that's the basic idea behind the section and we will surface uh many uh you know two rows of upcoming courses if possible we have more we will uh we can accommodate that through you know different interaction.  

#### 00:23:20

Rayboy Nunez: Uh so right now it suffers for eight and moving down uh now the next dedicated space for our flagship program called general studies which decides most of the UPS score. So we have this section to you know highlight the primarily the general studies course what Vajiram offers. So this is like that course uh they can explore and go into the course that's the idea. So this is a you know call out section for general studies. Yeah. Moving down um you know thought by subject specialist. So this is a place where uh we try to introduce this section uh you know uh just to tell to the visitor that you how um who are the people teaching uh you know the students at Vajiram. So we want to have a dedicated space for them to actually understand by the students and the parents. So this is the area for that and this will be like karus. Yeah. And moving down uh we have a you know hear it from our students kind of success story that who got you know ranks from uh IAS.  

#### 00:24:26

Rayboy Nunez: So this is like a testimonial note uh kind of idea when you hover you can see the note and it will keeps running through left and right in a you know continuous manner. Uh so that's the idea behind this particular section. And moving down uh we have the you know talk to us form uh that's given that Indian uh heritage and touch and that feel uh through this form. So this is not like a you know common form that you see. So they can see like you know hi I am your full name and I'm preparing for which program. So they can select from the different programs Vajiram offers provide their phone number and preferred time slot and email us to this particular emails and this will get you the lead that you require to you know initiate your first step of contact. Um and moving down uh we have again the free resources sections are first year as like a all in one place. So uh they can get into you know each important resources but additionally what we try to here is like you know surface all the different other resources that they can get into as different cards which um you know prioritize differently on this free resources section.  

#### 00:25:43

Rayboy Nunez: Uh and moving down uh we have the contact section for Vajiram with a you know gallery on the left and right side the contact information with from starting from location contact phone number and email. Uh and moving down um to the end we have the FAQ section to you know address common questions and we have the fut section that again reposition what you know this is a place you want to be if you want to be on all India rank and you know for and etc. So uh this will initiate them to find courses or get on to you know uh counseling that are like uh two primary key uh you know CTAs that we want to focus on and at the end we have a few footer and footer we have done something different here which means usually the footer will be always linked. So we try to bring you know latest current affairs news into the footer so that you know those who usually visit footers. The footer have this history called as like you know uh keeping news inside the footer.  

#### 00:26:52

Rayboy Nunez: So eventually in the modern design it all changed to newsletter kind of idea. Now we try to bring back that idea of news back into the footer through this direction. Yeah. Yeah.  
Midhun M Nair: Okay, can you show the mobile display of this?  
Rayboy Nunez: Uh yeah. So right now the mobile design we haven't really put together you know uh very meticulously but it have done something but definitely it will have some issue but uh the idea is behind this session is to actually give you the glimpse of different direction and you know find your likes and dislikes and converge to a single direction.  
Midhun M Nair: Okay.  
Rayboy Nunez: So uh yeah but you know once we agree on this thing and then we can have like you know the uh you know more like how how it going to look on mobile and you know uh  
Midhun M Nair: Thank you.  
Rayboy Nunez: web but if if you right now if you get into you know uh mobile it will not be broken but some section read some adjustment right so which means how it should be and you know etc. So mostly it will be okay but we have been put our hands into the mobile business.  

#### 00:28:06

Midhun M Nair: Okay. Okay. Can you go to the top again? Top.  
Rayboy Nunez: Yeah.  
Midhun M Nair: chicken. Okay, we'll come to this this side. What is the next one?  
Rayboy Nunez: Yeah, I we have one more idea. So maybe I will get to that.  
Midhun M Nair: Okay.  
Rayboy Nunez: Yeah. So this is the next uh option. Uh so here um you know uh we still try to imitate uh the brand and everything with more you know uh compacted homepage with a carousel kind of idea where where in which we try to position different toppers of waji in the hero itself with some content specific to your left that you can see you know there is a hero text and body with two importance area but on the top you can see like a banner running there which will actually take them to the you know topmost list uh result page for CSC 2025 results. So that's a basic idea. So they have like different points uh hero itself and on up front we are just communicating all uh 50 plus years of reading uh you know surv and top 10 of 10 book things like and  

#### 00:29:53

Midhun M Nair: Uh your voice is breaking.  
Rayboy Nunez: yeah.  
Midhun M Nair: Moes.  
Rayboy Nunez: So coverboard Still uh still  
Midhun M Nair: voice is breaking. Yeah, now it's a still Yeah,  
Rayboy Nunez: okay. Yeah.  
Midhun M Nair: it's breaking.  
Rayboy Nunez: It's beginning and  
Midhun M Nair: No, no, it's breaking it.  
Yogesh Purohit: Sir, is it my internet connection or you are also getting noise in the voice?  
Rayboy Nunez: uh I clearly uh but I don't know whether it's mine or not. system.  
Midhun M Nair: Yogesh.  
Yogesh Purohit: Sir,  
Midhun M Nair: What about you?  
Yogesh Purohit: sir, am I audible to you?  
Midhun M Nair: Yes. Yes. Yes.  
Blesson Babu: Yeah,  
Midhun M Nair: Huh?  
Yogesh Purohit: So,  
Blesson Babu: actually it's from the website.  
Yogesh Purohit: okay. Okay. I thought my internet is working very slow.  
Blesson Babu: Yeah, maybe he will do it soon. I think  
Rayboy Nunez: Hi, am I audible enough? Is it breaking still?  
Midhun M Nair: Yeah, now it's better.  
Rayboy Nunez: Yeah. Okay.  

#### 00:31:13

Rayboy Nunez: Okay. Let me continue sharing. Give me a sec. Yeah. So this is the third option. So uh this is the landing area. We try to you know communicate a lot of information through different hierarchies and you can see there is uh yeah ripple effect on the CTAs and stuff like that. And moving down uh we have a new dedicated section that's been introduced as part of our internal you know review and process. Uh so this is like guidance at every step of UPSC. So we have like clear communication established for all different journeys of IAS you know uh journey prelims means an interview and how wajam will support in each this journey as a coaching institute. So that's a basic idea that we are trying to communicate through this section. So that's a addition to the existing IIA and it will all leads to you know different content for different three points and moving down um we have the next section to communicate the brand institute and why it's different from other institute so we start with you know the proven track record facility and personalized learning so all this different point can be seen as like keros with India uh as like primary theme on the background.  

#### 00:32:47

Rayboy Nunez: Okay. And moving down uh we have a program space dedicated uh where we start with you know our primary flagship program called general studies. Believe. and means program which help them get into the program details with all the different courses under it. Um and we have a you know um a kind of like you know admission starts on this date. Uh those elements of details are being uh encompassed into this particular um you know element on UI. uh below uh we will uh you know focus more on the all the different courses what Vajiram offers as like you know uh again a shelf like of idea. So team have a very good opinion on like how we presented you know internally uh the shelf idea for each courses and its different grouping. So we can decide uh you know what to show and how what are the you know different groups that we require. But this is a like a overall idea that we are trying to communicate here. So if you click this particular you know uh course we will have this uh different approach here.  

#### 00:34:00

Rayboy Nunez: Instead of like one page we will have you know uh a you a pagenated kind of you know book where it will leads to different courses from the homepage itself. So that's the idea try to communicate through the section and if we have like you know fewer courses we will only show one shelf. So that's another kind of interaction that we brought in and uh we have a dedicated CTA to you know position if they are still unsure and confused by different courses what Vajiram offers and they can start you know getting the counseling and you know work work with that and conclude to any program they want to. And moving down uh now we have the upcoming bachelor's information here uh we have positioned general studies prelims and means as like the most important uh upcoming courses for the public and rest of the things are being you know managed as like a lower hierarchical um you know cuts similar ticket with limited seats and all that area uh retained. Uh now moving down uh we have uh this uh form section uh to get into fill the information.  

#### 00:35:18

Rayboy Nunez: Uh we tried to you know get inspiration from the you know stamp and everything to give that Indian nature of uh field for the website through the branding. Yeah. And moving down uh again we have the section for specifically for educators. So they can see you know more information of educators than other ideas. So that what they teach us.  
Midhun M Nair: Yes. So right keep keep this element keep this noted maybe we will use  
Rayboy Nunez: Yeah. Yeah.  
Midhun M Nair: it may but be okay overall will give but just keep  
Rayboy Nunez: Yeah.  
Midhun M Nair: it Yeah.  
Rayboy Nunez: Yeah. Uh uh you mean the educator section?  
Midhun M Nair: Yes. Yes. Yes. Huh.  
Rayboy Nunez: Okay. Okay. Cool. So this is like a panning uh you know uh cylinder kind of you know kosal. So they can you know uh get into the information of each and what amount of information we can decide. And now we have you know the topos and alumni words uh that been gone through watch.  

#### 00:36:27

Rayboy Nunez: So you can see this is like a postcard of design with their rank if they got ranked through a Vajiram we can show that and all the information which courses which program and their words uh as like kosal so they can see as many as they want. So that's a basic idea behind this section. And moving down uh we again have a you know a section dedicated to point out the current affairs. So this is kind of like a newspaper from Vajiram & Ravi with strengthening you know your UPC preparation. This is the free resources of current affairs. So all the different all the different users comes in as you know you eventually update from the back end. So that's the idea behind this and for other resources they can get into other resources through this section. And moving down we have the FAQs as you seen for all um the directions. So but here it have like the stamp and you know colors are all slightly different approach that we took. Moving down uh coming to the last section where you can find us.  

#### 00:37:34

Rayboy Nunez: So you have a you know a gallery on your right and you know contact information on your left with map and everything. And moving down we have come to end of Vajiram section. So ready to begin your preparation with Vajiram. start exploring programs or you know speak to a counselor to you know get get understanding of the program and enrolled and with that come to the end of the photo. So we have a photo for Vajiram. Yeah. Yeah. So uh yeah I think these are the three exploration we want to share today. So  
Midhun M Nair: Okay. So overall Rayboy uh there has been good improvement from what has been uh produced before. So actually that day n also told like say you people felt very bad when you got the feedback. So nothing don't take anything personally. Okay. So because the overall the thing is like I say when we are giving to a big company like you. So our expectations are also very high.  

#### 00:38:36

Midhun M Nair: Okay. So now the time is also changing. Even when I discuss with Don also the thing is like a client expectation keep on increasing  
Rayboy Nunez: H. Yeah.  
Midhun M Nair: because say now many of the things which you guys were doing say at that time say we can tell the clients also it take two months 6 months and not so now the clients also evolving say we are also getting more expertise in a all these kind of So going forward for you  
Rayboy Nunez: Hm.  
Midhun M Nair: also that level of evolvement has to happen right otherwise things won't be like how things are working five years before right so whenever we produce something so we are expecting something uh like you know that wow factor that level something you will come up with okay so that was the reason uh say that day if it was more criticizing or that level if it has come Okay.  
Rayboy Nunez: No. Yeah. No worries.  
Midhun M Nair: Yeah.  
Rayboy Nunez: So we understood the concern.  
Midhun M Nair: Okay.  

#### 00:39:31

Rayboy Nunez: So you wanted something different.  
Midhun M Nair: Yeah.  
Rayboy Nunez: So that this is a p your miscommunication or expectation mismatch. So that's why we took back the about our internal team and you know get back to this kind of  
Midhun M Nair: Yeah. Okay.  
Rayboy Nunez: direction approach so that we can set single.  
Midhun M Nair: Okay. Yeah.  
Rayboy Nunez: Yep.  
Midhun M Nair: Because because our expectation because we are uh when it comes to UPC we are number one uh leader in  
Rayboy Nunez: Yeah.  
Midhun M Nair: that. Okay.  
Rayboy Nunez: Yeah.  
Midhun M Nair: So when we all together change the website and come up with something. So industry shall speak about it rather than say I'm not telling the design is bad design is good design is  
Rayboy Nunez: It's  
Midhun M Nair: decent but it was not something say people will talk about okay say see like how Vajiram website has changed and look at ours understood so that level of recognition we are expecting once we do but overall the thing is like maybe uh because of communication or anyway uh so that was not intended if you felt it in that way  

#### 00:40:25

Rayboy Nunez: And uh yeah,  
Midhun M Nair: Okay.  
Rayboy Nunez: no worries at all.  
Midhun M Nair: Okay.  
Rayboy Nunez: Yeah,  
Midhun M Nair: Yeah.  
Rayboy Nunez: good.  
Midhun M Nair: So anyway the first design see I see I am as a person I leave it alone face. Okay.  
Rayboy Nunez: Yeah, sure. Please,  
Midhun M Nair: So so first design first design I didn't like it at all.  
Rayboy Nunez: please go.  
Midhun M Nair: Not even any elements.  
Rayboy Nunez: Oh,  
Midhun M Nair: Okay. The color combination all these things. So let's remove the first from our uh current thing. Okay.  
Rayboy Nunez: okay.  
Midhun M Nair: Uh I don't think anything which we can take it up.  
Rayboy Nunez: Sure.  
Midhun M Nair: So second is good. Okay. But once we work on it, uh I think we can make it better.  
Rayboy Nunez: Sure. Sure.  
Midhun M Nair: But uh one thing say someone comes to Vajiram website. So primary that is scrolling bers are there. No that may be something we have to incorporate.  

#### 00:41:11

Midhun M Nair: So we need to see like how we can adjust that. So in the first design of our last meeting so you have incorporated that was with this uh curved uh banners were there.  
Rayboy Nunez: Yeah. Yes.  
Midhun M Nair: So we need to see how that kind of thing in a better way can be incorporated to to the secondary side. Got it.  
Rayboy Nunez: Yeah.  
Midhun M Nair: Now can you simultaneously open the second and third because some elements of the third is good some elements of the second is good.  
Rayboy Nunez: Yeah.  
Midhun M Nair: So maybe we mix and match from both of them and with some of our requirement I think we would be able to arrive at uh a good one like the world class level which we are  
Rayboy Nunez: Yeah.  
Midhun M Nair: setting.  
Rayboy Nunez: Yes.  
Midhun M Nair: Okay.  
Rayboy Nunez: Understood.  
Midhun M Nair: So uh this scroller uh is good but we need to see like how we can blend it with the uh second design  
Rayboy Nunez: Second. Yeah.  
Midhun M Nair: right because the thing sometimes people directly comes they want to immediately get to know what is a new announcement or what has happened.  

#### 00:42:12

Midhun M Nair: So one can be the topper what is our topper but rest all the attention we shall give to the courses section.  
Rayboy Nunez: Close.  
Midhun M Nair: The courses we cannot keep much scrolling because someone directly came they immediately see what has launched when it is starting. So that information directly we need to give to them right.  
Rayboy Nunez: Understood.  
Midhun M Nair: So the first can be about the topper then the toppers also maybe as much as possible we would be able to show it on the first crawler right then the next thing is like  
Rayboy Nunez: Mhm.  
Midhun M Nair: uh say our mainly people are coming and searching for our main GS which cost around two lakh okay so that is our main backbone or that is where people are coming and searching for that so next the two sliders we would like to give that information okay okay so  
Rayboy Nunez: That information.  
Midhun M Nair: maybe the slide later the design which you are showing in the current one. Uh see like how we can incorporate into the second one. Now can you open the second also simultaneously?  

#### 00:43:09

Midhun M Nair: This is the second. Okay. So here uh overall another one suggestion we need to uh limit the scroll. Okay.  
Rayboy Nunez: Hey  
Midhun M Nair: We need we don't want make people to scroll a lot say 10 times 12 times to get all the information.  
Rayboy Nunez: Okay.  
Midhun M Nair: So we need to put as a thing like how we can skuse the design little bit. Now the scroller itself if you see maybe then one this is one full screen how much space it occupies once someone opens the website full screen now.  
Rayboy Nunez: Yeah, this part of it takes full screen, but the other one doesn't take full screen. It tried to accommodate more information through this thing.  
Midhun M Nair: Yes. Yes.  
Rayboy Nunez: So  
Midhun M Nair: Yes. So that idea you keep overall in mind. We don't want scroll much.  
Rayboy Nunez: yeah,  
Midhun M Nair: Okay.  
Rayboy Nunez: no no amount of lengthy page is basically what you needed, right?  
Midhun M Nair: Yes.  

#### 00:44:01

Midhun M Nair: Yes. Yes.  
Rayboy Nunez: So a well intended homepage with necessary scroll is only required,  
Midhun M Nair: Yes.  
Rayboy Nunez: right?  
Midhun M Nair: Yes.  
Rayboy Nunez: Okay.  
Midhun M Nair: Yes. Yes. Right. Okay. So in this you try to incorporate this scroller uh scroller this banner to the second. Okay. Now let's uh scroll down. Now but when it comes to this the how we highlighted the 50 years of experience all these things are not that uh great.  
Rayboy Nunez: Okay.  
Midhun M Nair: So maybe sec uh second reason can open  
Rayboy Nunez: Yeah.  
Midhun M Nair: let's see yeah this would be better now the second spot.  
Paresh: Yes, sir. Yes, sir. Yeah.  
Midhun M Nair: Yeah but here the design shelf all these things are good.  
Paresh: Thank  
Midhun M Nair: Can we optimize little bit more that it won't occupy this much space?  
Rayboy Nunez: Yeah, we can definitely you know uh combat it in a way but this is like idea but can do I mean we can work on it.  

#### 00:44:59

Midhun M Nair: Yeah. Books in the shelf and this representation is good.  
Rayboy Nunez: Yeah.  
Midhun M Nair: Okay. now.  
Rayboy Nunez: Uh if you compare this one, this is much more compacted.  
Midhun M Nair: Yes.  
Rayboy Nunez: But we can still compact this version as well.  
Midhun M Nair: Yes. Yes. Yes. Ah. But this is only two books. How? Uh can you put the all? Okay. Yeah. This is looking more compact. So Paresh,  
Rayboy Nunez: Yeah.  
Midhun M Nair: how many rows we need to show? Two rows or three or only two rows. Only two rows then view more kind of a button can be added.  
Rayboy Nunez: Yeah. Sure.  
Midhun M Nair: that will go to the world courses page.  
Rayboy Nunez: All courses page. Okay.  
Midhun M Nair: Right?  
Rayboy Nunez: Understood.  
Midhun M Nair: So maybe this looks more combined. We can integrate this to that one.  

#### 00:45:42

Midhun M Nair: Okay.  
Rayboy Nunez: Yeah.  
Midhun M Nair: Okay. Then the next section  
Rayboy Nunez: Yeah. Which one you want to look into?  
Midhun M Nair: this is second design. This is uh third.  
Rayboy Nunez: Third design. This is third design.  
Midhun M Nair: Yeah. Let's go to second. So you're getting the idea now first one will be the banners then again we are coming to the co first is banner second is the courses section then third uh what we have to  
Rayboy Nunez: So right now the topper section is one idea we have for second section and not this one. If you go to this one, uh we have um few other sections like guidance at every stages of UPSCSA like a section as well as uh you know telling about the Vajiram  
Midhun M Nair: But third is after courses. First we need to convince the students. So maybe the topper section would be good. But I want to see the third is saying uh topper section.  

#### 00:46:49

Rayboy Nunez: this is this is the third question.  
Midhun M Nair: Yeah. Yeah. Yeah.  
Rayboy Nunez: So if you go into this So,  
Midhun M Nair: Topper.  
Rayboy Nunez: so here uh to here we don't have a dedicated space for toppers as such. It is ideally being communicated in the landing section itself you know for the toppers of Vajiram as like a carousel uh for this  
Midhun M Nair: And  
Rayboy Nunez: idea. But for topos what do we have is like a carosal here as like a  
Midhun M Nair: uh this is testimonial.  
Rayboy Nunez: post.  
Midhun M Nair: This is good one. We will keep this one. Uh but uh parish how it shall be like uh but I was thinking no re so maybe top wise we have shown. Okay.  
Rayboy Nunez: Okay.  
Midhun M Nair: Then one section can be added where we can upload from gallery the similar way which we have added from the added on the course page. So overall you see from a customer point of view.  

#### 00:47:46

Midhun M Nair: So customer came they got the information.  
Rayboy Nunez: Okay.  
Midhun M Nair: Now the next question is buy from them. Okay.  
Rayboy Nunez: Okay.  
Midhun M Nair: So what we usually write like okay we are plus brand blah blah blah. But it is very difficult to convince through that.  
Rayboy Nunez: H.  
Midhun M Nair: So there first we can show like okay these are our toppers. Okay. Now next can be their testimonials.  
Rayboy Nunez: Okay.  
Midhun M Nair: Okay. So two layers of trust we are trying to create. Now another question is like you see every topper everyone is claiming. So how I know that okay this is genuine ones.  
Rayboy Nunez: Except  
Midhun M Nair: So the third section can uh link to our social media uh content. Social media content maybe it could be some reals or it could be some the photos where topics have come to vajram and maybe for interactions. So from back end we can upload.  
Rayboy Nunez: Okay.  

#### 00:48:32

Rayboy Nunez: Okay.  
Midhun M Nair: So from a customer point of view they gain they understood okay they have all these courses they have all these topics okay the topics have given the testimonials uh now they have come to their office they have some organic photos which is uploaded so it is a genuine one so three layers of task we would be able to create on that part Hey.  
Rayboy Nunez: Okay. Okay. Uh, sure. Uh, so when you say gallery, you mean you can upload image, video, anything there and you know it should be visible on that section, right?  
Paresh: Yes.  
Rayboy Nunez: Okay. Okay. Yeah.  
Midhun M Nair: But one another thing also I like but SEO point of view all these thing uh Paresh and Yogesh will  
Rayboy Nunez: Mhm.  
Midhun M Nair: discuss that just once you put itself one opening thing came no that red color it's like a card or something I feel like that was good uh what parish parishes what you  
Rayboy Nunez: This one. No.  
Midhun M Nair: Yes. Huh?  

#### 00:49:35

Paresh: Yes sir.  
Midhun M Nair: This one.  
Paresh: Like having some suggestion uh Rayboy like you have added this animation it is looking really great but do you think with this animation and all these things we are able to achieve the speed of 1995?  
Rayboy Nunez: Uh yeah, this has to go throughwards uh technical uh feasibility check so that you know we can we will have animations and motions in place but we will just control the amount of animation and motion. So uh that is something that we can decide.  
Midhun M Nair: Yeah.  
Paresh: Yeah.  
Midhun M Nair: So whatever design we go for,  
Rayboy Nunez: Uh exactly that's  
Midhun M Nair: we need to ensure that the speed won't be affected. Then uh Rayboy,  
Rayboy Nunez: important.  
Midhun M Nair: can you scroll? Yeah. Scroll again. So one section you would be able to add to this would be the the social media images which we would be able to add.  
Paresh: just  
Midhun M Nair: Okay. So that can be with a good design.  
Rayboy Nunez: Okay.  

#### 00:50:26

Midhun M Nair: Then this Y chooses this uh like big net not big net this zoom effect that may not be needed. I think this is not coming exactly in the sync because that professional  
Rayboy Nunez: Yeah, this thing man.  
Midhun M Nair: touch is going to that image and  
Paresh: Yes. And one more thing that like like scroll we have to do then why choose he is doing the scrolling basically then the animation is connection uh  
Rayboy Nunez: Yeah, I am doing the scrolling. So, the animation is happening as I  
Paresh: then uh means for example after 10 scrolling this will come uh uh  
Rayboy Nunez: uh let me see. Yeah, maybe under like you know. Yeah,  
Paresh: this  
Midhun M Nair: Yeah.  
Rayboy Nunez: under is actually the full section content is going to be like  
Midhun M Nair: Yeah,  
Paresh: Uh-huh.  
Midhun M Nair: maybe directly it can come because uh  
Paresh: Yeah.  
Rayboy Nunez: yeah  
Midhun M Nair: yeah this can remain this scroller but the the first one can be avoided then again can you come to top uh not top just one scroll above?  

#### 00:51:31

Midhun M Nair: Yes, this topper section. Can you come up with something better?  
Rayboy Nunez: Yeah, can can do that. So we can explore few options for topples.  
Midhun M Nair: Yes, maybe you see like how it shall be currently it is again topper requires scrolling otherwise in one section we can show as much as possible say 50 topper or something.  
Paresh: So what we can do is we can show our first 10 toppers in a complete row or First 20 toppers and after that we can list their listing along with the various filters.  
Midhun M Nair: Okay. Uh just check what are the other options on to we can do that. Okay.  
Rayboy Nunez: Yeah.  
Midhun M Nair: Yeah.  
Rayboy Nunez: So we will be showing 10 toers and then Russ can be accommodate inside a page. Okay. Okay. Understood.  
Midhun M Nair: Now the more you are able to accommodate that much good it is with the decent visibility  
Rayboy Nunez: Please  
Midhun M Nair: because it is not necessary say our daily traffic is one lakhs.  

#### 00:52:23

Paresh: There you are.  
Midhun M Nair: Okay. It is not maybe only 5% will click to see the more right but in the past visibility itself if we are able to show that get imprinted in their mind okay they are having say 50 topper 100 toppers likewise but we have limitation on how much space we can utilize and how much  
Paresh: The other  
Midhun M Nair: visibility we would be able to give so you decide accordingly  
Rayboy Nunez: okay.  
Midhun M Nair: okay  
Rayboy Nunez: uh let's see how we can explore and you know give that imprint for the visitors you know we have  
Midhun M Nair: Yeah.  
Rayboy Nunez: like 100 toppers on this year or etc.  
Midhun M Nair: Right. Yes. Yes. Yes. Yes.  
Rayboy Nunez: Yeah.  
Midhun M Nair: Then can you come down uh by chooses below again? Scroll down because I need to before by chooses I think our faculty members need to show up.  
Rayboy Nunez: Yep.  
Midhun M Nair: I think because one stop us. Yeah. Either in the Yeah.  

#### 00:53:19

Rayboy Nunez: So this  
Midhun M Nair: either this one otherwise the cylinder which one is the okay so faculty  
Paresh: Cylinder one is better.  
Midhun M Nair: section we will choose the cylinder one okay but uh from the half of the image can we uh add their credibility I because  
Paresh: I suppose  
Midhun M Nair: I don't again want to yeah but I don't want to again give this much space for that  
Paresh: I don't  
Midhun M Nair: if along with the image itself that we supposed to already came so our overall thing is to reduce the  
Rayboy Nunez: Yeah.  
Midhun M Nair: scroll length and the blank spaces.  
Rayboy Nunez: Yeah. So yeah, based on that goal of reducing the scroll length, we can definitely work on details, right? So this is like the high level idea. If that's the goal, then we can focus more towards that goal. Yeah. This means we can work properly.  
Midhun M Nair: Yeah,  
Paresh: Yes.  
Midhun M Nair: maybe along with the image without uh some blending with the image if you can add the credibilities maybe three four lines.  

#### 00:54:12

Rayboy Nunez: Yeah. Yeah. that can be achieved.  
Midhun M Nair: So yeah then this much space we can save that only name is needed whatever comes below  
Rayboy Nunez: Understood.  
Midhun M Nair: we can avoid that. Can you scroll again below of the second is this  
Rayboy Nunez: Second is this  
Midhun M Nair: is  
Rayboy Nunez: is testimonials  
Midhun M Nair: Yeah,  
Paresh: Yeah.  
Midhun M Nair: this we can keep. That is good enough. Paresh. Yeah,  
Paresh: Yes.  
Midhun M Nair: this testimonial we can keep.  
Rayboy Nunez: there. There are two different of testimonial. one is this on the third option.  
Midhun M Nair: Mhm.  
Rayboy Nunez: This is a kosal kind of thing. Uh whereas on the second one it's a running uh testimonial.  
Midhun M Nair: Okay.  
Rayboy Nunez: Uh when you over it shows up.  
Midhun M Nair: Okay. I think this one is better.  
Paresh: Yeah,  
Midhun M Nair: Yeah,  
Paresh: this one.  
Midhun M Nair: this one we will keep.  
Rayboy Nunez: Okay,  
Midhun M Nair: Okay, then again below what we are.  

#### 00:55:09

Rayboy Nunez: we have the for  
Midhun M Nair: Okay. Yeah, this also looks good. We can keep this one.  
Rayboy Nunez: Okay,  
Midhun M Nair: This is second or third design. This is third. I think second one.  
Rayboy Nunez: this is second one.  
Midhun M Nair: Okay, we will keep this one. Then below  
Rayboy Nunez: below. We have the free resources uh section too.  
Midhun M Nair: this section little bit see we can make it more aligned with the  
Rayboy Nunez: Yeah, sure. Sure.  
Midhun M Nair: one uh this  
Rayboy Nunez: Uh  
Paresh: I don't  
Midhun M Nair: much so but so few things I will wind up because I have to join another meeting  
Paresh: even  
Midhun M Nair: now the rest of the thing yoga and par will discuss.  
Rayboy Nunez: Mhm. Okay.  
Midhun M Nair: So overall the MD is like a one section we need to add where we need to add the toppers organic photos when they come to institute all these things. Okay. So the chronology will be first the banners course banners scroll then uh next will be the courses then third will be the topper section.  

#### 00:56:07

Rayboy Nunez: Okay.  
Paresh: Then for the proper  
Midhun M Nair: Fourth will be the toppers testimonial fifth will be uh  
Paresh: testimony  
Rayboy Nunez: Mhm.  
Midhun M Nair: faculty faculty section. Then uh why chooses then rest of the material or the other things  
Rayboy Nunez: Okay.  
Midhun M Nair: then maybe in between Yogesh will be needing some space for the more content.  
Paresh: such things So you're going to  
Midhun M Nair: So you okay discuss on those part okay rest I think like f sits on the second with the some of the elements we can take from the third okay  
Rayboy Nunez: Second understood. Okay.  
Midhun M Nair: then we will sit again on this then I will show it to the CEO okay this is from my side but anyway  
Rayboy Nunez: Okay.  
Midhun M Nair: it is a good improvement from the last one okay okay yeah I'm just disconnecting  
Rayboy Nunez: Okay, understood.  
Midhun M Nair: boy if anything we connect again parish and yog will give you the other uh details okay Okay.  
Rayboy Nunez: Yeah, sure. Sure.  
Midhun M Nair: Thank you. Thank you.  

#### 00:56:59

Midhun M Nair: Blesson.  
Blesson Babu: Yeah, thank you.  
Midhun M Nair: Yeah. Yeah. Good.  
Paresh: Uh hi. Uh hi everyone.  
Rayboy Nunez: Hey  
Paresh: Uh can you please uh go at the top? Yeah. Uh yeah. Suppose for example with respect to you go to any particular section suppose this is the section right this is looking perfectly good but with respect to this section we should have a clearcut visibility. This for example uh in which thing which are which we are directing to the students just say  
Rayboy Nunez: Mhm.  
Paresh: uh you come down slightly now this is  
Rayboy Nunez: Yeah.  
Paresh: good this we have already discussed your down uh this we are any anyhow going to change but in this now you see one thing this for example we are not telling the user where to focus upon This say open uh like at the top there is a content  
Rayboy Nunez: Okay.  
Paresh: below there is a content below that there is a content.  
Rayboy Nunez: Okay.  
Paresh: Uh so there are so many elements it looks good it looks perfect but if we can figure it out like how we can place it in such a way that we are telling the user this is the thing this is the thing this you have to focus upon yes yes  

#### 00:58:20

Rayboy Nunez: Okay. Yeah, we we can we can work on it very sure.  
Paresh: yes that is the that is the only thing from my side and I'm little bit concerned with respect to the speed because like you guys have worked great on animation part but uh I think with respect ect to the Google then I think like you guys has to figure it out this technical part but I think you may get challenge with respect to achieving the website speed of 1995 rest  
Rayboy Nunez: Yes.  
Paresh: like how your tech team is can figure it out you like if you having having any points  
Yogesh Purohit: No sir uh uh for this topper also I feel that uh it is little distracting for a particular like if there is an aspirant or a student so he might also get confused because same like ano ano we have mentioned here all India rank one and again on the left right hand side we are mentioning it again and also there is some certain kind of text here in this particular like all India one rank section. So rather than for the toppers if you can show them that uh landing page image they will get more of idea of that.  

#### 00:59:30

Rayboy Nunez: Understood.  
Yogesh Purohit: So sir  
Paresh: Yes. Yes. This is the I'm listening.  
Yogesh Purohit: h s landing page image like if you will show them they'll get an idea like how exactly we want the topper section because this image may around 20 30 toppers here. So rather than not keeping 20 30 toppers even if we keep 15 or 20 toppers that will be enough for us and rest we'll just add a button below the image so that if somebody wants to see more they can directly go to that page particular page.  
Paresh: H Yish that is only a photo. Let them come up with a like better section with respect to this because  
Yogesh Purohit: Yeah.  
Paresh: section like let's see various option then we can have that like as a backup this is the thing  
Yogesh Purohit: Yes.  
Paresh: from our side and just open it once.  
Rayboy Nunez: No, not this one. So we have different option to open that one. Yeah. So that is a second option. This is a third option.  
Paresh: Mhm.  
Rayboy Nunez: Yeah.  

#### 01:00:40

Paresh: Mhm. Yeah. In this you scroll down. Uh maybe maybe this is just a suggestion. Maybe sir will disagree with me or Yogesh will disagree with me. Just say for example with respect to the optional courses now we are having various courses.  
Rayboy Nunez: H.  
Paresh: Uh suppose what we can do is we can list uh 12 to 13 options that are available over there. Uh for example for front page you do you go to the previous page link no no actually open the option subject program.  
Rayboy Nunez: Yeah.  
Paresh: Yeah yeah yeah same you scroll uh next you scroll next. Now here if we can give them the list of all the subjects suppose just like a  
Rayboy Nunez: Index. Index.  
Paresh: index but but I don't know sir will agree with me or not your yog  
Rayboy Nunez: Okay. Okay. Okay. Yeah.  
Paresh: maybe I in the other opinion but just like  
Yogesh Purohit: Sir is section sorry to interrupt section  
Paresh: Mhm.  
Rayboy Nunez: Yeah.  
Yogesh Purohit: sir aspirant those who are willing to buy the course point of view there are further two three steps extra Like once they click on a particular section then this book type of thing will appear then they have to scroll up to one or two three clicks then particular page will come and from that particular page they will go to that particular one page.  

#### 01:02:03

Yogesh Purohit: So I I personally feel that I don't know whether you guys will be agreeing with me there is a  
Paresh: Okay.  
Yogesh Purohit: like uh clicks limitations there are extra two three uh level of clicks in this particular sections. So what if we do a single uh we just make it short to a single click like once somebody is seeing up to the this optional thing and once they click on that they will particularly go to that list of optional pages where all the courses are getting listed. The same thing or the same step we are currently having in our website right now.  
Paresh: Let's do one thing like this is the thing which sir has already liked. We just need to remove this step right  
Yogesh Purohit: Which concept?  
Paresh: hello for example I got it what you are suggesting you you directly telling let's move it to directly to the course page with respect to the where all the options are listed correct so  
Yogesh Purohit: Yes. Yes, sir.  
Paresh: huh so in that case this design like this design won't be there so let's do one thing sir has already liked this time.  

#### 01:03:09

Paresh: So let's  
Yogesh Purohit: for example.  
Paresh: Uh-huh. Uhhuh. Correct.  
Yogesh Purohit: This is what I'm trying to say.  
Paresh: Yes. Yes. But in that case then this opening book opening design won't be there.  
Yogesh Purohit: Yes. Yes,  
Rayboy Nunez: Yep.  
Paresh: Are you getting huh?  
Yogesh Purohit: sir. Yes, sir.  
Paresh: So so let's do one thing. Anyhow like sir has liked this design. Correct. So it's and that page is already ready.  
Yogesh Purohit: Mhm.  
Paresh: Cat courses walla. So what we can do is we can get this reason like we can keep it as it is. If the s is not liking it, we will directly link it to that page.  
Yogesh Purohit: Yes, sir.  
Paresh: Uhhuh. We can do do the thing. Take and you also just general suggestion uh like this  
Rayboy Nunez: Yep.  
Paresh: is very subjective thing with respect to the color combination. You also see if we can use the contrast colors uh then your text becomes visible. This is my observation. Maybe I'm wrong. Maybe I'm wrong. Okay.  

#### 01:04:10

Paresh: Huh?  
Rayboy Nunez: Huh?  
Paresh: Just say for example uh with respect to our this all our UPC program side by side choose one to take a closer look. Right. It looks great in subtle combination. But if we can try it in a contrast combination in which this things becomes visible like like whatever we want the user to focus upon he can focus upon. This is a subjective thing but we can explore  
Rayboy Nunez: Yeah. Yeah. Sure. Sure. We we can definitely you know you're talking about the you know text on the book right so which have that  
Paresh: uh along with the text upon the book. I'm talking about the background combination as well. This say for example this uh this above all our UPC program side by side choose one to take a close look.  
Rayboy Nunez: Okay. Okay.  
Paresh: See uh to you come down. Come down. Huh? See, come up. Come up. Come up. Come up. Up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up up.  

#### 01:05:11

Paresh: See 1 minute. See here basically explore the upcoming batches for your UPC preparation. Then here check upcoming course date learning option program details to plan your preparation with confidence. This was my first point in means if we can just minimalistic the things. Suppose this is required. Now this this information is not required. check check upcoming start dates, learning option, program details.  
Rayboy Nunez: Oh, okay.  
Paresh: So we will exactly tell the user this is the thing that we need to focus upon.  
Rayboy Nunez: Okay.  
Paresh: Uhhuh. This we can basically do. Uh and second thing uh with respect to my point uh suppose you come down slightly down.  
Rayboy Nunez: down. Okay.  
Paresh: Yeah.  
Rayboy Nunez: This one  
Paresh: Yeah. Slightly down. Take a more smiley down means this this this line is written the journey of our toppers and Arab in their own words. This like if this combination can come into the contrast form then we can also see that how in contrast it is looking is it giving the better visibility to the text. And the last point will be uh you also check with respect to the font front.  

#### 01:06:34

Paresh: This is for example whatever the font we are using are there any other font combination that we can uh use it to make it more premium.  
Rayboy Nunez: Okay. Yeah.  
Paresh: Yes. Uh and uh you also check what is the mobile feibility of this because with respect to the mobile view now before proceeding to further you start developing upon the mobile view because on that basis like we will understand how it is looking on mobile. Maybe in the mobile view we need to explore various designs because some design won't look good in  
Rayboy Nunez: Yeah.  
Paresh: mobile.  
Rayboy Nunez: Yeah. Yeah. That's that's a way to work it out.  
Paresh: Mhm.  
Rayboy Nunez: Um so uh Paris uh can you uh do a help right so we have took notes of whatever sections that you want to formalize based on these two ideas but can you give a write up like you know uh this is what you have in your mind like from top to bottom these are the different things maybe I will share this two links with you so you can  

#### 01:07:31

Paresh: Yeah. Yeah. You share basically you shared the three links with me. You also share in the group. Yogish is also there. Okay. We will go through it. If anything is missing and uh if you can share the minutes of the meeting, we will go through that. If anything is missing, we will add to that.  
Rayboy Nunez: Yeah. Okay.  
Paresh: Okay.  
Rayboy Nunez: Okay.  
Paresh: Okay. Okay. Okay. Okay. Uh by the way, nice working.  
Rayboy Nunez: Yeah.  
Paresh: Uh anything else is there Yogish to add.  
Yogesh Purohit: No sir, not right now. Let us just check the M.  
Paresh: Okay.  
Yogesh Purohit: Then we'll decide whether if something is missile, we'll just tell them.  
Rayboy Nunez: Yeah.  
Paresh: Take it.  
Rayboy Nunez: Yeah.  
Paresh: Take it.  
Rayboy Nunez: Yeah.  
Paresh: Take it. Take it.  
Rayboy Nunez: Because Yeah.  
Paresh: Yes. Yes. Please.  
Rayboy Nunez: What you want to do is like you want to show this to Arjuna, right? So we want to have like a option to show it to Arjuna or you are show going to show this options.  

#### 01:08:22

Rayboy Nunez: No. Right.  
Paresh: Uh actually uh how it will work uh basically we all three will agree  
Rayboy Nunez: Okay.  
Paresh: me yogun sir and after our finalization we will show it to the chindus as well as Arjun sir after his feedback then we will provide you the final feedback  
Rayboy Nunez: What is this?  
Paresh: that we need to incorporate this or we need to remove this.  
Rayboy Nunez: Yeah. Okay. Okay.  
Paresh: Yes.  
Rayboy Nunez: Got it.  
Paresh: Yes. Okay.  
Rayboy Nunez: Got it.  
Paresh: Okay. Yeah, perfect.  
Rayboy Nunez: Yeah. Uh noted.  
Paresh: Check then we can we can conclude the meeting.  
Rayboy Nunez: Sure. Sure. Sure.  
Paresh: Okay. Okay.  
Blesson Babu: Uh yeah yes yes parish yeah parish one more is there any update regarding the  
Paresh: Thank you everyone. Yes. Yes. Please go on.  
Blesson Babu: request I have given like the uh lead squared That's just  
Paresh: are who actually these people are only sending sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry sorry mail with respect to the sandbox you're asking now let me remind  

#### 01:09:13

Blesson Babu: Yeah. Yes. Yes.  
Paresh: them once again.  
Blesson Babu: Yeah. Okay. What about that and the vessel? Hello.  
Yogesh Purohit: He He might be on the call.  
Blesson Babu: Yeah. Okay.  
Paresh: Uh for how many days you will be needing uh the sandbox access  
Blesson Babu: Uh yeah that I think if that depends on because I need to check whether how the integration works with the square and That's  
Paresh: I think it is going to be easy for Like till now various people have come and they are not that much basically tech savvy as compared to you guys. So they haven't explored the sandbox option but if you want the actually problem is these people are charging a good amount of money. They're asking for good amount of money per month.  
Blesson Babu: okay.  
Paresh: Uh so if you can give us the this exact timing so we can ask for the trial. In the trial you do your work after that we can exit the clause.  
Blesson Babu: Okay. Then in that case so once we start development then uh we need that sandbox account. Yeah. So that I can directly integrate with the development stage and we'll check and after that we can dispose that the  
Paresh: Yes. Yes. Yes. Yes.  
Blesson Babu: sandbox account then that's fine in that case we need maybe  
Paresh: Yes.  
Blesson Babu: two two three days maximum.  
Paresh: Yes. Yes. Yes. Perfect. Perfect. Perfect. Now I will basically I'm telling mailing them our tech team is not available right now. Whenever they are available then you guys can start the trial period.  
Blesson Babu: Yeah. Oh.  
Paresh: Okay. Okay then. Okay. Okay. Okay. That's it.  
Blesson Babu: Yeah, that's Yeah,  
Paresh: Okay. Okay. Okay. Bye-bye. Yeah.  
Blesson Babu: thank you.  
Yogesh Purohit: Okay,  
Paresh: Thank you.  
Yogesh Purohit: bye team.  
Paresh: Bye-bye.  
Yogesh Purohit: Thank you.  

#### Transcription ended after 01:11:58

This editable transcript was computer generated and might contain errors. People can also change the text after it was created.
