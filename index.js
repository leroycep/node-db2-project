const express = require("express");
const knex = require("knex");

const db = knex(require("./knexfile.js").development);
const PORT = process.env.PORT || 25494;
const server = express();

server.use(express.json());

server.get("/api/cars", (req, res) => {
  db("cars")
    .select()
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

server.post("/api/cars", validateCar, (req, res) => {
  db("cars")
    .insert(req.body, "id")
    .then((car_ids) => {
      const car_id = car_ids[0];
      db("cars")
        .select()
        .where("id", car_id)
        .first()
        .then((car) => res.status(201).json(car))
        .catch((error) =>
          res.status(500).json({ message: "could not retrieve new car", error })
        );
    })
    .catch((error) =>
      res.status(500).json({ message: "could not insert new car", error })
    );
});

server.put("/api/cars/:id", validateCarId, validateCar, (req, res) => {
  db("cars")
    .where("id", req.car.id)
    .update(req.body)
    .then(() => {
      db("cars")
        .select()
        .where("id", req.car.id)
        .first()
        .then((car) => res.status(200).json(car))
        .catch((error) =>
          res
            .status(500)
            .json({ message: "could not retrieve updated car", error })
        );
    })
    .catch((error) =>{
    console.log(error);
      res.status(500).json({ message: "could not update car", error })
    });
});

function validateCarId(req, res, next) {
  db("cars")
    .select()
    .where("id", req.params.id)
    .first()
    .then((car) => {
      if (car) {
        req.car = car;
        next();
      } else {
        res
          .status(404)
          .json({ message: "could not find car with specified id" });
      }
    })
    .catch((error) =>
      res.status(500).json({ message: "could not retrieve car data", error })
    );
}

function validateCar(req, res, next) {
  if (
    req.body.vin === undefined ||
    req.body.make === undefined ||
    req.body.model === undefined ||
    req.body.mileage === undefined
  ) {
    res.status(400).json({
      error: "The fields 'vin', 'make', 'model', and 'mileage' must be given",
    });
    return;
  }

  next();
}

server.listen(PORT, () =>
  console.log(` == server is listening on port ${PORT} == `)
);
