import sql from "mssql";
import config from "../database/config.js";

//get a comment
export const getOneComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    let pool = await sql.connect(config.sql);
    const resultSet = await pool
      .request()
      
      .input("comment_id", sql.VarChar, comment_id)
      .query("SELECT * FROM Comments WHERE comment_id= @comment_id");
    res.status(200).json(resultSet.recordset[0]);

  } catch (error) {
    res
    .status(500)
    .json( error.message);
  } finally {
    sql.close();
  }
};

// get all comments
export const getComments = async (req, res) => {
    try {
      
      let pool = await sql.connect(config.sql);
      const resultSet = await pool
        .request()
        .query("SELECT * FROM Comments");
      res.status(200).json(resultSet.recordset[0]);
  
    } catch (error) {
      res
      .status(500)
      .json( error.message);
    } finally {
      sql.close();
    }
  };
//create a comment
export const createComments = async (req, res) => {
  try {
    const {  content } = req.body;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
     
  
      .input("content", sql.VarChar, content)
      .query(
        "INSERT INTO Comments (  content) VALUES ( @content)"
      );
    res.status(200).json({ message: "Comment created successfully" });
  } catch (error) {
    res
      .status(500)
      .json( error.message);
  } finally {
    sql.close();
  }
  
};



//update a comment
export const updateComment = async (req, res) => {
  try{
      const { comment_id } = req.params;
      const {content} = req.body;
      let pool = await sql.connect(config.sql);
      const resultset = await pool
        .request()
        .input("comment_id", sql.VarChar, comment_id)
        .input("content", sql.VarChar, content)
        .query(
          "UPDATE Posts SET content=@content WHERE comment_id=@comment_id"
        );
        res.status(200).json({message:"Content was updated successfully"});
  } catch (error) {
    
      res.status(400).json(error.message)
      
  }  finally {
    sql.close();
  }
 
};

//delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    let pool = await sql.connect(config.sql);

    await sql.query`DELETE FROM Posts WHERE comment_id = ${comment_id}`;
    res.status(200).json({ message: "comment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json( error.message);
  } finally {
    sql.close();
  }
};
