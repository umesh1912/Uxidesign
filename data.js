// Portfolio content. Copied from the Claude Design handoff (Portfolio v4).

// Each case study opens as a full PDF.
const CASES = [
  { client:'Gardiant', slug:'gardiant', category:"Workers' comp SaaS", role:'Sr. Product Designer · Scrum Master',
    title:"Designing a single home for workers' comp claims",
    summary:'End-to-end product design of a claims and case management platform for vocational counselors and Retro groups, from discovery and personas to a scalable design system, testing and developer delivery.',
    metrics:[{v:'600+',l:'Firms and professionals on the platform'},{v:'1–2 hrs',l:'Saved per team member each day'}],
    pdf:'case-studies/Gardiant-Case-Study.pdf' },
  { client:'meshIQ', slug:'meshiq', category:'Enterprise platform · Messaging & streaming', role:'UX/UI Designer',
    title:'One platform for data in motion',
    summary:'Unifying Manage, Observe, Track and Control Center into a single, consistent meshIQ experience, with one URL, single sign-on, role-based access and a shared design system.',
    metrics:[{v:'4→1',l:'Products unified into one platform'},{v:'1',l:'URL and sign-in with SSO'}],
    pdf:'case-studies/meshIQ-Platform-Redesign-Case-Study.pdf' },
  { client:'Techies4Tech.ai', slug:'techies4tech', category:'AI hiring platform', role:'Lead UX/UI Designer',
    title:'Hiring tech talent on proven skill, not résumés',
    summary:'An end-to-end hiring platform where AI interviews, evaluates and matches tech talent, so employers review evidence, not résumés. Redesigned from research to developer handoff for every role that touches a hire.',
    metrics:[{v:'7',l:'User roles designed'},{v:'1,300+',l:'Frames & states in Figma'}],
    pdf:'case-studies/Techies4Tech-UX-Case-Study.pdf' },
  { client:'nTouch', slug:'ntouch', category:'Hospitality SaaS · Web + mobile', role:'Lead UX/UI Designer',
    title:'Running a hotel from one screen',
    summary:'A cloud property management system for hotels and hotel groups in the GCC. I led research, UX and UI for the web platform and the companion mobile app, from the first stakeholder workshop to developer handoff.',
    metrics:[{v:'−42%',l:'Time to complete a walk-in booking'},{v:'72%',l:'Of new hotels finish setup in one session'}],
    pdf:'case-studies/nTouch-PMS-Case-Study.pdf' }
];
CASES.forEach((c, i) => c.num = '0' + (i + 1));

