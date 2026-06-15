
import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";   
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/generate.routes.js"; // Import the notes router for handling notes generation routes
import pdfRouter from "./routes/pdf.route.js";
import creditRouter from "./routes/credits.route.js";
import { stripWebhook } from "./controllers/credits.controller.js";


dotenv.config(); // Load environment variables from .env file

const port = process.env.PORT || 7000;

const app = express();


// Route for webhook strip event :-
app.post("/api/credits/webhook", express.raw({ type: "application/json" }), stripWebhook);


app.use(cors(
    {
        origin: process.env.CLIENT_URL, // Allow requests from the specified client URL
        credentials: true, // Allow cookies to be sent with requests
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    }
)); // Enable CORS for the specified client URL with credentials support


app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/auth", authRouter); // Use the auth router for authentication routes
app.use("/api/user", userRouter); // Use the user router for user-related routes
app.use("/api/notes", notesRouter); // Use the notes router for notes-related routes
app.use("/api/pdf", pdfRouter); // Use the pdf router to download pdf
app.use("/api/credit", creditRouter); 


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDb(); // Connect to the database when the server starts
});


