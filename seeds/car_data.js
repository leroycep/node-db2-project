exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("cars").insert([
        { vin: "a", make: "Chevy", model: "Prizm", mileage: 20000 },
        {
          vin: "b",
          make: "Hyundai",
          model: "Sonata",
          mileage: 10000,
          title_status: "clean",
        },
        {
          vin: "c",
          make: "VolksWagen",
          model: "Golf",
          mileage: 24000,
          transmission: "shot",
        },
      ]);
    });
};
