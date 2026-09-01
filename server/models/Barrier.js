/**
 * BarrierVerse MERN Architecture - Barrier Data Model
 */

export class BarrierModel {
  static validate(data) {
    const errors = [];
    if (!data.title || data.title.trim().length < 3) errors.push('Title must be at least 3 characters');
    if (!data.type) errors.push('Barrier type is required');
    if (!data.location && (!data.lat || !data.lng)) errors.push('Valid location or GPS coordinates required');
    return { isValid: errors.length === 0, errors };
  }

  static create(data) {
    const id = `BRV-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      id,
      title: data.title || 'Reported Barrier',
      type: data.type || 'ramp',
      typeName: data.typeName || 'Steep / Inaccessible Ramp',
      disabilityType: data.disabilityType || 'mobility',
      severity: data.severity || 'Dangerous',
      frequency: data.frequency || 'Daily',
      blocksAccess: data.blocksAccess || 'Yes',
      status: data.status || 'reported', // reported | in_progress | fixed | accessible_place
      city: data.city || 'New Delhi',
      state: data.state || 'Delhi',
      lat: parseFloat(data.lat) || 28.6139,
      lng: parseFloat(data.lng) || 77.2090,
      address: data.location || data.address || 'Reported Location',
      description: data.description || '',
      impact: data.impact || 'Restricts independent access for disabled citizens',
      suggestedFix: data.suggestedFix || 'Standardized RPWD compliant universal retrofit',
      reportedDate: new Date().toISOString().slice(0, 10),
      reporter: data.isAnonymous ? 'Anonymous Citizen' : (data.reporterName || 'Community Member'),
      isPwD: data.isPwD === 'yes' || data.isPwD === true,
      upvotes: 1,
      hasPhoto: !!(data.photos && data.photos.length > 0),
      photoUrl: (data.photos && data.photos[0]) || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
      verifiedCount: 0
    };
  }
}
