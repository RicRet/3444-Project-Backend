const { resourceLimits } = require('worker_threads');
const pool = require('../pool');

const insertReply = async (parentID, content, ownerID) => {
    try {
        const result = await pool.query(
            `INSERT INTO eagleeye_schema.db_replies (parentID, content, ownerID)
             VALUES ($1, $2, $3) RETURNING *`,
            [parentID, content, ownerID]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error inserting reply:', error);
        throw error;
    }
};

const getReplies = async (limit) => {
    try {
        const result = await pool.query(
            'SELECT * FROM eagleeye_schema.db_replies ORDER BY post_date ASC LIMIT $1',
            [limit]
        );
        return result.rows;
    } catch (error) {
        console.error('Error fetching replies:', error);
        throw error;
    }
};

module.exports = { insertReply, getReplies };
