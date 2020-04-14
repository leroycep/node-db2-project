exports.up = function (knex) {
  return knex.schema.createTable("cars", (tbl) => {
    tbl.increments("id");
    tbl.string("vin").notNullable().unique().index();

    // Ideally, these two would be keys to a different table
    tbl.string("make").notNullable();
    tbl.string("model").notNullable();

    tbl.integer("mileage").notNullable();

    tbl.string("transmission");
    tbl.string("title_status");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
