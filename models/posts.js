const pool = require("../db/pool");

module.exports.postsWithoutAutor = async () => {
  const { rows } = await pool.query(`
    SELECT title,text,created_at
    FROM posts
    `);
  return rows;
};
module.exports.postsWithAutor = async () => {
  const { rows } = await pool.query(`
    SELECT 
      posts.title,
      posts.text,
      posts.created_at,
      users.username
    FROM posts
    JOIN users
      ON posts.user_id = users.id
  `);

  return rows;
};
module.exports.addNewPost =async(title,text,userId)=>{
  await pool.query(`
    INSERT INTO posts (title,text,user_id)
    VALUES ($1,$2,$3)
    `,[title,text,userId]);
}