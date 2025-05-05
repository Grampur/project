import express from 'express';
import { UserInteractionController } from '../controllers/userInteractionController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(isAuthenticated);

// Liked Places Routes
router.post('/likes', UserInteractionController.addLikedPlace);
router.get('/likes', UserInteractionController.getLikedPlaces);

// Skipped Places Routes
router.post('/skips', UserInteractionController.addSkippedPlace);
router.get('/skips', UserInteractionController.getSkippedPlaces);

// User Engagement Routes
router.post('/sessions/start', UserInteractionController.startSession);
router.put('/sessions/:sessionId/end', UserInteractionController.endSession);

// Category Preferences Routes
router.put('/categories/preferences', UserInteractionController.updateCategoryPreference);
router.get('/categories/preferences', UserInteractionController.getCategoryPreferences);

// Interaction Metrics Routes
router.get('/metrics', UserInteractionController.getInteractionMetrics);

// Composite Routes
router.post('/interact', UserInteractionController.processPlaceInteraction);

export default router;