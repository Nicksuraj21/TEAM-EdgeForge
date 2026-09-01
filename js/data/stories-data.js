/**
 * BarrierVerse - Stories & Blog Dataset
 * Impactful essays, fix celebrations, field diaries, and research reports
 * Includes Easy-Read simplified versions and full audio transcriptions
 */

export const BLOG_STORIES = [
  {
    id: "story-metro-independent",
    title: "The Metro Station I Couldn't Enter: How 47 Upvotes Rebuilt a Gate Line",
    subtitle: "When a simple fare gate blocked my motorized wheelchair, the community rallied to turn a barrier into a model transit hub.",
    category: "Fix Celebrations",
    categorySlug: "fix-celebrations",
    author: {
      name: "Rahul Sharma",
      role: "Student Advocate & Motorized Wheelchair User",
      bio: "Computer Science student at Delhi University, writing about assistive tech, urban mobility, and civil rights.",
      photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
      isPwD: true,
      honorariumReceived: "₹4,000 (Community Writer Grant)"
    },
    date: "February 24, 2026",
    readingTime: "5 min read",
    location: "New Delhi",
    heroImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Front entrance of Delhi metro station showcasing wide accessible turnstile and smooth tactile flooring",
    easyReadVersion: `
      • Rahul uses an electric wheelchair to travel to college.
      • The metro station entrance gate was too narrow (only 55 cm). His wheelchair was 68 cm wide.
      • Rahul could not enter the station on his own. He had to ask guards to lift him every day.
      • He took a photo and reported the barrier on BarrierVerse.
      • 47 people upvoted the report and volunteers verified it.
      • The Metro management saw the report and installed a new 95 cm wide automatic gate.
      • Now, Rahul and many other disabled people can travel freely and with dignity.
    `,
    content: `
      <p class="lead-paragraph">Every morning at 8:15 AM, my day began with a humiliating compromise. I would roll up to Gate 2 of the Connaught Place Metro Station in my motorized wheelchair, only to find three narrow 550mm flap turnstiles standing between me and my engineering classes at Delhi University.</p>

      <h3>The Invisible Wall</h3>
      <p>My wheelchair measures 680mm wheel-to-wheel. To get onto the platform, two security personnel had to bodily lift my 120-kilogram electric chair over a metal side railing while commuters queued behind me. It wasn’t just physically dangerous; it stripped away every ounce of autonomy I had fought years to build.</p>
      <blockquote>"Accessibility is never about special treatment. It is about the fundamental human dignity of being able to enter a public space without having to ask permission or beg for help."</blockquote>

      <h3>From a Frustrated Photo to a Crowdsourced Campaign</h3>
      <p>In January, I documented the turnstiles using the BarrierVerse reporting tool. I recorded a 45-second video showing the width gap, uploaded a photo with my measuring tape, and pinned the location. Within 48 hours, 47 local citizens and fellow students upvoted the report. Two volunteer verifiers visited the site and submitted independent validation logs.</p>

      <h3>How the System Responded</h3>
      <p>Because BarrierVerse automatically categorizes reports and assigns them to public jurisdiction databases, the station superintendent and the regional transit authority received an automated compliance advisory citing Section 41 of the RPWD Act 2016. Instead of an adversarial battle, the station team engaged with our volunteer auditors.</p>

      <p>Four weeks later, contractors removed one obsolete ticket kiosk and installed a dedicated 950mm automated smartcard swing gate equipped with audible validation chimes and high-contrast LED floor strips.</p>

      <h3>What We Learned</h3>
      <p>Barriers persist not because engineers are malicious, but because they often design for an imaginary 'average' human body. When we give citizens the tools to document exact dimensions and demonstrate community impact, change happens faster than anyone expects.</p>
    `,
    relatedActions: [
      { text: "Report an Inaccessible Transit Gate", link: "#report" },
      { text: "Explore Delhi Accessibility Map", link: "#map" },
      { text: "Join as a Volunteer Verifier", link: "#get-involved" }
    ]
  },
  {
    id: "story-hidden-barriers",
    title: "The Hidden Barriers Nobody Talks About: Acoustic Glare & Sensory Overload",
    subtitle: "Accessibility is far more than ramps. For neurodivergent and autistic citizens, our modern glass-and-steel cities are loud, hostile sensory minefields.",
    category: "PwD Voices",
    categorySlug: "pwd-voices",
    author: {
      name: "Tanya Sen",
      role: "Autism Advocate & UX Researcher",
      bio: "Neurodiversity consultant helping universities and tech parks design sensory-friendly physical and digital realms.",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      isPwD: true,
      honorariumReceived: "₹4,500 (Community Writer Grant)"
    },
    date: "February 18, 2026",
    readingTime: "6 min read",
    location: "Bengaluru",
    heroImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Modern atrium with acoustic timber slats and soft diffuse natural lighting",
    easyReadVersion: `
      • Many people think accessibility is only about wheelchair ramps.
      • But loud noises, bright flashing lights, and crowded echoing rooms hurt autistic and neurodivergent people.
      • This is called "sensory overload." It can cause headaches, panic, and extreme exhaustion.
      • Simple changes help: quiet rooms, softer lighting, and sound-absorbing ceiling panels.
      • Making spaces calm and quiet helps everyone think and work better.
    `,
    content: `
      <p class="lead-paragraph">When most people think of disability barriers, they envision a flight of stairs or a lack of elevator. But for millions of neurodivergent people, autistic individuals, and people with sensory processing sensitivities, the most debilitating barriers are invisible: sound and light.</p>

      <h3>The Physical Pain of Modern Architecture</h3>
      <p>Modern architecture loves polished Italian marble, soaring multi-story glass atriums, and harsh 6500K fluorescent lighting. To a neurotypical visitor, this conveys 'clean, modern luxury.' To an autistic brain, it feels like sitting inside a running industrial blender. Sound reverberates indefinitely, and high-frequency LED ballast hum creates unrelenting cognitive pain.</p>

      <h3>Why Sensory Access Matters</h3>
      <p>When an office or public facility lacks sensory quiet spaces, neurodivergent professionals burn out in half the time. It is not an emotional flaw; it is a neurological reaction to an environment that lacks acoustic damping and visual rest zones.</p>

      <h3>Practical, Low-Cost Interventions</h3>
      <ul>
        <li><strong>Acoustic Baffles:</strong> Adding recycled PET acoustic felt panels to cafeteria ceilings reduces echo by up to 60%.</li>
        <li><strong>Sensory Recharge Rooms:</strong> A small 10x10 foot room with 2700K warm dimmable lighting, noise-canceling headsets, and weighted blankets allows staff to decompress and return to peak productivity.</li>
        <li><strong>Sensory-Friendly Shopping Hours:</strong> Malls that dim ambient music and turn off flickering promotional screens for two hours on weekend mornings see a 25% surge in neurodivergent families visiting.</li>
      </ul>
    `,
    relatedActions: [
      { text: "Download the Sensory Audit Checklist", link: "#organizations" },
      { text: "Try the VR Sensory Simulator", link: "#vr-experience" },
      { text: "Contribute to Open Guidelines", link: "#opensource" }
    ]
  },
  {
    id: "story-volunteer-diaries",
    title: "30 Days, 42 Audits: What I Learned Walking with a White Cane",
    subtitle: "A sighted architecture student pairs with blind advocate Pooja to document 42 public hospital corridors across Pune.",
    category: "Volunteer Diaries",
    categorySlug: "volunteer-diaries",
    author: {
      name: "Siddharth Menon",
      role: "Volunteer Accessibility Auditor",
      bio: "Master of Architecture candidate at CEPT, researching inclusive pedestrian infrastructure in western India.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      isPwD: false,
      honorariumReceived: "Volunteer Contributor"
    },
    date: "February 10, 2026",
    readingTime: "4 min read",
    location: "Pune",
    heroImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Volunteer holding a clipboard while visually impaired partner uses white cane on yellow tactile ground tiles",
    easyReadVersion: `
      • Siddharth is an architecture student who can see.
      • He spent one month auditing hospitals with Pooja, who is blind.
      • He learned that many tactile tiles are installed in the wrong direction or lead into walls.
      • They reported 42 barriers on the BarrierVerse live map.
      • Three hospitals have already started fixing their signs and paths.
      • Anyone with a phone can become a volunteer auditor.
    `,
    content: `
      <p class="lead-paragraph">In architecture school, we were taught that tactile paving was a checklist item on building blueprint sheets. It wasn't until I spent 30 days walking through Pune's civic hospitals alongside Pooja, a blind teacher and disability rights advocate, that I realized how catastrophically theoretical our design education had been.</p>

      <h3>The Tile that Led into a Generator</h3>
      <p>At one major trauma center, the contractors had dutifully laid 200 meters of bright yellow blister tiles. But instead of leading to the emergency registration desk, the path made an abrupt 90-degree turn directly into a high-voltage diesel generator enclosure. Sighted inspectors had signed off on the project because 'tactile tiles were present.' But for someone reading the ground with a cane, it was a lethal trap.</p>

      <h3>The Power of Community Verification</h3>
      <p>Using the BarrierVerse mobile auditor kit, Pooja and I recorded exact GPS coordinates, measured the spacing of warning pavers, and uploaded geo-tagged audio notes. When we published our 42-barrier hospital report, the municipal health commissioner invited our team to conduct a live walk-through.</p>

      <p>Three civic hospitals have already corrected their wayfinding lines. If you're an architecture or design student, stop looking at render mockups. Pick up a measuring tape, walk with a PwD advocate, and map your city.</p>
    `,
    relatedActions: [
      { text: "Sign Up as an Accessibility Auditor", link: "#get-involved" },
      { text: "Explore Pune Hospital Reports", link: "#map" }
    ]
  },
  {
    id: "story-data-research",
    title: "What 5,000 Barrier Reports Reveal About Indian Urban Infrastructure",
    subtitle: "Our data science team analyzes 5,000+ crowdsourced submissions across 42 cities. Here are the 3 most pervasive failure points.",
    category: "Research & Insights",
    categorySlug: "research-insights",
    author: {
      name: "Dr. Anirudh Kulkarni",
      role: "Head of Open Data & Urban Informatics",
      bio: "Computational urban planner and open-source data fellow at BarrierVerse.",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      isPwD: false,
      honorariumReceived: "Open Source Contributor"
    },
    date: "January 28, 2026",
    readingTime: "7 min read",
    location: "National Research Report",
    heroImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Data visualization map displaying accessibility barrier density heatmaps across India",
    easyReadVersion: `
      • We looked at 5,000 barrier reports from 42 cities in India.
      • #1 most common problem: Ramps that are too steep (1 in 4 slope instead of 1 in 12).
      • #2 most common problem: Restrooms with narrow doors and no grab bars.
      • #3 most common problem: Sidewalks blocked by parked cars and low signs.
      • 82% of all barriers can be fixed for under ₹50,000.
      • All of our research data is 100% free and open for anyone to download.
    `,
    content: `
      <p class="lead-paragraph">Since BarrierVerse launched its crowdsourced reporting portal, citizens across 42 Indian cities have submitted over 5,000 geo-tagged barrier reports. By applying spatial clustering algorithms and computer vision categorization, our research team uncovered three startling systemic truths about Indian built environments.</p>

      <h3>Finding 1: 71% of Existing Ramps Are Unusable</h3>
      <p>The most common barrier reported was not the complete absence of a ramp, but the construction of 'token ramps' built with lethal gradients steeper than 1:6 (the Indian Harmonised standard mandates 1:12). These ramps are often built by contractors without checking wheelchair physics, making them steeper than playground slides.</p>

      <h3>Finding 2: 82% of Fixes Cost Under ₹50,000</h3>
      <p>There is a widespread institutional misconception that making a campus accessible requires multi-crore structural overhauls. Our econometric analysis of 1,400+ successfully fixed barriers showed that the median retrofit cost was only ₹38,500. Installing handrails, unbolting restrictive gates, adding tactile warning lines, and lowering reception desks are high-impact, low-cost modifications.</p>

      <h3>Finding 3: Citizen Reporting Accelerates Fix Rates by 4x</h3>
      <p>Barriers that accumulated 20+ community upvotes on the public map were resolved four times faster by municipal bodies and universities compared to traditional bureaucratic paper grievances.</p>
    `,
    relatedActions: [
      { text: "Download Full GeoJSON / CSV Dataset", link: "#opensource" },
      { text: "View Live City Heatmaps", link: "#map" }
    ]
  }
];
