import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js"
import bookingRoute from "./Routes/booking.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("Api is working");
});

//database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB database is connected");
  } catch (err) {
    console.log("MongoDB database connection failed");
  }
};

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews",reviewRoute);
app.use("/api/v1/bookings",bookingRoute);


app.listen(port, () => {
  connectDB();
  console.log("Server is running on port " + port);
});





// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import authRoute from "./Routes/auth.js";
// import userRoute from "./Routes/user.js";
// import doctorRoute from "./Routes/doctor.js";
// import reviewRoute from "./Routes/review.js";
// import bookingRoute from "./Routes/booking.js";
// import http from "http";
// import { Server } from "socket.io";

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 8000;

// const corsOptions = {
//   origin: true,
// };

// app.get("/", (req, res) => {
//   res.send("API is working");
// });

// // Database connection
// mongoose.set("strictQuery", false);
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB database is connected");
//   } catch (err) {
//     console.log("MongoDB database connection failed");
//   }
// };

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors(corsOptions));
// app.use("/api/v1/auth", authRoute);
// app.use("/api/v1/users", userRoute);
// app.use("/api/v1/doctors", doctorRoute);
// app.use("/api/v1/reviews", reviewRoute);
// app.use("/api/v1/bookings", bookingRoute);

// // Create HTTP server
// const server = http.createServer(app);

// // Initialize Socket.io
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);

//   socket.on("join", ({ userId }) => {
//     socket.join(userId);
//     console.log(`${userId} joined room`);
//   });

//   socket.on("callDoctor", ({ doctorId, patientName }) => {
//     console.log(`Incoming call from ${patientName} to doctor ${doctorId}`);
//     io.to(doctorId).emit("incomingCall", { patientName });
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });

// server.listen(port, () => {
//   connectDB();
//   console.log("Server is running on port " + port);
// });
