/**
 * BarrierVerse MERN Architecture - Organizations & Pledge REST API Routes
 */

let pledgedOrganizations = [
  { id: "org-1", name: "IIT Patna", type: "College", tier: "Leader", location: "Patna, Bihar", fixesPledged: 42 },
  { id: "org-2", name: "Apollo Healthcare", type: "Hospital", tier: "Champion", location: "Bengaluru, Karnataka", fixesPledged: 28 },
  { id: "org-3", name: "Cognizance Tech Park", type: "Corporate", tier: "Leader", location: "Pune, Maharashtra", fixesPledged: 35 }
];

export function setupOrganizationRoutes(app) {
  // GET /api/organizations
  app.get('/api/organizations', (req, res) => {
    res.json({ success: true, count: pledgedOrganizations.length, data: pledgedOrganizations });
  });

  // POST /api/organizations/pledge
  app.post('/api/organizations/pledge', (req, res) => {
    const { orgName, orgType, location, contactName, email, tier } = req.body;

    if (!orgName || !email) {
      return res.status(400).json({ success: false, message: 'Organization name and contact email required' });
    }

    const newPledge = {
      id: `org-${Date.now()}`,
      name: orgName,
      type: orgType || 'Education',
      location: location || 'India',
      contactName: contactName || 'Coordinator',
      email,
      tier: tier || 'Leader',
      pledgedDate: new Date().toISOString().slice(0, 10),
      status: 'active'
    };

    pledgedOrganizations.unshift(newPledge);

    // Generate SVG Badge string
    const svgBadge = `
      <svg width="400" height="200" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#1e293b" />
          </linearGradient>
          <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3b82f6" />
            <stop offset="100%" stop-color="#10b981" />
          </linearGradient>
        </defs>
        <rect x="5" y="5" width="390" height="190" rx="16" fill="url(#badgeGrad)" stroke="url(#borderGrad)" stroke-width="4"/>
        <text x="200" y="45" fill="#60a5fa" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">BARRIERVERSE VERIFIED</text>
        <text x="200" y="85" fill="#ffffff" font-family="Arial, sans-serif" font-size="20" font-weight="bold" text-anchor="middle">${orgName.slice(0, 26)}</text>
        <rect x="130" y="105" width="140" height="28" rx="14" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1.5"/>
        <text x="200" y="124" fill="#6ee7b7" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">★ ${newPledge.tier.toUpperCase()} PLEDGE</text>
        <text x="200" y="165" fill="#94a3b8" font-family="Arial, sans-serif" font-size="11" text-anchor="middle">Committed to 100% Universal Accessibility 2026</text>
      </svg>
    `;

    res.status(201).json({
      success: true,
      message: 'Voluntary pledge registered successfully! Welcome kit generated.',
      data: newPledge,
      svgBadge
    });
  });
}
