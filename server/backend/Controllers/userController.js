import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to  updated",
      data: updateUser,
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to  delete" });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password");

    res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "No user found" });
  }
};

export const getAllUser = async (req, res) => {
  const id = req.params.id;

  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "Users Found",
      data: users,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not Found" });
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "something we wrong, cannot get" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    //step1 : retrive appointments from booking
    const bookings = await Booking.find({ user: req.userId });

    //step2: extract doctor ids from the appointment booking
    const doctorIds = bookings.map((el) => el.doctor.id);

    //step3: retrieve doctors using doctor ids
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
      "-password"
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Appointments are getting",
        data: doctors,
      });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};

// export const getMyAppointments = async (req, res) => {
//   try {
//     // Step 1: Retrieve appointments from booking
//     const bookings = await Booking.find({ user: req.userId });
// 
//     // Step 2: Extract doctor ids from the appointment booking
//     const doctorIds = bookings.map((el) => el.doctor.id);
// 
//     // Step 3: Retrieve doctors using doctor ids
//     const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
//       "-password"
//     );
// 
//     // Step 4: Combine booking details with doctor details
//     const appointments = bookings.map(booking => {
//       const doctor = doctors.find(doc => doc._id.toString() === booking.doctor.id);
//       return {
//         booking,
//         doctor
//       };
//     });
// 
//     console.log(appointments)
//     res.status(200).json({
//       success: true,
//       message: "Appointments are getting",
//       data: appointments,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong, cannot get",
//     });
//   }
// };
