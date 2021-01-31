const { default: axios } = require("axios");
const express = require("express");

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios
      .post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: { ...data, status },
      })
      .catch((err) => console.log(err));
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Listening on 4003");
});
