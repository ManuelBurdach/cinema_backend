import express from "express";
import morgan from "morgan";
import cors from "cors";
// import "./config/config.js";
import { edit, load, reset } from "./util/webStorage.js";
import nodemailer from "nodemailer";

const PORT = process.env.PORT || 7777;

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0c71215717b824",
    pass: "90ccf7d4b0f598",
  },
});

const mailSend = (seat) => {
  const message = {
    from: "bookingsystem@cinema.de",
    to: "booking@cinema.de",
    subject: "One seat was booked",
    text: `Seat nr. ${seat} was booking.`,
    html: `<h1>Seat nr. ${seat} was booking.</h1>`,
  };
  transport.sendMail(message, (err, info) => {
    if (err) console.log("MAILING ERRROR ", err);
    else {
      console.log("Info ", info);
    }
  });
};

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/api/v1/cinema", (req, res) => {
  load()
    .then((cinema) => {
      res.json(cinema);
    })
    .catch((err) => {
      console.log(err);
      res.end();
    });
});

app.put("/api/v1/cinema/:seat", (req, res) => {
  const seat = req.params.seat;
  edit(seat)
    .then((cinema) => {
      mailSend(seat);
      res.json(cinema);
    })
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
