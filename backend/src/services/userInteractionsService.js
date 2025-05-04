import { UserInteractionModel } from '../models/userInteractionModel.js';

export const UserInteractionService = {
    async addLikedPlace(userId, placeData) {
        try {
            const { placeId, placeName } = placeData;
            return await UserInteractionModel.addLikedPlace({
                userId,
                placeId,
                placeName
            });
        } catch (error) {
            throw new Error(`Failed to add liked place: ${error.message}`);
        }
    },

    async getUserLikedPlaces(userId) {
        try {
            return await UserInteractionModel.getLikedPlaces(userId);
        } catch (error) {
            throw new Error(`Failed to get liked places: ${error.message}`);
        }
    },

    async addSkippedPlace(userId, placeData) {
        try {
            const { placeId, placeName } = placeData;
            return await UserInteractionModel.addSkippedPlace({
                userId,
                placeId,
                placeName
            });
        } catch (error) {
            throw new Error(`Failed to add skipped place: ${error.message}`);
        }
    },

    async getUserSkippedPlaces(userId) {
        try {
            return await UserInteractionModel.getSkippedPlaces(userId);
        } catch (error) {
            throw new Error(`Failed to get skipped places: ${error.message}`);
        }
    },

    async startUserSession(userId) {
        try {
            return await UserInteractionModel.startUserSession(userId);
        } catch (error) {
            throw new Error(`Failed to start user session: ${error.message}`);
        }
    },

    async endUserSession(sessionId, sessionData) {
        try {
            const { swipeCount, likeCount, skipCount } = sessionData;
            return await UserInteractionModel.endUserSession(sessionId, {
                swipeCount,
                likeCount,
                skipCount
            });
        } catch (error) {
            throw new Error(`Failed to end user session: ${error.message}`);
        }
    },

    async updateCategoryPreference(userId, categoryData) {
        try {
            const { categoryName, preferenceScore } = categoryData;
            return await UserInteractionModel.updateCategoryPreference({
                userId,
                categoryName,
                preferenceScore
            });
        } catch (error) {
            throw new Error(`Failed to update category preference: ${error.message}`);
        }
    },

    async getUserCategoryPreferences(userId) {
        try {
            return await UserInteractionModel.getUserCategoryPreferences(userId);
        } catch (error) {
            throw new Error(`Failed to get category preferences: ${error.message}`);
        }
    },

    async updateInteractionMetrics(userId, metricsData) {
        try {
            const { avgViewTime, dailySwipeCount, engagementScore } = metricsData;
            return await UserInteractionModel.updateInteractionMetrics({
                userId,
                avgViewTime,
                dailySwipeCount,
                engagementScore
            });
        } catch (error) {
            throw new Error(`Failed to update interaction metrics: ${error.message}`);
        }
    },

    async getInteractionMetrics(userId) {
        try {
            return await UserInteractionModel.getInteractionMetrics(userId);
        } catch (error) {
            throw new Error(`Failed to get interaction metrics: ${error.message}`);
        }
    },

    async processPlaceInteraction(userId, placeData, action) {
        try {
            if (action === 'like') {
                await this.addLikedPlace(userId, placeData);
                await this.updateCategoryPreference(userId, {
                    categoryName: placeData.category,
                    preferenceScore: 1
                });
            } else if (action === 'skip') {
                await this.addSkippedPlace(userId, placeData);
                await this.updateCategoryPreference(userId, {
                    categoryName: placeData.category,
                    preferenceScore: -0.5
                });
            }

            const currentMetrics = await this.getInteractionMetrics(userId) || {
                avgViewTime: 0,
                dailySwipeCount: 0,
                engagementScore: 0
            };

            await this.updateInteractionMetrics(userId, {
                avgViewTime: placeData.viewTime || currentMetrics.avgViewTime,
                dailySwipeCount: currentMetrics.dailySwipeCount + 1,
                engagementScore: this.calculateEngagementScore(currentMetrics, action)
            });

            return true;
        } catch (error) {
            throw new Error(`Failed to process place interaction: ${error.message}`);
        }
    },

    calculateEngagementScore(currentMetrics, action) {

        const baseScore = currentMetrics.engagementScore || 0;
        const actionScore = action === 'like' ? 2 : 1;
        return (baseScore + actionScore) / 2;
    }
};