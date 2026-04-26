const dotenv = require("dotenv");
const app = require("./app");
const connectToDatabase = require("./config/db");

dotenv.config();

const port = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(port, () => console.log(`Server running on ${port}`));
  })
  .catch((error) => {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  });