// Vibe-coded prototypes built with Claude. href: the prototype's own copy under prototypes/.
const V = (title, type, desc, href) => ({ title, type, desc, href });
const VIBE = [
  V('Keel Business Banking','Fintech','Business banking for small companies: sign-in with one-time codes and Face ID, balances and cash flow, payments, cards, budgets and goals, and disputes.','prototypes/keel/'),
  V('Ledgerline Risk Console','Risk management','Digital-asset risk console for corporate treasury: portfolio and risk dashboards, positions and limits, compliance alerts, transaction monitoring, custody and counterparty risk.','prototypes/ledgerline/'),
  V('Galli Neighbourhood Alerts','Mobile app','Alerts and lost-and-found posts from neighbours within a kilometre. Neighbours confirm alerts, and lost-pet sightings are pinned on a map.','prototypes/galli/'),
  V('Khayal Parent Care','Mobile app','Medicine reminders for elderly parents. Family is alerted when a dose is missed, with refill tracking and a big-button parent mode in Hindi.','prototypes/khayal/'),
  V('Rasid Warranty Vault','Mobile app','Keeps every bill and warranty in one place, warns before a warranty ends and prepares a repair claim in one tap.','prototypes/rasid/'),
  V('Tayyari Study Buddy','Mobile app','Turns your notes into practice questions in Hindi or English, and schedules revision just before you would forget.','prototypes/tayyari/'),
  V('Valence','Mobile app','Science study app with lessons, solved examples, notes and mock tests for Physics, Chemistry, Biology, Maths and Computer Science.','prototypes/valence/'),
  V('Utsav Wedding Planner','Mobile app','One place for the whole family to plan a wedding: guests and RSVPs by event, tasks shared among relatives, the budget, and every vendor\'s balance and due date.','prototypes/utsav/'),
  V('Hariyali Plant Care','Mobile app','Plant care that checks the weather and the soil: who needs water today, skipping balcony plants when rain is coming, and plant problems identified from a photo.','prototypes/hariyali/'),
  V('Jodi Habit Partners','Mobile app','A habit tracker built for two. Partners see each other\'s check-ins, cheer or nudge, and share a light weekly pact.','prototypes/jodi/'),
  V('Bahi Shop Ledger','Mobile app','An udhaar register for kirana shops, Hindi first. Say "Ramesh 340 udhaar" to record it, see who to collect from first, and send WhatsApp reminders with a UPI ID.','prototypes/bahi/'),
  V('Lenden Skill Swap','Mobile app','Neighbours swap lessons instead of paying for them: every hour you teach earns a time credit, and every hour you learn spends one.','prototypes/lenden/'),
  V('Hisaab Flat','Mobile app','Rent, bills and chores for flatmates sharing a flat.','prototypes/hisaab/'),
  V('Ayura Health Platform','Healthcare platform','One consent-first health record connecting patients, doctors, hospitals, insurers, pharmacies and medical reps.','prototypes/ayura/'),
  V('Raja Rani Chor Sipahi','Game','The classic Indian chit game of Raja, Rani, Sipahi and Chor, played against computer players over several rounds.','prototypes/raja-rani/')
];
const VTYPES = ['All','Fintech','Risk management','Mobile app','Healthcare platform','Game'];
const VLABEL = { 'All':'All', 'Fintech':'Fintech', 'Risk management':'Risk management', 'Mobile app':'Mobile apps', 'Healthcare platform':'Healthcare', 'Game':'Games' };

