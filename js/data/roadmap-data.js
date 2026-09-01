/**
 * BarrierVerse - Open Source Ecosystem, Repositories, Roadmap & Transparency Data
 */

export const OPEN_SOURCE_DATA = {
  stats: {
    githubStars: 3420,
    contributorsCount: 248,
    forksCount: 618,
    languagesSupported: 14,
    prsMerged: 1180,
    codeLicense: "MIT / Apache 2.0 (Dual Licensed)"
  },
  repositories: [
    {
      id: "repo-vr-webxr",
      name: "barrierverse-webxr-engine",
      badge: "Core VR",
      description: "Interactive WebGL/WebXR Three.js environment simulator with dynamic Reality Switch shaders and 3D barrier physics.",
      stars: 1240,
      forks: 215,
      language: "JavaScript / Three.js / GLSL",
      githubUrl: "https://github.com/barrierverse/barrierverse-webxr-engine",
      goodFirstIssuesCount: 8
    },
    {
      id: "repo-ai-yolo",
      name: "barrier-detector-yolov8",
      badge: "Computer Vision",
      description: "Custom YOLOv8 neural network trained on 10,000+ Indian urban barrier photos for instant ramp angle and hazard detection.",
      stars: 980,
      forks: 184,
      language: "Python / PyTorch / ONNX",
      githubUrl: "https://github.com/barrierverse/barrier-detector-yolov8",
      huggingFaceUrl: "https://huggingface.co/barrierverse/barrier-detector-v2",
      goodFirstIssuesCount: 5
    },
    {
      id: "repo-mobile-app",
      name: "barrierverse-mobile",
      badge: "Mobile App",
      description: "Offline-first React Native PWA for crowd auditing, on-device photo compression, and GPS route verification.",
      stars: 640,
      forks: 120,
      language: "TypeScript / React Native",
      githubUrl: "https://github.com/barrierverse/barrierverse-mobile",
      goodFirstIssuesCount: 11
    },
    {
      id: "repo-backend-api",
      name: "barrierverse-core-api",
      badge: "Backend & Geo",
      description: "High-throughput FastAPI / PostGIS geospatial backend serving vector map tiles, DPDP-compliant anonymization, and live WebSockets.",
      stars: 560,
      forks: 99,
      language: "Python / FastAPI / PostGIS",
      githubUrl: "https://github.com/barrierverse/barrierverse-core-api",
      goodFirstIssuesCount: 6
    }
  ],
  datasets: [
    {
      id: "dataset-barriers-india",
      title: "Indian Urban Accessibility Dataset (IUAD-10K)",
      format: "GeoJSON / CSV / Parquet",
      size: "42 MB (Geo) / 2.4 GB (Images)",
      itemsCount: "10,240 geo-tagged annotations",
      description: "Anonymized, expert-verified dataset of physical barriers across 42 Indian cities with dimension labels and severity tags.",
      downloadLink: "https://data.barrierverse.org/downloads/iuad-10k-v2.geojson",
      license: "Creative Commons CC-BY 4.0"
    },
    {
      id: "dataset-audit-templates",
      title: "Universal Built-Environment Audit Checklist",
      format: "PDF/UA, DOCX, Machine-Readable JSON",
      size: "1.8 MB",
      itemsCount: "128 Inspection Parameters",
      description: "Comprehensive WCAG + RPWD Harmonised Guidelines checklist for universities, hospitals, transit, and offices.",
      downloadLink: "https://data.barrierverse.org/downloads/barrierverse-audit-checklist-2026.pdf",
      license: "Open Knowledge License"
    }
  ],
  roadmap: [
    {
      id: "road-1",
      title: "Offline SMS & WhatsApp Reporting Gateway for Low-Bandwidth Regions",
      status: "in-progress", // in-progress | planned | rfc
      category: "Mobile & Core",
      upvotes: 142,
      description: "Enables citizens with 2G feature phones to report street barriers via simple SMS/WhatsApp prompts without needing internet data.",
      lead: "@priya-dev (Community Contributor)",
      targetRelease: "Q2 2026"
    },
    {
      id: "road-2",
      title: "Hindi & Regional Language Voice Model Fine-Tuning for Speech-to-Text",
      status: "in-progress",
      category: "AI & Speech",
      upvotes: 118,
      description: "Optimizing on-device Whisper models for Indian regional accents (Bhojpuri, Tamil, Marathi, Bengali) in audio barrier descriptions.",
      lead: "@arjun-ml (IITP Research Fellow)",
      targetRelease: "Q2 2026"
    },
    {
      id: "road-3",
      title: "WebXR Immersive Headset Mode for Meta Quest & Apple Vision Pro",
      status: "planned",
      category: "VR / WebXR",
      upvotes: 89,
      description: "True 6DoF stereoscopic VR room-scale navigation with virtual wheelchair controller physics and hand-tracking tactile feedback.",
      lead: "@vr-wg (Three.js Working Group)",
      targetRelease: "Q3 2026"
    },
    {
      id: "road-4",
      title: "Municipal Smart City API Gateway for Automated Municipal Workorders",
      status: "planned",
      category: "GovTech Integration",
      upvotes: 76,
      description: "Standardized webhook pipeline to push verified barrier reports directly into civic municipal grievance portals (e.g. BBMP Sahaaya, MCD311).",
      lead: "@govtech-fellows",
      targetRelease: "Q3 2026"
    },
    {
      id: "road-5",
      title: "RFC #042: Decentralized Volunteer Reputation & Proof of Fix Protocol",
      status: "rfc",
      category: "Governance & Trust",
      upvotes: 54,
      description: "Community discussion on multi-party cryptographic verification rules before marking a barrier as officially resolved on the live map.",
      lead: "@steering-committee",
      targetRelease: "RFC Voting Closes April 2026"
    }
  ],
  transparency: {
    fundingSources: [
      { name: "Non-Profit Tech Grants & Foundations", percentage: 65, amount: "₹19.5 Lakhs", color: "#3b82f6" },
      { name: "Individual Community Donations (GitHub Sponsors/OpenCollective)", percentage: 35, amount: "₹10.5 Lakhs", color: "#10b981" },
      { name: "Venture Capital / Commercial Investors", percentage: 0, amount: "₹0 (Strict Non-Profit Charter)", color: "#94a3b8" }
    ],
    spendingBreakdown: [
      { name: "PwD Advisory Board & Community Writer Honorariums", percentage: 40, amount: "₹12.0 Lakhs", color: "#8b5cf6" },
      { name: "Cloud Servers, Vector Tile CDN & GPU Model Hosting", percentage: 35, amount: "₹10.5 Lakhs", color: "#06b6d4" },
      { name: "Accessible Campus Hackathons & Community Workshops", percentage: 25, amount: "₹7.5 Lakhs", color: "#f59e0b" },
      { name: "Executive Salaries & Profits", percentage: 0, amount: "₹0 (100% Volunteer / Grant Stipends Only)", color: "#ef4444" }
    ],
    governance: {
      steeringCommitteePwdRatio: "50%",
      developerRatio: "25%",
      institutionRatio: "25%",
      meetingSchedule: "First Sunday of Every Month (Open Zoom + Public Transcript)"
    }
  }
};
