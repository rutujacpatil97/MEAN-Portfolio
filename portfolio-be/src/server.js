import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const port = process.env.PORT || 3000;

connectDatabase().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
