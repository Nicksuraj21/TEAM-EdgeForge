/**
 * BarrierVerse - VR Scenarios & 3D Interactive Environments
 * 5 Rich environments with Reality Switch (Barriered vs Accessible)
 */

export const VR_SCENARIOS = [
  {
    id: "campus",
    title: "University Academic Complex",
    subtitle: "Main lecture hall entry, library quadrangle, and administrative block",
    category: "Education",
    disabilityType: "mobility",
    disabilityName: "Mobility & Visual",
    difficulty: "Beginner",
    time: "3-4 min",
    heroImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    description: "Navigate a bustling college campus quadrangle. Experience what happens when lecture halls have steep stairs, no ramps, high reception windows, and missing tactile lines for blind students.",
    environment: {
      skyColor: 0x1e293b,
      groundColor: 0x334155,
      buildingColor: 0x64748b,
      accentColor: 0x3b82f6,
      accessibleAccentColor: 0x10b981
    },
    hotspots: [
      {
        id: "ramp-hotspot",
        position: [ -4, 0.8, -3 ],
        title: "Steep 1:4 Unassisted Ramp",
        barrieredDesc: "Hazardous 1:4 slope with no side safety curbs or handrails. Wheelchair users risk tipping backwards, and crutch users lose grip.",
        accessibleDesc: "1:12 Universal slope with dual-height continuous stainless steel handrails (750mm & 900mm) and yellow tactile warning strip at top and bottom.",
        impact: "Blocks 100% of independent wheelchair users from attending morning engineering lectures.",
        solution: "Reconstruct with 1:12 gradient + 1500mm landing platform every 9 meters.",
        cost: "₹65,000 – ₹95,000",
        affects: "Wheelchair users, Crutch users, Elderly professors, Stroller users",
        guideline: "RPWD Act Harmonised Guidelines 2021 (Sec 4.2)"
      },
      {
        id: "tactile-hotspot",
        position: [ 0, 0.2, -1 ],
        title: "Missing Tactile Guiding Pathway",
        barrieredDesc: "Smooth uniform granite floor with zero tactile guiding lines or hazard indicators leading to the main entrance door.",
        accessibleDesc: "Continuous bright yellow directional tactile tiles leading directly to the accessible sliding door and reception counter.",
        impact: "Blind and low-vision students are disoriented and must rely on sighted guides to cross the 50m open quadrangle.",
        solution: "Install 300x300mm polyurethane directional line tiles with blister hazard warning pavers at junctions.",
        cost: "₹35,000 – ₹50,000",
        affects: "Visually impaired, Blind white cane users, Low vision",
        guideline: "Bureau of Indian Standards (IS 17802 / SP 73)"
      },
      {
        id: "counter-hotspot",
        position: [ 3.5, 1.2, -4 ],
        title: "Inaccessible High Admin Counter (1300mm)",
        barrieredDesc: "High glass security counter built at 1300mm standing height with no lowered section or audio induction loop.",
        accessibleDesc: "Dual-height desk with a 750mm wheelchair reception bay, 480mm deep knee clearance, and hearing loop antenna for hearing aid users.",
        impact: "Wheelchair users cannot reach the fee submission ledge or make eye contact with staff.",
        solution: "Cut out lower counter bay at 750mm height with assistive listening system.",
        cost: "₹25,000 – ₹40,000",
        affects: "Wheelchair users, Little people, Hard of hearing students",
        guideline: "CPWD Guidelines for Barrier Free Built Environment"
      }
    ]
  },
  {
    id: "metro",
    title: "Urban Metro Station Concourse",
    subtitle: "Turnstiles, ticketing booths, and platform elevator interchange",
    category: "Public Transit",
    disabilityType: "visual",
    disabilityName: "Visual & Auditory",
    difficulty: "Intermediate",
    time: "4-5 min",
    heroImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    description: "Experience the high sensory overload of an urban transit hub. Understand the fear of narrow turnstiles, silent train announcements, and tactile paths ending into concrete pillars.",
    environment: {
      skyColor: 0x0f172a,
      groundColor: 0x1e293b,
      buildingColor: 0x475569,
      accentColor: 0xf59e0b,
      accessibleAccentColor: 0x10b981
    },
    hotspots: [
      {
        id: "turnstile-hotspot",
        position: [ -2.5, 0.9, -2 ],
        title: "Narrow 550mm Flap Turnstile",
        barrieredDesc: "Standard mechanical flap gate is only 550mm wide. Motorized wheelchairs (680mm+) and service dogs cannot pass.",
        accessibleDesc: "Wide 950mm automated swing gate with contactless smartcard validator and audio chime verification.",
        impact: "Commuters with disabilities are stranded at the concourse gate line during peak rush hour.",
        solution: "Designate at least one 900mm+ wide automated ADA-compliant fare gate per concourse line.",
        cost: "₹1,20,000",
        affects: "Wheelchair users, Commuters with luggage, Guide dog handlers",
        guideline: "Ministry of Housing and Urban Affairs (MoHUA) Transit Norms"
      },
      {
        id: "lift-hotspot",
        position: [ 4, 1.2, -5 ],
        title: "Silent Elevator with Smooth Glass Touch-Panel",
        barrieredDesc: "Glass elevator lacks Braille buttons, tactile relief, audible floor announcements, and mirror for reverse wheelchair exit.",
        accessibleDesc: "Elevator fitted with 3D Braille buttons, dual auditory chimes ('Going Up to Concourse 2'), convex rear mirror, and 1400mm door clearance.",
        impact: "Visually impaired passengers cannot choose their floor or know when the doors open.",
        solution: "Retrofit with bilingual voice annunciators and raised tactile button array with illuminated floor indicator.",
        cost: "₹45,000 – ₹70,000",
        affects: "Blind commuters, Deaf/Hard of hearing, Wheelchair users",
        guideline: "Harmonised Guidelines Sec 6.3"
      },
      {
        id: "audio-signage-hotspot",
        position: [ 0, 2.2, -4 ],
        title: "Audio-Visual Information Display Disconnect",
        barrieredDesc: "Platform only broadcasts train departure changes via muffled audio speakers with no synchronized digital text screens.",
        accessibleDesc: "Synchronized dual-mode LED display screens with high-contrast amber text, dynamic sign language video avatar, and real-time announcements.",
        impact: "Deaf commuters miss emergency track-switch announcements and platform delay notices.",
        solution: "Deploy synchronized bilingual digital signage with audio-frequency induction loops.",
        cost: "₹80,000 – ₹1,10,000",
        affects: "Deaf & Hard of hearing commuters, Elderly with age-related hearing loss",
        guideline: "GIGW 3.0 & RPWD Accessible Transit Standards"
      }
    ]
  },
  {
    id: "hospital",
    title: "Multi-Specialty Civic Hospital",
    subtitle: "Emergency drop-off, outpatient corridors, and diagnostic lab suites",
    category: "Healthcare",
    disabilityType: "all",
    disabilityName: "Physical & Cognitive",
    difficulty: "Intermediate",
    time: "4 min",
    heroImage: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
    description: "Step into an emergency hospital wing where minutes count. Discover how heavy swing doors, lack of pictograms, and high examination tables create dangerous healthcare disparities.",
    environment: {
      skyColor: 0x111827,
      groundColor: 0x1f2937,
      buildingColor: 0x374151,
      accentColor: 0x06b6d4,
      accessibleAccentColor: 0x10b981
    },
    hotspots: [
      {
        id: "door-hotspot",
        position: [ -3, 1.2, -3 ],
        title: "Heavy Spring-Loaded Swing Doors (35N force)",
        barrieredDesc: "Heavy double fire doors require 35 Newtons of pushing force with no push-button actuator or magnetic hold-open.",
        accessibleDesc: "Motion-activated automatic sliding door with 1200mm clear passage and kick-plate protection.",
        impact: "Patients with muscular dystrophy, arthritis, or one-handed crutch support cannot push open the diagnostic wing doors.",
        solution: "Install automatic proximity sensors and 5N compliant delayed-closing hinges.",
        cost: "₹55,000 – ₹85,000",
        affects: "Patients with upper limb mobility impairments, Elderly, Gurney transfers",
        guideline: "National Building Code 2016 Part 3"
      },
      {
        id: "pictogram-hotspot",
        position: [ 0, 1.8, -4 ],
        title: "Complex Text-Only Medical Wayfinding",
        barrieredDesc: "Wayfinding signs use technical Latin medical terms in small fonts without color coding, symbols, or multilingual Hindi/regional scripts.",
        accessibleDesc: "Intuitive color-coded floor trails with international health pictograms, Braille room numbers at 1400mm height, and large high-contrast fonts.",
        impact: "Creates severe cognitive anxiety and navigation failure for neurodivergent patients and non-literate citizens.",
        solution: "Institute multi-sensory color wayfinding with standardized pictograms and tactile map at reception.",
        cost: "₹30,000 – ₹55,000",
        affects: "Neurodivergent patients, Autistic individuals, Low-literacy patients",
        guideline: "Sugamya Bharat Healthcare Access Protocol"
      },
      {
        id: "restroom-hotspot",
        position: [ 3.5, 0.9, -2 ],
        title: "Narrow Inaccessible Restroom",
        barrieredDesc: "Inward-opening 600mm door, no grab bars, slippery wet tiles, and toilet pan placed against the corner preventing side transfer.",
        accessibleDesc: "Spacious 2000x2000mm unisex accessible washroom with fold-down L-grab rails, non-slip R11 floor rating, and emergency pull cord linked to nurse station.",
        impact: "Patients are forced to soil themselves or depend on uncomfortable manual lifting by non-medical staff.",
        solution: "Reconfigure with outward sliding door, 480mm pan height, dual grab bars, and nurse emergency alarm.",
        cost: "₹60,000 – ₹90,000",
        affects: "Wheelchair users, Paraplegic patients, Elderly with balance disorders",
        guideline: "RPWD Act 2016 Section 44 Mandatory Compliance"
      }
    ]
  },
  {
    id: "mall",
    title: "City Center Shopping & Entertainment Mall",
    subtitle: "Atrium walkways, food court seating, and multiplex cinema entrance",
    category: "Public Spaces",
    disabilityType: "cognitive",
    disabilityName: "Sensory & Mobility",
    difficulty: "Advanced",
    time: "3-5 min",
    heroImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
    description: "Explore a modern commercial mall. See how fixed food court furniture, flashing strobe lights, acoustic echo, and single-step shops exclude millions of families.",
    environment: {
      skyColor: 0x18181b,
      groundColor: 0x27272a,
      buildingColor: 0x3f3f46,
      accentColor: 0xec4899,
      accessibleAccentColor: 0x10b981
    },
    hotspots: [
      {
        id: "foodcourt-hotspot",
        position: [ -3, 0.7, -3 ],
        title: "Bolted-to-Floor Fixed Restaurant Seating",
        barrieredDesc: "All food court tables have fixed attached stools with narrow 400mm gaps. Zero tables allow a wheelchair or mobility scooter to roll up.",
        accessibleDesc: "At least 20% of tables feature removable chairs, 750mm height clearance, and wide 1200mm passing aisles.",
        impact: "Wheelchair users must sit isolated in the middle of pedestrian walk traffic while friends sit at tables.",
        solution: "Unbolt 25% of perimeter seating to provide flexible accessible table arrangements.",
        cost: "₹15,000 – ₹25,000",
        affects: "Wheelchair users, Stroller families, Plus-size citizens",
        guideline: "Accessible Hospitality & Retail Standards"
      },
      {
        id: "sensory-hotspot",
        position: [ 0, 2.0, -3.5 ],
        title: "Intense Strobe Advertisements & Acoustic Glare",
        barrieredDesc: "Giant flickering LED billboard panels with loud unsynced audio blasts reflecting off hard marble surfaces with no quiet zones.",
        accessibleDesc: "Sensory-friendly hours with softened lighting, acoustic dampening panels, and a dedicated quiet recharge room with sensory amenities.",
        impact: "Triggers sensory overload, panic attacks, or seizures in neurodivergent visitors and autistic children.",
        solution: "Install sound-absorbing baffles, reduce billboard flashing rates, and establish a quiet decompression lounge.",
        cost: "₹40,000 – ₹75,000",
        affects: "Autistic individuals, People with Sensory Processing Sensitivity, PTSD, Epilepsy",
        guideline: "Sensory Friendly Public Realm Design Best Practices"
      },
      {
        id: "store-step-hotspot",
        position: [ 3.5, 0.5, -4 ],
        title: "Single 6-Inch Decorative Store Threshold Step",
        barrieredDesc: "Trendy boutique entrance has an aesthetic 150mm single step with no portable threshold wedge or level entrance.",
        accessibleDesc: "Flush zero-threshold entrance with slip-resistant brass transition strip and level automated glass door.",
        impact: "Blocks independent customer entry, requiring embarrassing manual lifting.",
        solution: "Install permanent flush ramp or recessed entrance matting.",
        cost: "₹18,000 – ₹30,000",
        affects: "Wheelchair users, Wheeled luggage, Delivery workers",
        guideline: "Universal Design in Commercial Interiors"
      }
    ]
  },
  {
    id: "office",
    title: "Tech Park Corporate Office & Workstations",
    subtitle: "Open-plan workspace, meeting rooms, and cafeteria breakroom",
    category: "Workplace",
    disabilityType: "all",
    disabilityName: "Comprehensive Inclusion",
    difficulty: "Intermediate",
    time: "4 min",
    heroImage: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=800&q=80",
    description: "Experience the modern corporate workplace. Uncover subtle barriers: high cafeteria coffee machines, sound-proof glass rooms without captions, and fixed standing desks.",
    environment: {
      skyColor: 0x090d16,
      groundColor: 0x161e2e,
      buildingColor: 0x283548,
      accentColor: 0x8b5cf6,
      accessibleAccentColor: 0x10b981
    },
    hotspots: [
      {
        id: "workstation-hotspot",
        position: [ -3, 0.8, -2.5 ],
        title: "Fixed Height Desks (720mm) & Cramped Cable Trays",
        barrieredDesc: "Desks have rigid metal frames with low under-desk cable baskets blocking wheelchair footplates and preventing ergonomic height adjustments.",
        accessibleDesc: "Motorized sit-stand electric adjustable desks (600mm to 1250mm range) with concealed cable management and accessible power ports at desktop level.",
        impact: "Employees with spinal injuries, dwarfism, or specialized chairs cannot sit comfortably or work full days.",
        solution: "Equip 15%+ of workstations with motorized height-adjustable desks.",
        cost: "₹35,000 per workstation",
        affects: "Wheelchair users, Chronic back pain, Little people, Neurodivergent standing workers",
        guideline: "Ergonomics & RPWD Equal Opportunity Policies"
      },
      {
        id: "conference-hotspot",
        position: [ 0, 1.4, -4 ],
        title: "Conference Room Lacks Assistive Tech & Live Captions",
        barrieredDesc: "Meeting room relies solely on acoustic table mics with heavy glass wall reverberation and no live transcription display.",
        accessibleDesc: "Meeting room equipped with AI real-time Speech-To-Text monitors, telecoil hearing loop integration, and sign-language camera angles.",
        impact: "Deaf and hard-of-hearing engineers miss critical architecture debates and team brainstorms.",
        solution: "Integrate automatic speech recognition captioning displays and hearing loops.",
        cost: "₹45,000 – ₹70,000",
        affects: "Deaf & Hard of Hearing employees, Non-native language speakers",
        guideline: "W3C Accessible Digital Workplace Standards"
      },
      {
        id: "pantry-hotspot",
        position: [ 3.2, 1.1, -3 ],
        title: "High Coffee Machine & Microwave (1450mm height)",
        barrieredDesc: "Pantry microwave and espresso machine placed on high upper kitchen counters with reach depth exceeding 600mm.",
        accessibleDesc: "Appliance shelf lowered to 800mm with front-facing toggle controls and D-handle cabinet hardware.",
        impact: "Wheelchair employees cannot heat their lunch or make coffee independently, reinforcing dependence on colleagues.",
        solution: "Reconfigure pantry counters with universal reach zones (400mm – 1000mm).",
        cost: "₹20,000 – ₹35,000",
        affects: "Wheelchair users, Little people, Employees with limited arm reach",
        guideline: "Universal Workplace Design Standards"
      }
    ]
  }
];
