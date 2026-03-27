const User = require("../models/user.model.js");

const submit = async (req, res) => {
  try {
    const name = req.body?.name?.trim();
    const issue = req.body?.issue?.trim();
    const category = req.body?.category?.trim() || "";

    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    if (!issue) {
      return res.status(400).json({
        message: "Issue is required",
      });
    }

    let aiResponse = "";

    if (issue.toLowerCase().includes("fever")) {
      aiResponse = "Take rest and drink fluids.";
    } else if (issue.toLowerCase().includes("pain")) {
      aiResponse = "Stay hydrated and take proper rest.";
    } else if (issue.toLowerCase().includes("emergency")) {
      aiResponse = "Call emergency helpline immediately!";
    } else {
      aiResponse = "Our team will contact you soon.";
    }

    const patient = await User.create({
      name,
      issue,
      category,
      response: aiResponse
    });

    return res.status(201).json({
      message: aiResponse,
      data: patient
    });

  } catch (error) {
    console.error("Error in submit:", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await User.find();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in getAll:", error.message);
    return res.status(500).json({
      message: "Error fetching data"
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params?.id?.trim();

    if (!id) {
      return res.status(400).json({
        message: "ID is required"
      });
    }

    const user = await User.findByIdAndDelete(id);

    return res.status(200).json({
      message: "User deleted successfully",
      user
    });

  } catch (error) {
    console.error("Error in deleteUser:", error.message);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

module.exports = { submit, getAll, deleteUser };