const W = (title, category, group, kind) => ({ title, category, group, kind });
const WORK = [
  W('nTouch','Mobile App','Consumer','Figma'), W('Techies4Tech','Web App','Enterprise','Figma'), W('Soco','Social App','Consumer','Figma'),
  W('Breez Security','Security App','Consumer','Figma'), W('PUMA','Enterprise','Enterprise','Figma'), W('Bonds India','Fintech','Fintech','Figma'),
  W('SocietyRax','Healthcare','Healthcare','Figma'), W('MyBzz','HRM Platform','Enterprise','Figma'), W('SSE — Sports Stock Exchange','E-commerce','Fintech','Figma'),
  W('Appswave','Legal Tech','Enterprise','Figma'), W('Dixels','EdTech','Consumer','Figma'), W('Royal Oman Police','Social Media','Consumer','Figma'),
  W('ADAA','Food Delivery','Consumer','Figma'), W('QICDRC','Wellness','Healthcare','Figma'), W('AAH','Real Estate','Consumer','Figma'),
  W('Madinaty','Sports','Consumer','Figma'), W('National Archive','Travel','Consumer','Figma'), W('FRC','B2B SaaS','Enterprise','Figma'),
  {title:'Nivano Physicians',category:'Healthcare website',group:'Healthcare',kind:'Live',href:'https://www.nivanophysicians.com/'},
  {title:'Cosmeti Suite',category:'Healthcare website',group:'Healthcare',kind:'Live',href:'https://www.cosmetisuite.com/'},
  {title:'Dr. Catalyst',category:'Healthcare website',group:'Healthcare',kind:'Live',href:'https://www.drcatalyst.com/'},
  {title:'Apollo Managed Care',category:'Healthcare website',group:'Healthcare',kind:'Live',href:'https://www.apollomanagedcare.com/'}
];
const FIGMA = {"nTouch":"https://www.figma.com/design/B5x9cng6Mfigd1OOJh1INP/ntouch---shared","Techies4Tech":"https://www.figma.com/design/JF18KMhry2u29ZaHOsZnLc/Techies4Tech-Application","Soco":"https://www.figma.com/design/5naNrr6PEJ0rBP1L9KZl13/Social-Comment---SOCO","Breez Security":"https://www.figma.com/design/t2WutB6qVsaAvFlEyHUt31/Breez-Design---Shared","PUMA":"https://www.figma.com/file/jp2gdBmI86PdcbOpanwFUZ/ACE-iHUB-and-PUMAA","Bonds India":"https://www.figma.com/file/wtQ29HB6l4MufpBNbFqfya/Bond-Login-page-design","SocietyRax":"https://www.figma.com/design/Nhp1LL1kxWkV4o8GsUvEPR/Society-Rax","MyBzz":"https://www.figma.com/file/02PjRNbWwWFTxAqbNjjjNT/Mybzz","SSE — Sports Stock Exchange":"https://www.figma.com/file/OUWrmoSFC1X4WmBXYhhKCo/Sports-stock-exchange","Appswave":"https://www.figma.com/design/rWSXpECH4qlpp6cNwsBTx7/Appswave-Website","Dixels":"https://www.figma.com/design/D0mA5GeHcECuZBxObychwE/Dixels-(Copy)","Royal Oman Police":"https://www.figma.com/file/MtEuMZjvoAXLDoTo4pGson/Royal-Oman-Police-(ROP)","ADAA":"https://www.figma.com/file/0F7p33SQMpY4cpzwVubFVu/ADAA","QICDRC":"https://www.figma.com/file/vxd6GlFPh2S9NxhpOU6JEG/QICDRC","AAH":"https://www.figma.com/file/yBLrIc3pxsiEuSoFKMZKmx/AAH","Madinaty":"https://www.figma.com/file/6jT4gEUwoc1tWnsWTsNJ8Z/Madinaty","National Archive":"https://www.figma.com/file/1Ac0WMuiopY7yQiHgLwtgg/National-Archive","FRC":"https://www.figma.com/file/1jvtqejXfWiGiWl2evVRTq/FRC-UI"};
WORK.forEach(w => { if (FIGMA[w.title]) w.href = FIGMA[w.title]; });
// Short descriptions for the Figma files and live sites on the Work page.
const WDESC = {
  'nTouch':'Cloud property management for hotels: reservations, housekeeping, finance and a companion mobile app for staff.',
  'Techies4Tech':'An AI hiring platform with two marketplaces and seven user roles, from candidate sign-up to AI interviews.',
  'Soco':'A social commenting app for joining conversations, following people and reacting to posts in real time.',
  'Breez Security':'A home security app for monitoring cameras, arming the system and getting instant alerts.',
  'PUMA':'Enterprise screens for the ACE iHUB and PUMA platforms, covering dashboards, forms and admin workflows.',
  'Bonds India':'A bond investing platform; this file covers sign-up, login and the first steps into investing.',
  'SocietyRax':'A healthcare platform connecting patients and providers, with records, appointments and care updates.',
  'MyBzz':'An HRM and business networking platform for teams, members, groups and events.',
  'SSE — Sports Stock Exchange':'A fantasy trading app where fans buy and sell shares in players as prices move.',
  'Appswave':'The company website for Appswave, a legal tech and software services firm.',
  'Dixels':'An EdTech product for online learning, with courses, lessons and student progress.',
  'Royal Oman Police':'Digital screens for Royal Oman Police, focused on social media and public communication.',
  'ADAA':'A food delivery app with restaurant browsing, ordering, checkout and order tracking.',
  'QICDRC':'Designs for the Qatar International Court and Dispute Resolution Centre website.',
  'AAH':'Website and mobile screens for a hospital: departments, doctors and appointment booking.',
  'Madinaty':'A sports and community app for booking facilities and following activities.',
  'National Archive':'Screens for a national archive product, making historical records easier to explore.',
  'FRC':'A B2B SaaS interface with dashboards, data tables and settings for business users.',
  'Nivano Physicians':'Live website for a physician group: health plans, locations, provider search and members.',
  'Cosmeti Suite':'Live website for practice software for cosmetic and aesthetic clinics.',
  'Dr. Catalyst':'Live website for healthcare office staffing and chronic care management services.',
  'Apollo Managed Care':'Live website for a managed care organisation serving patients and providers.'
};
WORK.forEach(w => { w.desc = WDESC[w.title] || ''; });
const CLIENTS = ['Matrix Comsec','Meditab','Cayzen Technologies','HCI Active','i-Engineering','Appswave','GSPANN','Danaher','Leica Microsystems','ContentHubGPT','MeshIQ','Decision Point','PayoBank','i8Labs','Sports Exchange','MyBzz','Breez Security','SocietyRx','Techies4Tech','Defx','iPatientCare','Bonds India'];

