const { use } = require("passport");
const pool = require("../db/pool");

module.exports.findByUsername = async (username) => {
  const { rows } = await pool.query(
    `
    SELECT id from users
    WHERE username = $1
    `,
    [username],
  );
  return rows[0];
};
module.exports.findByEmail = async (email) => {
  const { rows } = await pool.query(
    `
    SELECT id from users
    WHERE email = $1
    `,
    [email],
  );
  return rows[0];
};
module.exports.registerUser = async (username, email, password) => {
    
  await pool.query(
    `
        INSERT INTO users(username,email,password)
        VALUES ($1,$2,$3)
        `,
    [username, email, password],
  );
}
module.exports.findUsername = async(username)=>{
 const {rows} = await pool.query(`
    SELECT * FROM users 
    WHERE username = $1
    `,[username]);
  const user = rows[0];
  return user;
}
module.exports.findByID = async(id)=>{
  const {rows} = await pool.query(`
    SELECT * FROM users
    WHERE id=$1
    `, [id])
    const user = rows[0];
    return user;
}