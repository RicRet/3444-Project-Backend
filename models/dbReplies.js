const { resourceLimits } = require('worker_threads');
const pool = require('../pool');

const insertReply = async(parentID, content, ownerID) =>{
    try {
        const result = await pool.query(
          `INSERT INTO eagleeye_schema.db_replies (heading, parentID, ownerID)
           VALUES ($1,$2, $3, $4) RETURNING *`,
          [heading, content, ownerId, imageUrl]
        );
        return result.rows[0];
    }
    catch(error){
        console.error('valio verga', error);
        throw error;
    }
};

const getReplies = async(limit) => {
    try{
        const result = await pool.query(
            'SELECT * FROM eagleeye_schema.db_replies ORDER BY post_date ASC LIMT $1'
            [limit]
        );
        return result.rows
    }
    catch(error){
        console.error('no te agarro las pinches vergas estas');
        throw error;
    }
};

module.exports = {insertReply, getReplies};