const LOGO_DOMAINS = {"Matrix Comsec":"matrixcomsec.com","Meditab":"meditab.com","Cayzen Technologies":"cayzen.com","HCI Active":"hciactive.com","GSPANN":"gspann.com","Danaher":"danaher.com","Leica Microsystems":"leica-microsystems.com","MeshIQ":"meshiq.com","iPatientCare":"ipatientcare.com","Appswave":"appswave.io","Bonds India":"bondsindia.com","Decision Point":"decisionpoint.ai","PayoBank":"payobank.com","i8Labs":"i8labs.com","ContentHubGPT":"contenthubgpt.com","Techies4Tech":"techies4tech.com","Breez Security":"breezsecurity.com","Defx":"defx.com","i-Engineering":"i-engineering.com","Sports Exchange":"sportsexchange.com","MyBzz":"mybzz.com","SocietyRx":"societyrx.com"};
const SERVICES = [
  {title:'UX Research',body:'VOC, retros, user interviews, persona development and journey mapping.',tags:['User research','VOC analysis','Personas','WCAG']},
  {title:'Product Design',body:'End-to-end product design from wireframes to high-fidelity mockups and prototypes.',tags:['Wireframing','Prototyping','Figma Make']},
  {title:'Design Systems',body:'Scalable component libraries, tokens and documentation for consistent product UI.',tags:['Components','Variants','Auto layout','Dev mode']},
  {title:'Interaction Design',body:'Micro-animations, transitions and interactive prototypes that delight users.',tags:['Micro-interactions','Motion','Prototyping']},
  {title:'Mobile & Web',body:'Responsive UI across iOS, Android, tablet and web platforms.',tags:['iOS','Android','iPad','Responsive']},
  {title:'Front-End Dev',body:'HTML5, CSS3, SCSS, Bootstrap, Semantic UI and React component implementation.',tags:['HTML5','CSS3/SCSS','React UI']}
].map((s, i) => ({ ...s, n: '0' + (i + 1) }));

const PROCESS = [
  {title:'Research',body:'Interviews, VOC and contextual inquiry, with Claude.ai synthesising hours of transcripts into clear insight clusters.',tools:'Interviews · VOC · Claude.ai'},
  {title:'Define',body:'Personas, journey maps and HMW statements, then priorities agreed on an impact–effort matrix with product and engineering.',tools:'FigJam · Miro · IA'},
  {title:'Design',body:'Layout options generated fast, then refined by hand into a documented, accessible component system.',tools:'Figma · Figma Make · Storybook'},
  {title:'Prototype',body:'High-fidelity flows in Figma and live coded prototypes in Lovable so stakeholders can try the real thing.',tools:'Figma · Lovable'},
  {title:'Test & measure',body:'Moderated usability sessions before launch, then CSAT, completion and time-on-task tracked after.',tools:'Usability tests · GA'}
].map((s, i) => ({ ...s, n: '0' + (i + 1) }));

const TESTIMONIALS = [
  {quote:'Client or manager testimonial goes here: a short, specific quote about working with Umesh.',name:'Name Surname',role:'Role, Company'},
  {quote:'Second testimonial: ideally from a product manager or engineering lead on a shipped project.',name:'Name Surname',role:'Role, Company'},
  {quote:'Third testimonial: a freelance client speaking to outcomes and collaboration.',name:'Name Surname',role:'Role, Company'}
];
const WRITING = [
  {type:'Article',title:'Article title from Medium — add link'},
  {type:'Article',title:'Article title from Medium — add link'},
  {type:'Talk / workshop',title:'Talk or training session title — add link'}
];

