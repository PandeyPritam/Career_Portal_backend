// const Course = require("../models/Course");

// module.exports.getCourses = async (req, res) => {
//   try {
//     const courses = await Course.find();
//     if (!courses || courses.length === 0) {
//       return res.status(404).json({ error: "No courses found" });
//     }
//     res.status(200).json(courses);
//   } catch (error) {
//     console.error("Error fetching courses:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };