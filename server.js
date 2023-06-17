import express from "express";
import config from "./database/config.js";
import socialPlatformRoutes from "./routes/social.platform.routes.js"
import postsRoutes from "./routes/posts.routes.js"
import commentsRoutes from "./routes/comments.routes.js";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(bodyParser)

socialPlatformRoutes(app);
postsRoutes(app);
commentsRoutes(app);

app.get("/", (req, res) => {
  res.send("Hello 😋 nice to meet you. Welcome to my social platform API");
});

// app.use( '/users',social.platform.routes)

app.listen(config.port, () => {
  console.log(`Server running at ${config.host}:${config.port}...`);
});
