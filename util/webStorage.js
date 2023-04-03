import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const STORAGE_PATH = process.env.STORAGE_PATH;

export const load = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(STORAGE_PATH, (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data.toString()));
    });
  });
};

export const edit = (customerSeatSelection) => {
  return new Promise((resolve, rejct) => {
    load()
      .then((cinema) => {
        let findSeatIndex = cinema[1].seats.findIndex(
          (seat) => seat.seatNum === customerSeatSelection
        );
        cinema[1].seats[findSeatIndex].status = uuidv4();
        cinema[1].turnover =
          Number(cinema[1].turnover) + cinema[1].prices[cinema[1].seats[findSeatIndex].class];
        fs.writeFile(STORAGE_PATH, JSON.stringify(cinema, null, 2), (err) => {
          if (err) rejct(err);
          else resolve(cinema);
        });
      })
      .catch((err) => rejct(err));
  });
};

export const reset = () => {
  return new Promise((resolve, rejct) => {
    load()
      .then((cinema) => {
        cinema[1] = cinema[0]; //cinema[1] user edit object |-| cinema[0] Default object
        fs.writeFile(STORAGE_PATH, JSON.stringify(cinema, null, 2), (err) => {
          if (err) rejct(err);
          else resolve(cinema);
        });
      })
      .catch((err) => rejct(err));
  });
};
