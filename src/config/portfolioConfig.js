/**
 * Centralized Portfolio Configuration
 * Primary source of truth synced with Jay Suriya R's CV, Resume, and verified GitHub repositories.
 * Update personal details, profileImage, project screenshots, links, or EmailJS credentials here.
 */

export const portfolioConfig = {
  seo: {
    title: 'JAY SURIYA R — AI Engineer, Creative Developer & Software Builder',
    description:
      'Computer Science undergraduate at IIIT Sri City building AI/ML systems, Computer Vision pipelines, Data Analytics workflows, and Full-Stack applications.',
    url: 'https://jaysuriya-portfolio.vercel.app/',
    keywords:
      'Jay Suriya R, IIIT Sri City, AI Engineer, Machine Learning, Computer Vision, YOLOv8, PyTorch, FastAPI, NestJS, React, Portfolio',
  },

  personal: {
    firstName: 'JAY',
    lastName: 'SURIYA R',
    fullName: 'JAY SURIYA R',
    initials: 'JAY SURIYA R',
    heroRole: 'AI ENGINEER / CREATIVE DEVELOPER / SOFTWARE BUILDER',
    heroStatement: 'Building intelligent systems and immersive digital experiences.',
    location: 'Chennai, Tamil Nadu, India',
    institution: 'Indian Institute of Information Technology (IIIT) Sri City',
    degree: 'B.Tech in Computer Science and Engineering',
    expectedGraduation: '2024–2028 (Expected)',
    cgpa: '8.32 / 10',
    email: 'jaysuriya.rv@gmail.com',
    phone: '+91 6382982096',
    resumeUrl: '/Jay_Suriya_R_Resume.pdf',
    // Set to '/profile.jpg' for Hero 3D Core and '/about-portrait.jpg' for About section
    profileImage: '/profile.jpg',
    aboutImage: '/about-portrait.jpg',
  },

  socials: {
    github: 'https://github.com/JAYSURIYA02',
    linkedin: 'https://www.linkedin.com/in/jay-suriya-963582323/',
    leetcode: 'https://leetcode.com/u/jaysuriya_r/',
    portfolio: 'https://jaysuriya-portfolio.vercel.app/',
    email: 'mailto:jaysuriya.rv@gmail.com',
  },

  navigation: [
    { label: 'HOME', href: '#hero', id: 'hero' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'WORK', href: '#work', id: 'work' },
    { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'EDUCATION', href: '#education', id: 'education' },
    { label: 'ACHIEVEMENTS', href: '#achievements', id: 'achievements' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ],

  about: {
    heading: 'BEYOND THE CODE.',
    paragraphs: [
      "I'm Jay Suriya R, a Computer Science and Engineering undergraduate at IIIT Sri City passionate about building intelligent systems, solving complex engineering problems, and creating meaningful digital experiences.",
      'My experience spans Python-based data handling, exploratory analysis, machine learning, computer vision, and full-stack software development — from multi-lane traffic video analysis and CNN defect inspection to role-based logistics platforms.',
      'Following a Data Analytics internship at InAmigos Foundation and leadership as a Core Member across the Epoch AI/ML Club and Nexsync Smart Mobility Club, I focus on turning raw data and research into reliable, deployed engineering.',
    ],
    researchInterests: [
      'Computer Vision',
      'Machine Learning',
      'Data Analytics',
      'Intelligent Transportation Systems',
      'Anomaly Detection',
      'Deep Learning',
    ],
  },

  skills: {
    tickerItems: [
      'PYTHON',
      'PYTORCH',
      'OPENCV',
      'YOLOV8',
      'SCIKIT-LEARN',
      'FASTAPI',
      'NESTJS',
      'TYPESCRIPT',
      'REACT',
      'PANDAS',
      'NUMPY',
      'MYSQL',
      'SQLITE',
      'CNNS',
    ],
    categories: [
      {
        index: '01',
        title: 'PROGRAMMING',
        accent: 'Core Languages',
        items: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'TypeScript', 'HTML / CSS'],
      },
      {
        index: '02',
        title: 'DATA ANALYTICS',
        accent: 'Analysis & Research',
        items: [
          'NumPy',
          'Pandas',
          'Matplotlib',
          'Data Cleaning',
          'Normalization',
          'Exploratory Data Analysis',
          'Data Visualization',
          'Structured Research',
        ],
      },
      {
        index: '03',
        title: 'AI / MACHINE LEARNING & CV',
        accent: 'Models & Vision Pipelines',
        items: [
          'PyTorch',
          'Scikit-learn',
          'OpenCV',
          'YOLOv8',
          'Neural Networks & CNNs',
          'Supervised, Unsupervised & RL',
          'Object Detection & Segmentation',
          'Image Classification',
          'Feature Extraction & Transfer Learning',
          'Model Evaluation & Optimization (SGD, Adam)',
        ],
      },
      {
        index: '04',
        title: 'BACKEND & FULL-STACK',
        accent: 'APIs & Web Systems',
        items: ['FastAPI', 'NestJS', 'Node.js', 'React', 'Flask', 'API Integration & Routing', 'MySQL', 'SQLite'],
      },
      {
        index: '05',
        title: 'TOOLS & CORE CS',
        accent: 'Foundations & Workflow',
        items: [
          'Git',
          'Data Structures & Algorithms',
          'Object-Oriented Programming',
          'DBMS',
          'Problem Solving',
          'Logical Reasoning',
          'Spreadsheets & Google Drive',
          'AI-Assisted Research',
        ],
      },
    ],
  },

  projects: [
    {
      id: 'grid-traffic-analysis',
      number: '01',
      category: 'Computer Vision · Research',
      filterGroup: 'ai-cv',
      title: 'INTELLIGENT TRAFFIC MONITORING SYSTEM',
      shortTitle: 'Grid-Based Traffic Analysis',
      description:
        'A grid-based motion-detection baseline for vehicle classification (Car, Van, Bus), traffic-density estimation, multi-object tracking and counting, and speed estimation in multi-lane surveillance video — benchmarked across sequential and parallel implementations on UA-DETRAC.',
      technologies: ['Python', 'OpenCV', 'NumPy', 'Pandas', 'Flask'],
      image: '/projects/traffic-calibration.png',
      secondaryImage: '/projects/traffic-flow.png',
      visualType: 'image',
      githubUrl: 'https://github.com/JAYSURIYA02/grid-based-traffic-analysis',
      demoUrl: null,
      status: 'Research Pipeline',
      architecture: [
        'Grid occupancy analysis and active-cell grouping over calibrated multi-lane highway video frames (pixel-to-meter scaling).',
        'Contour-based motion detection, frame differencing, centroid tracking, and temporal smoothing for counting and speed estimation.',
        'Fair-comparison benchmark between sequential (seq.py) and parallel (rparallel_he3.py) execution pipelines.',
        'Evaluated Car, Van, and Bus classification on UA-DETRAC using precision, recall, F1-score, and confusion matrices across grid resolutions.',
      ],
      metrics: [
        { label: 'Dataset', value: 'UA-DETRAC' },
        { label: 'Vehicle Classes', value: 'Car / Van / Bus' },
        { label: 'Execution Modes', value: 'Seq vs Parallel' },
      ],
    },
    {
      id: 'swifttrack-logistics',
      number: '02',
      category: 'Full-Stack · System Architecture',
      filterGroup: 'fullstack',
      title: 'SWIFTTRACK DELIVERY PLATFORM',
      shortTitle: 'Order Dispatch & Delivery Tracking',
      description:
        'A multi-tenant order dispatch and delivery tracking platform built around real logistics workflows, role-based access for merchants, hub managers, delivery agents, customers, and admins, plus pricing, payments, and revenue reporting.',
      technologies: ['NestJS', 'TypeScript', 'Node.js', 'React', 'SQLite'],
      image: null,
      visualType: 'swifttrack',
      githubUrl: 'https://github.com/IIIT-Sricity-FSD-2024-2028/38_TransitCoders',
      demoUrl: null,
      status: 'Full-Stack System',
      architecture: [
        'Five distinct role-based interfaces and workflows: Merchant, Hub Manager, Delivery Agent, Customer, and Admin.',
        'NestJS + TypeScript backend APIs managing authentication, dispatch queues, inter-hub transit, and SQLite persistence.',
        'Integrated service tiers (Standard, Express, Same-Day), dynamic pricing, payment workflows, and revenue reporting.',
      ],
      metrics: [
        { label: 'System Actors', value: '5 Role Workflows' },
        { label: 'Backend Core', value: 'NestJS + TS' },
        { label: 'Persistence', value: 'SQLite / SQL' },
      ],
    },
    {
      id: 'manufacturing-anomaly',
      number: '03',
      category: 'Deep Learning · Faculty-Guided',
      filterGroup: 'ai-cv',
      title: 'MANUFACTURING DEFECT ANOMALY DETECTION',
      shortTitle: 'Visual Quality Inspection CNN',
      description:
        'Ongoing faculty-guided computer vision system exploring convolutional autoencoders and reconstruction-error thresholding to distinguish defective manufacturing patterns from normal product appearances on the MVTec AD benchmark.',
      technologies: ['Python', 'PyTorch', 'OpenCV', 'NumPy', 'CNNs'],
      image: null,
      visualType: 'anomaly',
      githubUrl: 'https://github.com/JAYSURIYA02/Anomaly-detector-for-Manufacturing-products',
      demoUrl: null,
      status: 'Ongoing Research',
      architecture: [
        'Convolutional Autoencoder (Conv_AE) trained on normal industrial textures and object samples at 256×256 resolution.',
        'Pixel-level MSE reconstruction error maps benchmarked across MVTec AD categories (e.g., bottle segmentation & threshold comparison).',
        'Statistical anomaly thresholding comparing 99th-percentile (0.002958), Mean + 2σ (0.002792), and Mean + 3σ (0.003112) validation baselines.',
      ],
      metrics: [
        { label: 'Benchmark', value: 'MVTec AD' },
        { label: '99th Pct Threshold', value: '0.002958 MSE' },
        { label: 'Architecture', value: 'Conv Autoencoder' },
      ],
    },
    {
      id: 'mysterious-road',
      number: '04',
      category: 'Intelligent Transportation · Nexsync',
      filterGroup: 'ai-cv',
      title: 'MYSTERIOUS-ROAD-TECHNOLOGY',
      shortTitle: 'Multi-Task Road Hazard & Lane Analysis',
      description:
        'AI-powered road analysis system built with Nexsync Smart Mobility Club across 10K+ road images, fusing YOLOv8 detection, semantic lane segmentation, and Canny edge detection to locate potholes, lane markings, speed bumps, and road irregularities.',
      technologies: ['Python', 'YOLOv8', 'OpenCV', 'Segmentation', 'Canny Edge'],
      image: '/projects/road-detection.png',
      visualType: 'image',
      githubUrl: 'https://github.com/JAYSURIYA02/mysterious-road-detection',
      demoUrl: null,
      status: 'Nexsync Club',
      architecture: [
        'Combined inference pipeline (`combiner.py`) merging trained lane segmentation weights with pothole/speed-bump YOLOv8 detector weights.',
        'Canny edge detection and mask post-processing overlays across 10,000+ diverse road scene images.',
        'Designed for real-time Intelligent Transportation System road hazard alerting and lane boundary understanding.',
      ],
      metrics: [
        { label: 'Dataset Scale', value: '10K+ Images' },
        { label: 'Detection', value: 'YOLOv8 + Seg' },
        { label: 'Domain', value: 'ITS / Mobility' },
      ],
    },
    {
      id: 'collegenator',
      number: '05',
      category: 'Algorithms & Full-Stack',
      filterGroup: 'fullstack',
      title: 'COLLEGENATOR M-WAY TREE DETECTOR',
      shortTitle: 'Akinator-Style Character Engine',
      description:
        'Adaptive Akinator-style guessing system built for UG-2 (Batch 2028) students at IIIT Sri City using M-Way decision-tree traversal, real-time dataset filtering, data cleaning, normalization, and attribute mapping.',
      technologies: ['Python', 'FastAPI', 'Pandas', 'HTML/CSS', 'JavaScript'],
      image: null,
      visualType: 'collegenator',
      githubUrl: 'https://github.com/JAYSURIYA02/Collegenator',
      demoUrl: 'https://collegenator.vercel.app/',
      status: 'Live Deployment',
      architecture: [
        'M-Way decision tree traversal narrowing candidate identities dynamically via information-rich attribute questions.',
        'FastAPI + Uvicorn backend processing normalized Pandas datasets and real-time filtering queries.',
        'Deployed frontend on Vercel with backend API support for instant interactive gameplay.',
      ],
      metrics: [
        { label: 'Data Structure', value: 'M-Way Tree' },
        { label: 'API Layer', value: 'FastAPI' },
        { label: 'Deployment', value: 'Live on Vercel' },
      ],
    },
    {
      id: 'face-to-place-gesture',
      number: '06',
      category: 'Computer Vision · Epoch AI/ML',
      filterGroup: 'ai-cv',
      title: 'FACE TO PLACE & GESTURE CONTROL',
      shortTitle: 'Biometric Attendance + Real-Time MediaPipe',
      description:
        'Dual computer vision systems built as a Core Member of Epoch AI/ML Club: Face to Place pairs DeepFace facial recognition with Pyzbar QR tracking for smart attendance, while Gesture-Controlled Subway Surfers converts MediaPipe hand landmarks into real-time game inputs.',
      technologies: ['Python', 'OpenCV', 'DeepFace', 'Pyzbar', 'MediaPipe'],
      image: null,
      visualType: 'vision-suite',
      githubUrl: 'https://github.com/JAYSURIYA02/FACE-TO-PLACE',
      secondaryGithubUrl: 'https://github.com/moparthipranav/GestureControl',
      secondaryGithubLabel: 'GestureControl Repo',
      demoUrl: null,
      status: 'Epoch CV Domain',
      architecture: [
        'Face to Place: real-time facial recognition (`DeepFace`) paired with `Pyzbar` QR-code decoding and CSV attendance logging.',
        'Gesture-Controlled Subway Surfers: hand-landmark detection (`MediaPipe`) with gesture-recognition data collection and augmentation.',
        'Low-latency OpenCV video capture loops engineered for live webcam inference.',
      ],
      metrics: [
        { label: 'Biometrics', value: 'DeepFace + QR' },
        { label: 'Tracking', value: 'MediaPipe' },
        { label: 'Club', value: 'Epoch AI/ML' },
      ],
    },
  ],

  experience: [
    {
      period: 'July 2026 – Aug 2026',
      roleType: 'INTERNSHIP',
      title: 'Data Analytics Intern',
      organization: 'InAmigos Foundation',
      highlight: '5 AI Strategies · 15+ Opportunities',
      bullets: [
        'Researched NGOs across education, women empowerment, healthcare, animal welfare, and environmental conservation, compiling structured datasets of organizational profiles and initiatives.',
        'Developed 5 AI-driven strategies to enhance NGO fundraising, volunteer engagement, community outreach, and digital presence.',
        'Used AI-assisted research and summarization to synthesize information, identify key themes, and prepare research reports and strategic recommendations.',
        'Compiled 15+ volunteering opportunities, internships, fellowships, and social initiatives across India, recording eligibility, application links, deadlines, and organization details.',
        'Organized findings and deliverables using spreadsheets, digital documentation, and Google Drive for easier access and comparison.',
      ],
    },
    {
      period: 'Aug 2025 – Aug 2026',
      roleType: 'CLUB LEADERSHIP',
      title: 'Core Member — Computer Vision Domain',
      organization: 'Epoch AI/ML Club, IIIT Sri City',
      highlight: 'Computer Vision & Image Processing',
      summary: 'Contributed to projects related to computer vision and image processing.',
      bullets: [
        'Gesture-Controlled Subway Surfers: Built a real-time gesture-based gaming system using Python, OpenCV, and MediaPipe; contributed to gesture-recognition data collection and augmentation.',
        'Face to Place: Developed an AI-powered smart attendance system using Python, OpenCV, DeepFace, and Pyzbar for real-time facial recognition and QR-based attendance tracking.',
      ],
      links: [
        { label: 'GestureControl ↗', url: 'https://github.com/moparthipranav/GestureControl' },
        { label: 'Face to Place ↗', url: 'https://github.com/JAYSURIYA02/FACE-TO-PLACE' },
      ],
    },
    {
      period: 'Aug 2025 – Aug 2026',
      roleType: 'CLUB LEADERSHIP',
      title: 'Core Member — AI/ML Domain',
      organization: 'Nexsync Smart Mobility Club, IIIT Sri City',
      highlight: 'Intelligent Transportation Systems',
      summary: 'Contributed to Intelligent Transportation System projects involving computer vision and deep learning.',
      bullets: [
        'Mysterious-road-technology: Built an AI-powered road analysis system using YOLOv8, image segmentation, and Canny edge detection on a dataset of 10K+ road images, targeting potholes, lane markings, speed bumps, and road irregularities.',
      ],
      links: [
        { label: 'Mysterious-road-detection ↗', url: 'https://github.com/JAYSURIYA02/mysterious-road-detection' },
      ],
    },
  ],

  education: {
    entries: [
      {
        index: '01',
        period: '2024 – 2028 (Expected)',
        level: 'UNDERGRADUATE',
        degree: 'B.Tech in Computer Science and Engineering',
        institution: 'Indian Institute of Information Technology (IIIT) Sri City',
        metrics: ['CGPA: 8.32 / 10'],
        summary:
          'Focused on Data Structures & Algorithms, Machine Learning, Deep Learning, Computer Vision, Databases, and Full-Stack Software Engineering.',
      },
      {
        index: '02',
        period: '2022 – 2024',
        level: 'SENIOR SECONDARY · CBSE',
        degree: 'Senior Secondary & Secondary Education',
        institution: 'Everwin Vidhyashram, Kolathur, Chennai',
        metrics: ['Class XII: 93.4%', 'Class X: 94.2%'],
        summary:
          'Completed CBSE Board Examinations with distinction across Science, Mathematics, and Computer Science foundations.',
      },
    ],
    coursework: [
      'Data Structures & Algorithms',
      'Machine Learning',
      'Deep Learning',
      'Linear Algebra',
      'Probability & Statistics',
      'Operating Systems',
      'Computer Networks',
      'Database Management Systems (DBMS)',
      'Object-Oriented Programming',
      'Discrete Mathematics',
      'Signals and Systems',
      'Full-Stack Development',
      'Digital Logic',
    ],
  },

  achievements: [
    {
      index: '01',
      year: '2026',
      scope: 'INTER-IIIT LEVEL',
      title: 'Inter-IIIT Hackathon 2026 – “UDHBHAV”',
      badge: 'Won Round 1 · Qualified Round 2',
      description:
        'Won Round 1 at the IIIT Sri City institutional level and selected to represent in the Second Round.',
    },
    {
      index: '02',
      year: '2026',
      scope: 'COLLEGE LEVEL',
      title: 'Healthcare Hackathon Ideaverse (Abisarga’26)',
      badge: 'Promising Idea Award',
      description:
        'Received the Promising Idea award at the college-level Healthcare Hackathon Ideaverse during Abisarga’26.',
    },
    {
      index: '03',
      year: 'KAGGLE LEADERBOARD',
      scope: 'CFI IIT MADRAS',
      title: 'Intro to AI Hackathon',
      badge: '8th Place / 168 Entries',
      description:
        'Predicted spaceship passenger survival using machine learning models and secured 8th place out of 168 entries on the Kaggle leaderboard.',
    },
  ],

  contact: {
    heading: "LET'S BUILD SOMETHING EXTRAORDINARY.",
    subheading: 'Have an interesting idea, engineering challenge, or research collaboration? Let’s connect.',
    // Optional EmailJS credentials — leave empty to use the built-in mailto fallback cleanly.
    emailjs: {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
    },
  },
};
