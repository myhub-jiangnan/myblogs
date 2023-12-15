import express from "express";
const app = express();
const port = 9000;

app.get("/test1", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("Hello");
});
app.get("/test2", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
