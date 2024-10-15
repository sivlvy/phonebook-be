require("dotenv").config();
const sequelize = require("./config/db.config");
const express = require("express");
const userRoutes = require("./routes/user.routes");
const contactsRouter = require("./routes/contacts.routes");
const app = express();
const PORT = process.env.DB_PORT || 5432;

app.use(express.json());

sequelize
  .sync()
  .then(() => console.log("All models were synchronized successfully."))
  .catch((error) => console.error("Unable to synchronize models:", error));

app.use("/api", userRoutes);
app.use("/api", contactsRouter);

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
