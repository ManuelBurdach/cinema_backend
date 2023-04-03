import express from "express";
import morgan from "morgan";
import cors from "cors";
// import "./config/config.js";
import { edit, load, reset } from "./util/webStorage.js";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/api/v1/cinema", (req, res) => {
  load()
    .then((cinema) => res.json(cinema))
    .catch((err) => {
      console.log(err);
      res.end();
    });
});

app.put("/api/v1/cinema/:seat", (req, res) => {
  const seat = req.params.seat;
  edit(seat)
    .then((cinema) => res.json(cinema))
    .catch((err) => {
      console.log(err);
      res.end();
    });
});

app.put("/api/v1/reset", (req, res) => {
  reset()
    .then((cinema) => res.json(cinema))
    .catch((err) => {
      console.log(err);
      res.end();
    });
});

app.listen(PORT, () => console.log("Server listen on port: ", PORT));
