import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import methodOverride from "method-override";
import foundationRoute from '../backend/routes/foundationRoute.js'
import literatureRoute from '../backend/routes/literatureRoute.js'
import numericalRoute from '../backend/routes/numericalRoute.js'
import emotionalRoute from '../backend/routes/emotionalRoute.js'
import UserRoute from "./routes/userAuthRoutes.js";


dotenv.config();
const app=express();
const mongo_url="mongodb+srv://adnanali11875:helloworld@cluster0.juu9a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const PORT=5000

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use('/userauth',UserRoute)
app.use("/found", foundationRoute);
app.use("/lit", literatureRoute);
app.use("/num", numericalRoute);
app.use("/emo", emotionalRoute);

mongoose
  .connect(mongo_url)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });