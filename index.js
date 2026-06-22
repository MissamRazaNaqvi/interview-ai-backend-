import dotenv from "dotenv";
dotenv.config();

import dbConnect from "./src/dbConfig/dbConnect.js";
import { app } from "./src/app.js";

await dbConnect()
  // .then(() => {
  //   app.listen(8000, () => {
  //     console.log("Server running on port 8000");
  //   });
  // })
  // .catch((error) => {
  //   console.error("MongoDB connection failed:", error);
  // });

export default app;
