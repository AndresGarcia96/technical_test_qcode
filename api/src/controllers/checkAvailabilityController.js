const calculateAvailableSpaces = require("../services/checkAvailabilityService");

const checkAvailabilityService = async (req, res) => {
  try {
    const { day } = req.params;

    const spacesAvailable = await calculateAvailableSpaces(day);
    res.status(200).json({ spacesAvailable });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = checkAvailabilityService;
