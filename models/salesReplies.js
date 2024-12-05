const { resourceLimits } = require('worker_threads');
const pool = require('../pool');

const insertSalesReply = async (parentID, content, ownerId) => {
    try{
        const result = await pool.query(
            `INSERT INTO eagleeye_schema.db_replies (parentID, content, owenerID) 
             VALUES ($1, $2, $3) RETURNING *`
             [parentID, content, ownerId]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error inserting Sales reply:', error);
        throw error;
    }
};


const getSalesReplies = async ( limit) => {
    try{
        const results = await pool.query(
            `Select * FROM eagleeye_schema.sales_replies ORDER BY post_date ASC LIMIT $1`
            [limit]
        );
        return result.rows;
    } catch (error){
        console.error('Error fetching sales replies', error);
        throw error;
    }
};

module.exports = {insertSalesReply, getSalesReplies};