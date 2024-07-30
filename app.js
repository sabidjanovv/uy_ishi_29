require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("node:path");
const axios = require("axios");

const PORT = process.env.PORT;

const createViewPath = (page) => {
  return path.join(__dirname, "views", `${page}.ejs`);
};

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "styles"))); // Serve static files
app.set("view engine", "ejs");
app.use(morgan("combined")); // Middleware

app.get("/", (req, res) => {
  res.render(createViewPath("index"), {
    title: "Main",
    page_name: "main",
  });
});

app.get("/users", async (req, res) => {
  try {
    const userData = await axios("https://jsonplaceholder.typicode.com/users");
    const users = await userData.data;
    res.render(createViewPath("users"), {
      title: "Users",
      users,
      page_name: "users",
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { data } = await axios(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    res.render(createViewPath("user"), {
      title: "User Details",
      user: data,
      page_name: "users",
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/add-user", (req, res) => {
  res.render(createViewPath("add-user"), {
    title: "Add User",
    page_name: "users",
  });
});

app.post("/add-user", async (req, res) => {
  const { username, email, phone, website } = req.body;
  try {
    const userData = await axios.post(
      `https://jsonplaceholder.typicode.com/users`,
      {
        username,
        email,
        phone,
        website,
      }
    );

    const user = userData.data;
    res.render(createViewPath("user"), {
      title: "New User",
      user: user,
      page_name: "users",
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/posts", async (req, res) => {
  try {
    const postData = await axios("https://jsonplaceholder.typicode.com/posts");
    const posts = await postData.data;
    res.render(createViewPath("posts"), {
      title: "Posts",
      posts,
      page_name: "posts",
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/post/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { data } = await axios(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    res.render(createViewPath("post"), {
      title: `Post ${id}`,
      post: data,
      page_name: "posts",
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/add-post", (req, res) => {
  res.render(createViewPath("add-post"), {
    title: "Add Post",
    page_name: "posts",
  });
});

app.post("/add-post", async (req, res) => {
  const { title, body } = req.body;
  try {
    const postData = await axios.post(
      `https://jsonplaceholder.typicode.com/posts`,
      {
        title,
        body,
      }
    );

    const post = postData.data;
    res.render(createViewPath("post"), {
      title: "New Post",
      post: post,
      page_name: "posts",
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/jobs", (req, res) => {
  res.render(createViewPath("jobs"), {
    title: "Jobs",
    page_name: "jobs",
  });
});

app.get("/gallery", (req, res) => {
  res.render(createViewPath("gallery"), {
    title: "Gallery",
    page_name: "gallery",
  });
});

app.get("/contact", (req, res) => {
  res.render(createViewPath("contact"), {
    title: "Contact",
    page_name: "contact",
  });
});

app.use((req, res) => {
  res.render(createViewPath("error404"), {
    title: "Error",
    page_name: "error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
