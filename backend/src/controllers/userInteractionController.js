import { UserInteractionService } from '../services/userInteractionsService.js';

export const UserInteractionController = {
    // Liked Places Controllers
    async addLikedPlace(req, res) {
        try {
            const userId = req.session.userId;
            const placeData = req.body;
            
            const result = await UserInteractionService.addLikedPlace(userId, placeData);
            res.status(201).json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    async getLikedPlaces(req, res) {
        try {
            const userId = req.user.id;
            const likedPlaces = await UserInteractionService.getUserLikedPlaces(userId);
            res.status(200).json({
                success: true,
                data: likedPlaces
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    // Skipped Places Controllers
    async addSkippedPlace(req, res) {
        try {
            const userId = req.user.id;
            const placeData = req.body;
            
            const result = await UserInteractionService.addSkippedPlace(userId, placeData);
            res.status(201).json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    async getSkippedPlaces(req, res) {
        try {
            const userId = req.user.id;
            const skippedPlaces = await UserInteractionService.getUserSkippedPlaces(userId);
            res.status(200).json({
                success: true,
                data: skippedPlaces
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    // User Engagement Controllers
    async startSession(req, res) {
        try {
            const userId = req.user.id;
            const session = await UserInteractionService.startUserSession(userId);
            res.status(201).json({
                success: true,
                data: session
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    async endSession(req, res) {
        try {
            const { sessionId } = req.params;
            const sessionData = req.body;
            
            const result = await UserInteractionService.endUserSession(sessionId, sessionData);
            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    // Category Preferences Controllers
    async updateCategoryPreference(req, res) {
        try {
            const userId = req.user.id;
            const categoryData = req.body;
            
            const result = await UserInteractionService.updateCategoryPreference(userId, categoryData);
            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    async getCategoryPreferences(req, res) {
        try {
            const userId = req.user.id;
            const preferences = await UserInteractionService.getUserCategoryPreferences(userId);
            res.status(200).json({
                success: true,
                data: preferences
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    // Interaction Metrics Controllers
    async getInteractionMetrics(req, res) {
        try {
            const userId = req.user.id;
            const metrics = await UserInteractionService.getInteractionMetrics(userId);
            res.status(200).json({
                success: true,
                data: metrics
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    // Composite Controllers
    async processPlaceInteraction(req, res) {
        try {
            const userId = req.user.id;
            const { placeData, action } = req.body;
            
            const result = await UserInteractionService.processPlaceInteraction(
                userId,
                placeData,
                action
            );
            
            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
};