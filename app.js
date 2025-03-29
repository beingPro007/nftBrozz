import express from "express";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
   origin: "*"
}))

import userRoute from "./routes/user.routes.js";
import nftRouter from "./routes/nft.routes.js"

app.use("/api/v1/users", userRoute);
app.use("/api/v1/users/nft", nftRouter);

export { app }