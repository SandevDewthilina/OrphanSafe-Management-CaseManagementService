import express from "express";
import cookieParser from "cookie-parser";
import caseRoutes from "./routes/caseRoutes.js";
import { runMigrations } from "./migrations/index.js";
import { RPCObserver, RPCRequest } from "./lib/rabbitmq/index.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { PORT, CASE_SERVICE_RPC } from "./config/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// runMigrations()

// RPCObserver
RPCObserver(CASE_SERVICE_RPC);

// routes
app.use("/api/case", caseRoutes);
app.get("/api", (req, res) => res.status(200).json("case service is listening"));

//error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`service is listening on port ${PORT}`));
