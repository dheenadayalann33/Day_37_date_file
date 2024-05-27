import express from "express";
import fs from "fs";
import { format } from "date-fns";
import path from "path";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const date = format(new Date(), "dd-MM-yyyy-HH-mm-ss");
  const filePathpath = path.join("Files", `${date}.txt`);

  fs.writeFileSync(filePathpath, date, "utf8");
  const data = fs.readFileSync(filePathpath, "utf8");

  res.status(200).send(data);
});

app.get("/files", (req, res) => {
  const filePath = "Files";
  fs.readdir(filePath, (err, files) => {
    const Files = files.filter((file) => path.extname(file) === ".txt");
    res.status(200).json(Files);
  });
});

app.listen(port, () => {
  console.log(`The App running on port ${port}`);
});
