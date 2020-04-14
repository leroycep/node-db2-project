exports.up = function (knex) {
  return knex.schema.createTable("sales", (tbl) => {
    tbl.increments("id");
    tbl.date("date_of_sale").notNullable();
    tbl.integer("car_id").unsigned().references("cars.id");
    tbl.decimal("amount_sold_for", 8, 2).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("sales");
};
