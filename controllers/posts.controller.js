import sql from "mssql";
import config from "../database/config.js";


//get all posts
export const getPosts = async (req, res) => {
    try {
      
      let pool = await sql.connect(config.sql);
      const resultSet = await pool
        .request()
        .query("SELECT * FROM Posts");
      res.status(200).json(resultSet.recordset[0]);
  
    } catch (error) {
      res
      .status(500)
      .json( error.message);
    } finally {
      sql.close();
    }
  };

//get a post
export const getOnePost = async (req, res) => {
  try {
    const { title } = req.params;
    let pool = await sql.connect(config.sql);
    const resultSet = await pool
      .request()
      
      .input("title", sql.VarChar, title)
      .query("SELECT * FROM Posts WHERE title = @title");
    res.status(200).json(resultSet.recordset[0]);

  } catch (error) {
    res
    .status(500)
    .json( error.message);
  } finally {
    sql.close();
  }
};

//create a post
export const createPosts = async (req, res) => {
  try {
    const { title, content } = req.body;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
     
      .input("title", sql.VarChar, title)
      .input("content", sql.VarChar, content)
      .query(
        "INSERT INTO Posts ( title, content) VALUES ( @title, @content)"
      );
    res.status(200).json({ message: "Post created successfully" });
  } catch (error) {
    res
      .status(500)
      .json( error.message);
  } finally {
    sql.close();
  }
  
};



//update a post
export const updatePost = async (req, res) => {
  try{
      const { title, content } = req.params;
      
      let pool = await sql.connect(config.sql);
      const resultset = await pool
        .request()
        .input("title", sql.VarChar, title)
        .input("content", sql.VarChar, content)
        .query(
          "UPDATE Posts SET title=@title WHERE content=@content"
        );
        res.status(200).json({message:"Post was updated successfully"});
  } catch (error) {
    
      res.status(400).json(error.message)
      
  }  finally {
    sql.close();
  }
 
};

//delete a post
export const deletePost = async (req, res) => {
  try {
    const { post_id } = req.params;
    let pool = await sql.connect(config.sql);
    const deletePost = await pool.request()
    .input("post_id", sql.Int, post_id)
    .query("DELETE FROM Posts WHERE post_id = @post_id")
    res.status(200).json({ message: "post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json( error.message);
  } finally {
    sql.close();
  }
};
