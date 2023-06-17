CREATE DATABASE socialPlatform;

USE socialPlatform;

CREATE TABLE Users (
	user_id INT IDENTITY(100, 1) PRIMARY KEY,
	username VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255)
	);

	SELECT * FROM Users;

CREATE TABLE Posts (
	post_id INT IDENTITY(200, 1) PRIMARY KEY,
	title VARCHAR(255),
	content VARCHAR(500),
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES Users (user_id)
	);

	SELECT * FROM Posts;

CREATE TABLE Comments (
	comment_id INT IDENTITY(200, 1) PRIMARY KEY,
	content VARCHAR(500),
	user_id INT,
	post_id INT,
	FOREIGN KEY (user_id) REFERENCES Users (user_id),
	FOREIGN KEY (post_id) REFERENCES Posts (post_id),
   );

   SELECT * FROM Comments;