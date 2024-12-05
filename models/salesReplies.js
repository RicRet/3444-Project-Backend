const pool = require('../pool');

const insertSalesReply = async (parentID, content, ownerId) => {
    try {
        const result = await pool.query(
            `INSERT INTO eagleeye_schema.sales_replies (parent_sales_id, content, owner_id) 
             VALUES ($1, $2, $3) RETURNING *`,
            [parentID, content, ownerId]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error inserting Sales reply:', error);
        throw error;
    }
};

const getSalesReplies = async (parentSalesId, limit = 10) => {
    try {
        const results = await pool.query(
            `SELECT * FROM eagleeye_schema.sales_replies
             WHERE parent_sales_id = $1
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


module.exports = { insertSalesReply, getSalesReplies };
