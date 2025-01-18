import "dotenv/config";
import express from "express";
import connectDB from "./config/dbConnect";
import bookRoutes from "./routes/bookRoutes";

const app = express();
app.use(express.json(), bookRoutes);

const PORT = 3000;

app.get("/", (req, res) => {
  res.status(200).send("Node.js Library");
});

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

startServer();
