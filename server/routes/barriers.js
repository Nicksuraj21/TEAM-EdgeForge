/**
 * BarrierVerse MERN Architecture - Barriers REST API Routes
 */

import { INITIAL_BARRIERS } from '../../js/data/barriers-data.js';
import { BarrierModel } from '../models/Barrier.js';

let barriersDatabase = [...INITIAL_BARRIERS];

export function setupBarrierRoutes(app) {
  // GET /api/barriers (With query filters)
  app.get('/api/barriers', (req, res) => {
    const { status, type, disability, city, search } = req.query;
    let results = [...barriersDatabase];

    if (status && status !== 'all') {
      results = results.filter(b => b.status === status);
    }
    if (type && type !== 'all') {
      results = results.filter(b => b.type === type);
    }
    if (disability && disability !== 'all') {
      results = results.filter(b => b.disabilityType === disability || b.disabilityType === 'all');
    }
    if (city) {
      results = results.filter(b => b.city.toLowerCase() === city.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(b => 
        b.title.toLowerCase().includes(q) || 
        b.address.toLowerCase().includes(q) || 
        b.city.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      count: results.length,
      totalDatabase: barriersDatabase.length,
      data: results
    });
  });

  // GET /api/barriers/:id
  app.get('/api/barriers/:id', (req, res) => {
    const barrier = barriersDatabase.find(b => b.id === req.params.id);
    if (!barrier) {
      return res.status(404).json({ success: false, message: 'Barrier not found' });
    }
    res.json({ success: true, data: barrier });
  });

  // POST /api/barriers (Create new report)
  app.post('/api/barriers', (req, res) => {
    const validation = BarrierModel.validate(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ success: false, errors: validation.errors });
    }

    const newBarrier = BarrierModel.create(req.body);
    barriersDatabase.unshift(newBarrier);

    res.status(201).json({
      success: true,
      message: 'Barrier successfully logged into national accessibility registry',
      data: newBarrier
    });
  });

  // PATCH /api/barriers/:id/upvote
  app.patch('/api/barriers/:id/upvote', (req, res) => {
    const barrier = barriersDatabase.find(b => b.id === req.params.id);
    if (!barrier) {
      return res.status(404).json({ success: false, message: 'Barrier not found' });
    }

    const { action } = req.body; // 'add' or 'remove'
    if (action === 'remove') {
      barrier.upvotes = Math.max(0, barrier.upvotes - 1);
    } else {
      barrier.upvotes += 1;
    }

    res.json({ success: true, upvotes: barrier.upvotes, data: barrier });
  });

  // PATCH /api/barriers/:id/verify (Submit verification photo of fix)
  app.patch('/api/barriers/:id/verify', (req, res) => {
    const barrier = barriersDatabase.find(b => b.id === req.params.id);
    if (!barrier) {
      return res.status(404).json({ success: false, message: 'Barrier not found' });
    }

    barrier.status = 'fixed';
    barrier.verifiedCount = (barrier.verifiedCount || 0) + 1;
    barrier.fixedDate = new Date().toISOString().slice(0, 10);

    res.json({
      success: true,
      message: `Fix verified! Barrier #${barrier.id} marked as resolved.`,
      data: barrier
    });
  });
}
