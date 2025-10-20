// data/projectsData.js

export const projectsData = [
    { 
      id: 1, 
      name: 'Dynamic PP', 
      date: '2025-09-27',
      displayDate: '09/27/25',
      professionalism: 21,
      hackathonWinner: true,
      description: 'Control your mouse by moving your iPhone around the room using motion sensors and click by elevation',
      longDescription: 'This project uses React Native to capture iPhone motion data and transmits it via WebSocket to control \
      your computer cursor. The elevation changes allow you to click, making it a hands-free pointing device. Built during a hackathon in 24 hours.',
      tags: ['React Native', 'WebSocket', 'Hackathon'], 
      icon: '/projects/stupid.jpg', 
      image: '',
      screenshots: ["/projects/stupid1.jpeg"],
      screenshotCaptions: ["Me with: Satyam Singh"],
      gradientColor: 'from-blue-500/20 to-cyan-500/20', 
      iconBg: 'from-blue-500 to-cyan-500', 
      lucideIcon: 'Smartphone',
      links: {
        github: 'https://github.com/alextgu/stupid_hacks',
        devpost: 'https://devpost.com/software/dynamic-pp-positional-pointer',
        demo: 'https://www.youtube.com/watch?time_continue=1&v=2xY7A5fn3Zw&embeds_referring_euri=https%3A%2F%2Fdevpost.com%2F&source_ve_path=Mjg2NjY'
      },
      alexScale: 94,
    },
    { 
      id: 2, 
      name: 'DisasteRisk*', 
      date: '2025-10-05',
      displayDate: '10/5/25',
      professionalism: 93,
      description: 'Draw regions on a 3D globe to analyze disaster impact on populations and infrastructure, with AI-powered insights', 
      longDescription: 'DisasteRisk is an interactive web app that visualizes and assesses disaster impact zones worldwide. \
      Users can explore a 3D globe, draw custom regions, and analyze key data to identify vulnerable areas and populations. By \
      combining population, infrastructure, and risk data from multiple APIs, DisasteRisk generates fast, actionable insights for both \
      real and simulated disasters. It helps first responders and relief teams quickly locate high-risk zones, allocate resources efficiently, \
       and make data-driven decisions during emergencies. Was really bummed this one didn’t win, but I think in the end the project use significance \
       wasn’t strong enough. I still believe it has lots of potential.',
      tags: ['React', 'API', 'Hackathon'], 
      icon: 'projects/htv.png', 
      image: 'projects/htv-ex.jpg', 
      gradientColor: 'from-red-500/20 to-orange-500/20', 
      iconBg: 'from-red-500 to-orange-500', 
      lucideIcon: 'AlertTriangle',
      screenshots: ['/projects/htv1.jpg'],
      screenshotCaptions: ['I needed a haircut...'],
      links: {
        github: 'https://github.com/alextgu/disasteRisk',
        devpost: 'https://devpost.com/software/disasterisk',
        demo: 'https://www.youtube.com/watch?time_continue=1&v=5T6N-Y1boDg&embeds_referring_euri=https%3A%2F%2Fdevpost.com%2F&source_ve_path=Mjg2NjY'
      },
      alexScale: 73,
    },
    { 
      id: 3, 
      name: 'TrueCount', 
      date: '2025-09-14',
      displayDate: '09/14/25',
      professionalism: 94,
      hackathonWinner: true,
      description: 'Privacy-first voting system where votes are cryptographically hidden, then revealed and locked on-chain forever', 
      longDescription: 'TrueCount is a decentralized, phase-based voting system that ensures fair and transparent elections by replacing \
      human moderators with verifiable smart contracts. Built on Ethereum, it uses a commit–reveal–finalize process where votes are first \
      hidden with a cryptographic hash, then revealed and permanently recorded on-chain. This design guarantees privacy, integrity, and \
      transparency—every vote is private during the commit phase, mathematically verified during reveal, and forever auditable after finalization.\
      This was one of the best events I’ve been to. I was easily one of the least experienced people at the event, but the even thaught me so much about tech, jobs \
      and even building my self confidence to speak and network. Met a lot of amazing people and got so much free swag.',
      tags: ['Blockchain', 'Ethereum', 'Hackathon'], 
      icon: 'projects/htn.jpeg', 
      image: 'projects/htnimage.jpg', 
      gradientColor: 'from-purple-500/20 to-pink-500/20', 
      iconBg: 'from-purple-500 to-pink-500', 
      lucideIcon: 'Vote',
      screenshots: ["/projects/htn1.JPG", "/projects/htn2.jpeg"],
      screenshotCaptions: ["Team", "Lettuce eating compeitition (I placed second out of ~20)"],
      links: {
        github: 'https://github.com/MartinPatr/TrueCount',
        devpost: 'https://devpost.com/software/truecount',
        demo: 'https://www.youtube.com/watch?v=DhhBWVDUrU4',
      },
      alexScale: 96,
    },
    { 
      id: 4, 
      name: 'Outcognito Mode', 
      date: '2025-10-12',
      displayDate: '10/12/25',
      professionalism: 2,
      description: 'Automatically posts your Google searches to X (Twitter) in real-time for literally no reason at all', 
      longDescription: 'Outcognito Mode is a live transparency bot that posts your Google searches to Twitter/X in real time.\
       The bot monitors your active Chrome session and automatically posts batches of up to ten recent Google searches every 30 \
       seconds. It only tracks searches while it’s running, so it won’t dig into your old history (thankfully). This is a Python\
        remake of Harold Cooper’s 2017 Chrome extension of the same concept, which no longer exists on the Chrome Web Store. I \
        really like making these "stupid" projects because it doesn’t feel like there are limitations :). My next "stupid" project\
         will be even crazier and unique.',
      tags: ['Python', 'Twitter API'], 
      icon: '/projects/outcognito.png', 
      image: '', 
      gradientColor: 'from-slate-500/20 to-gray-500/20', 
      iconBg: 'from-slate-500 to-gray-500', 
      lucideIcon: 'Eye',
      screenshots: [],
      screenshotCaptions: [],
      links: {
        github: 'https://github.com/alextgu/outcognito'
      },
      alexScale: 80,
    },
    { 
      id: 5, 
      name: 'ASCII Art Converter', 
      date: '2025-01-03',
      displayDate: '01/3/25',
      professionalism: 12,
      description: 'Transform any image into "beautiful" ASCII art 😱',
      longDescription: 'This was my first real project! It was a simple one, but it took me way longer than it should have \
      and I’m pretty sure I ended up using AI to finish it because it was too hard to figure out at the time. Still, it taught \
      me how to properly set up my environment and install dependencies (I installed the Python library Pillow in a virtual environment!).\
       I wanted to show a contrast between my early and more polished projects, so I’m keeping this one here as a reminder of where I started.',
      tags: ['Python', 'Pillow'], 
      icon: '/projects/ascii.png', 
      image: '/projects/ascii.png', 
      gradientColor: 'from-green-500/20 to-emerald-500/20', 
      iconBg: 'from-green-500 to-emerald-500', 
      lucideIcon: 'Image',
      screenshots: [],
      screenshotCaptions: [],
      links: {
        github: 'https://github.com/alextgu/ASCII-Art-Converter'
      },
      alexScale: 20,
    },
    { 
      id: 6, 
      name: 'Pathway', 
      date: '2025-02-15',
      displayDate: '02/15/25',
      professionalism: 90,
      description: 'AI course advisor that scrapes UofT course catalog and recommends personalized courses based on your interests',
      longDescription: 'Pathway is a project that scrapes the UofT course list website and collects information from users about \
      their interests. Using that data, the AI recommends the most suitable courses based on each user’s preferences. This was my \
      first hackathon, and honestly, it set me back a bit in my coding journey. I missed the planning phase and got thrown into a \
      project without even knowing the basics of Git! Despite contributing very little, I still slept less than two hours. In the \
      end the experience humbled me and taught me how crucial proper planning is before jumping into a project.',
      tags: ['Next.js', 'OpenAI', 'Hackathon'], 
      icon: '/projects/dh.png', 
      image: '', 
      gradientColor: 'from-indigo-500/20 to-blue-500/20', 
      iconBg: 'from-indigo-500 to-blue-500', 
      lucideIcon: 'GraduationCap',
      screenshots: [],
      screenshotCaptions: [],
      links: {
        github: 'https://github.com/alextgu/Pathway_App',
        devpost: 'https://devpost.com/software/pathway-9ne2sq'
      },
      alexScale: 34,
    },
  ];
  
  export const featuredContent = [
    { 
      title: "Project a week challenge!", 
      description: "Building and shipping a new project every week", 
      link: "/projectaweek", 
      color: "from-blue-500/20 to-purple-500/20", 
      iconColor: "text-blue-500" 
    }
  ];
  
  export const iconMap = {
    Smartphone: 'Smartphone',
    Vote: 'Vote',
    Eye: 'Eye',
    AlertTriangle: 'AlertTriangle',
    Image: 'Image',
    GraduationCap: 'GraduationCap',
    Calendar: 'Calendar'
  };
  