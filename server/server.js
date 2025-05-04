import React from "react";
import ReactDOMServer from "react-dom/server";
import MainRouter from "./../client/MainRouter";
import StaticRouter from "react-router-dom/StaticRouter";

import { SheetsRegistry } from "react-jss/lib/jss";
import JssProvider from "react-jss/lib/JssProvider";

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mount routes
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", shopRoutes);
app.use("/", productRoutes);
app.use("/", orderRoutes);

// Catch unauthorised errors
app.use((err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		res.status(401).json({"error" : err.name + ": " + err.message});
	}
});

export default app;
