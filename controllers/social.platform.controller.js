import sql from "mssql";
import config from "../database/config.js";

//lets get all users
export const getUsers = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const resultSet = await pool.request().query("SELECT * FROM Users");
    res.status(200).json(resultSet.recordsets);
  } catch (error) {
    res.status(220).json({ error: "an error occurred while retrieving users" });
  } finally {
    sql.close();
  }
};


//get a user
export const getOneUser = async (req, res) => {
  try {
    const { Username } = req.params;
    let pool = await sql.connect(config.sql);
    const resultSet = await pool
      .request()
      // .input('UserId', sql.Int, UserId)
      .input("Username", sql.VarChar, Username)
      .query("SELECT * FROM Users WHERE Username = @Username");
    res.status(200).json(resultSet.recordset[0]);

  } catch (error) {
    res
    .status(500)
    .json( error.message);
  } finally {
    sql.close();
  }
};

//create a user/ add a user
export const createUsers = async (req, res) => {
  try {
    const { username, password } = req.body;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      // .input("UserID", sql.Int, UserID)
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, password)
      .query(
        "INSERT INTO Users ( username, password) VALUES ( @username, @password)"
      );
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json( error.message);
  } finally {
    sql.close();
  }
  
};



//update a user
export const updateUser = async (req, res) => {
  try{
      const { username,password } = req.params;
      
      let pool = await sql.connect(config.sql);
      const resultset = await pool
        .request()
        .input("username", sql.VarChar, username)
        .input("password", sql.VarChar, password)
        .query(
          "UPDATE Users SET password=@password WHERE username=@username"
        );
        res.status(200).json({message:"User password was updated successfully"});
  } catch (error) {
    
      res.status(400).json(error.message)
      
  }  finally {
    sql.close();
  }
 
};

//delete a user
export const deleteUser = async (req, res) => {
  try {
    const { Username } = req.params;
    let pool = await sql.connect(config.sql);

    await sql.query`DELETE FROM Users WHERE username = ${username}`;
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json( error.message);
  } finally {
    sql.close();
  }
};
