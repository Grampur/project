import db from "../config/db.js";

export const UserInteractionModel = {
    async addLikedPlace({ userId, placeId, placeName }) {
        const result = await db.query(
            `INSERT INTO liked_places (user_id, place_id, place_name)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [userId, placeId, placeName]
        );
        return result.rows[0];
    },

    async getLikedPlaces(userId) {
        const result = await db.query(
            'SELECT * FROM liked_places WHERE user_id = $1 ORDER BY liked_at DESC',
            [userId]
        );
        return result.rows;
    },

    async addSkippedPlace({ userId, placeId, placeName }) {
        const result = await db.query(
            `INSERT INTO skipped_places (user_id, place_id, place_name)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [userId, placeId, placeName]
        );
        return result.rows[0];
    },

    async getSkippedPlaces(userId) {
        const result = await db.query(
            'SELECT * FROM skipped_places WHERE user_id = $1 ORDER BY skipped_at DESC',
            [userId]
        );
        return result.rows;
    },

    async startUserSession(userId) {
        const result = await db.query(
            `INSERT INTO user_engagement (user_id, session_start)
             VALUES ($1, CURRENT_TIMESTAMP)
             RETURNING *`,
            [userId]
        );
        return result.rows[0];
    },

    async endUserSession(sessionId, { swipeCount, likeCount, skipCount }) {
        const result = await db.query(
            `UPDATE user_engagement 
             SET session_end = CURRENT_TIMESTAMP,
                 swipe_count = $2,
                 like_count = $3,
                 skip_count = $4
             WHERE id = $1
             RETURNING *`,
            [sessionId, swipeCount, likeCount, skipCount]
        );
        return result.rows[0];
    },

    async updateCategoryPreference({ userId, categoryName, preferenceScore }) {
        const result = await db.query(
            `INSERT INTO category_preferences (user_id, category_name, preference_score, interaction_count)
             VALUES ($1, $2, $3, 1)
             ON CONFLICT (user_id, category_name)
             DO UPDATE SET 
                preference_score = (category_preferences.preference_score + $3) / 2,
                interaction_count = category_preferences.interaction_count + 1,
                last_updated = CURRENT_TIMESTAMP
             RETURNING *`,
            [userId, categoryName, preferenceScore]
        );
        return result.rows[0];
    },

    async getUserCategoryPreferences(userId) {
        const result = await db.query(
            'SELECT * FROM category_preferences WHERE user_id = $1 ORDER BY preference_score DESC',
            [userId]
        );
        return result.rows;
    },

    async updateInteractionMetrics({ 
        userId, 
        avgViewTime, 
        dailySwipeCount, 
        engagementScore 
    }) {
        const result = await db.query(
            `INSERT INTO interaction_metrics 
             (user_id, avg_view_time, daily_swipe_count, last_active, engagement_score)
             VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4)
             ON CONFLICT (user_id)
             DO UPDATE SET 
                avg_view_time = $2,
                daily_swipe_count = $3,
                last_active = CURRENT_TIMESTAMP,
                engagement_score = $4,
                updated_at = CURRENT_TIMESTAMP
             RETURNING *`,
            [userId, avgViewTime, dailySwipeCount, engagementScore]
        );
        return result.rows[0];
    },

    async getInteractionMetrics(userId) {
        const result = await db.query(
            'SELECT * FROM interaction_metrics WHERE user_id = $1',
            [userId]
        );
        return result.rows[0];
    }
};