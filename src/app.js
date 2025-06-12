import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();


// Enable CORS with credentials
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// Parse incoming JSON with size limit
app.use(express.json({ limit: "16kb" }));

// Parse URL-encoded data with size limit
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from the "public" directory
app.use(express.static("public"));

app.use(cookieParser());

// Exporting app for use in other modules
export { app };