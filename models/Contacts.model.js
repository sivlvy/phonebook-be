const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Contacts = sequelize.define(
  "contacts",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "contacts", timestamps: false },
);

module.exports = Contacts;
