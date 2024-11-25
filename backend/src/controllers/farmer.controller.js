const profileViewController = async (req, res) => {
  try {
    const { _id, firstName, lastName, email, phone, role, profileImg } =
      req.userData;

    // Validate if user logged in is the Farmer or not
    if (role !== "farmer") {
      res.status(400).json({
        statusCode: "400",
        err: "Unauthorized access",
        message: "User logged in does not have access to farmer role.",
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        message: `Hello farmer ${firstName} ${lastName}. Welcome back!`,
        res: req.userData,
      });
    }
  } catch (err) {
    res.status(400).json({
      statusCode: "400",
      err: err.message,
      message: "Internal server error",
    });
  }
};

module.exports = {
  profileViewController,
};
