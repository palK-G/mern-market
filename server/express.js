import React from "react";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";

// middle modules
import helmet from "helmet";
import Template from "./../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import shopRoutes from "./routes/shop.routes";
import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.routes";

// server-side modules
import ReactDOMServer from "react-dom/server";
import MainRouter from "./../client/MainRouter";
import StaticRouter from "react-router-dom/StaticRouter";

// Front end modules

import { SheetsRegistry } from "react-jss/lib/jss";
import JssProvider from "react-jss/lib/JssProvider";
// import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from "material-ui/styles";
// import { blueGrey, lightGreen } from "material-ui/colors";

// Catch unauthorised errors
app.use((err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		res.status(401).json({"error" : err.name + ": " + err.message});
	}
});

export default app;
