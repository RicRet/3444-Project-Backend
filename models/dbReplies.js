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

const getReplies = async (parentSalesId, limit = 10) => {
    try {
        const results = await pool.query(
            `SELECT * FROM eagleeye_schema.db_replies
             WHERE parent_db_id = $1
             ORDER BY post_date ASC
             LIMIT $2`,
            [parentSalesId, limit]
        );
        return results.rows;
    } catch (error) {
        console.error('Error fetching sales replies:', error);
        throw error;
    }
};

module.exports = { insertReply, getReplies };