// Roles and responsibilities follow the CV (Umesh-Anghan-CV.pdf). `domain` drives the logo and the website link.
const EXPERIENCE = [
  {dates:'Aug 2019 – Present',current:true,company:'Cayzen Technologies',domain:'cayzen.com',role:'Senior AI-Driven Product Designer · Scrum Master',
   points:['Lead product discovery, stakeholder workshops and UX strategy, turning business goals and research insights into clear design requirements.',
     'Design end-to-end user flows, wireframes and high-fidelity UI by hand in Figma for web and mobile products, from first sketch to final pixel.',
     'Built the design system from the ground up: colour, typography and spacing tokens, components with variants, and usage guidelines, mirrored in Storybook with engineering.',
     'Introduced an AI-first design workflow with Claude.ai, Claude Design, Figma Make and Lovable, shortening the path from idea to validated prototype.',
     'Use Claude for research synthesis, persona creation, competitive analysis, UX copy, and first drafts of user stories and acceptance criteria.',
     'Serve as Scrum Master for the product squad: facilitate sprint planning, daily stand-ups, sprint reviews and retrospectives, and remove blockers.',
     'Set up and manage ClickUp workflows (sprints, backlogs, design-review statuses, docs and dashboards) for a transparent, process-oriented delivery pipeline.',
     'Partner with product managers and engineers on usability and performance, and contribute front-end code in HTML5, CSS3, SCSS and React UI frameworks.'],
   tags:['Figma','Claude.ai','Claude Design','Figma Make','Lovable','Storybook','ClickUp','Scrum']},
  {dates:'Sep 2017 – Jul 2019',company:'Meditab',domain:'meditab.com',role:'Senior UI/UX Designer & Web Designer',
   points:['Designed and developed responsive web applications and healthcare product interfaces.',
     'Led UX from requirements analysis through user flows, wireframes and prototypes to final delivery.',
     'Created UI assets for iOS, iPad and Android applications.',
     'Wrote standards-compliant code with a focus on accessibility, SEO and W3C validation.',
     'Conducted performance and usability testing, and managed analytics, cookie compliance and client coordination.'],
   tags:['Healthcare','iOS · iPad · Android','Accessibility','SEO']},
  {dates:'Mar 2015 – Aug 2017',company:'Matrix Comsec',domain:'matrixcomsec.com',role:'Senior UI/UX Designer',
   points:['Designed and developed responsive web applications and enterprise dashboards.',
     'Created UI/UX for desktop and mobile applications, from wireframes to interactive prototypes.',
     'Worked with backend teams to ensure seamless front-end integration.'],
   tags:['Enterprise dashboards','Desktop & mobile','Prototyping']},
  {dates:'Jun 2013 – Feb 2015',company:'Concept Securities Pvt. Ltd.',role:'Web & Graphic Designer',
   points:['Designed web applications, landing pages and brand materials for corporate clients.',
     'Optimised graphics and layouts, and built dynamic web content with HTML and CSS.',
     'Collaborated with marketing and development teams on implementation and testing.'],
   tags:['Web design','Branding','HTML & CSS']}
];
const TOOLS = [['Figma','Design & prototype'],['FigJam','Brainstorming'],['Claude.ai','AI-powered UX'],['Figma Make','AI iteration'],['Lovable','Live prototypes'],['Miro','Whiteboarding'],['Whimsical','Flows & maps'],['Photoshop','Image editing'],['Webflow','No-code web'],['Storybook','Component docs'],['Jira','Agile sprints'],['Git','Version control']].map(([name,use]) => ({name,use}));
const EDUCATION = [
  {degree:'B.Tech – Computer Engineering',school:'CHARUSAT University (CSPIT, Changa)',years:'2009–2013',score:'CGPA 8.5'},
  {degree:'H.S.C – Science',school:'GHSEB (RKVB)',years:'2008–2009',score:'86%'},
  {degree:'S.S.C – General',school:'GSEB (RKVB)',years:'2006–2007',score:'84.92%'}
];


const GAL = [];
const addG = (type, folder, items) => items.forEach(([n, title]) => GAL.push({ type, group: type, src: 'img/' + folder + '-' + n + '.jpg', title }));
addG('Web app','web',[[10,'Insurance Portal'],[12,'Stock Dashboard'],[11,'Custom Dashboard'],[1,'Booking System'],[3,'Office Mato Web'],[2,'Define X'],[9,'Engage Web'],[5,'Cosec Web'],[6,'SAMAS'],[7,'DR Catalyst'],[8,'ShowItBig']]);
addG('Mobile app','mobile',[[15,'SSE — Sports Stock Exchange'],[2,'Job Portal'],[14,'MyBZZ'],[13,'Office Mato'],[9,'Netwok Mobile'],[8,'Cosec Apta'],[3,'PayQuick'],[12,'Engage'],[4,'Study Science'],[5,'Quick Realtor'],[6,'Pizza Stand']]);
addG('Website','website',[[1,'QICDRC'],[24,'AAH'],[23,'MMQ'],[21,'Surge'],[3,'beáh'],[4,'Vcare'],[20,'Social Connect'],[22,'Codemaster'],[5,'Vastu'],[6,'Dulles'],[8,'MG Hosting'],[9,'Allergy EHR'],[10,'Dr. Paul'],[11,'Nivano Physicians'],[12,'Netwok'],[13,'NJ Experts'],[14,'Cosmetisuite'],[15,'NorthVally Family Physicians'],[16,'Dr Catalyst'],[17,'Website4MD'],[19,'Immunology Specialist']]);
addG('Visual design','other',[[1,'Netwok logo'],[2,'Bright Vision logo'],[3,'Socials.io logo'],[4,'Loand logo'],[5,'Office Mato logo']]);
// Three-line descriptions shown under each Work tile, keyed by title.
const GDESC = {
  'Insurance Portal':'An agency dashboard for an insurance carrier: premium income by month, commission by agency, live policies and quote details in one view.',
  'Stock Dashboard':'A dark-mode investment dashboard showing portfolio value, interest earned, recent trades and market news at a glance.',
  'Custom Dashboard':'A sales dashboard with revenue and profit for the day, seven-day trends and top sellers, built from reusable cards and charts.',
  'Booking System':'An appointment booking flow for clinics: pick a provider, choose a time slot and confirm, with a clear thank-you step at the end.',
  'Office Mato Web':'The restaurant side of a food ordering platform: a partner dashboard for incoming orders, menu management and daily order tracking.',
  'Define X':'A personal dashboard for saved addresses, recent activity and news, with map previews and a quick way to add new locations.',
  'Engage Web':'An energy-savings web app that shows device usage, event results and tips, with progress rings and a friendly reward state.',
  'Cosec Web':'Attendance and workforce management for Matrix COSEC: monthly attendance calendars, shift schedules, leave balances and quick links.',
  'SAMAS':'A video surveillance console with live camera feeds, playback controls and licence plate capture for security operators.',
  'DR Catalyst':'Office Staff On Demand: a web app for booking temporary healthcare office staff, from request to rating the shift afterwards.',
  'ShowItBig':'A hoarding and billboard booking application: browse sites, compare sizes and mounting charges, and manage campaign orders.',
  'SSE — Sports Stock Exchange':'A mobile trading app where fans buy and sell shares in players: market prices, order book, portfolio and player profiles.',
  'Job Portal':'Hireplus, a mobile job board: search roles, follow companies, apply in a few taps and keep track of every application.',
  'MyBZZ':'A business networking app for meeting groups and events, with messaging, member discovery and membership plans.',
  'Office Mato':'The customer app for Office Mato food ordering: browse nearby restaurants, build a cart, pay and track the order live.',
  'Netwok Mobile':'Onboarding and core screens for Netwok, a networking app for connecting securely, sharing deals and joining limited-time offers.',
  'Cosec Apta':'The COSEC APTA mobile app: mark attendance from your location, view time and attendance records and apply for leave on the go.',
  'PayQuick':'A payments wallet for sending money, paying bills and reviewing transactions, with clear confirmation and status screens.',
  'Engage':'The mobile companion to Engage: connected thermostats and devices, energy events and results, all managed from a phone.',
  'Study Science':'A science learning app with topic search, chapter lessons, quizzes and progress tracking for school students.',
  'Quick Realtor':'A property rental app: browse listings by category, view photos, amenities and price, and contact the agent directly.',
  'Pizza Stand':'A pizza ordering app with sign-in, menu browsing, custom toppings, checkout and location-based delivery tracking.',
  'QICDRC':'Website for the Qatar International Court and Dispute Resolution Centre: the court, regulatory tribunal, news, events and people.',
  'AAH':'A hospital website with departments, doctor profiles, appointment booking and key facts, plus matching mobile screens.',
  'MMQ':'A government services website for the Ministry of Municipality, Qatar: service catalogue, news and announcements, with a mobile view.',
  'Surge':'An investment research website for value investors: popular stocks, a market pulse index, stock screener and portfolio advisor.',
  'beáh':'A corporate website for an environmental services holding company: vision, projects, sustainability work and news.',
  'Vcare':'A healthcare services website introducing medical services, mobile apps and care providers in a calm, friendly visual style.',
  'Social Connect':'A landing page for an app that links all your social profiles in one place, with a simple three-step explanation of how it works.',
  'Codemaster':'A software agency website covering services, process, team and blog, with a clear call to request a quote.',
  'Vastu':'A real estate website to buy, sell or rent property, with search filters and property listing cards.',
  'Dulles':'A medical practice website with services, doctor introductions, patient testimonials and appointment requests.',
  'MG Hosting':'A cloud hosting website comparing on-site and cloud plans, with pricing tables, benefits and getting-started steps.',
  'Allergy EHR':'A marketing website for an allergy-focused EHR product, showing features, screenshots and a demo request.',
  'Dr. Paul':'Website for an allergy, asthma and immunology specialist: physician bio, conditions treated, team and appointments.',
  'Nivano Physicians':'A health plan and physician group website with plans, locations, provider search and member resources.',
  'Netwok':'The marketing website for Netwok, a real-world networking app, with feature highlights and app download links.',
  'NJ Experts':'A general practitioner website with services, a welcoming hero, experienced professionals and contact options.',
  'Cosmetisuite':'A website for cosmetic specialists software, presenting practice management features and integrations.',
  'NorthVally Family Physicians':'A family medicine practice website with services, providers, patient resources and online appointment requests.',
  'Dr Catalyst':'The marketing website for Office Staff On Demand and chronic care management services for medical practices.',
  'Website4MD':'A website for an agency building EHR-integrated websites for doctors, with services, demos and practice growth tools.',
  'Immunology Specialist':'An allergy, asthma and immunology practice website with services, knowledge centre articles and locations.',
  'Netwok logo':'A logo for Netwok, "The Real Connections": a bold wordmark with a linked-people symbol in yellow on black.',
  'Bright Vision logo':'A logo for Bright Vision, an eye care brand: an eye shape formed from a single continuous purple line.',
  'Socials.io logo':'A logo for Socials.io: a network of connected nodes growing out of the wordmark to suggest social reach.',
  'Loand logo':'A logo for Loand, a property brand: a house outline that flows into the wordmark in a single line.',
  'Office Mato logo':'A logo for Office Mato food delivery: a fork set into the wordmark with speed lines for fast delivery.'
};
GAL.forEach(g => { g.desc = GDESC[g.title] || ''; });
const ORDER = []; const byType = {}; GAL.forEach(g => (byType[g.type] = byType[g.type] || []).push(g));
for (let i = 0; i < 25; i++) ['Web app','Mobile app','Website','Visual design'].forEach(t => byType[t][i] && ORDER.push(byType[t][i]));
const GTYPES = ['All','Web app','Mobile app','Website','Visual design'];
const GLABEL = { 'All':'All', 'Web app':'Web apps', 'Mobile app':'Mobile apps', 'Website':'Websites', 'Visual design':'Visual design' };
