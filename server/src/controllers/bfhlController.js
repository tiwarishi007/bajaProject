const processHierarchy = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Controller is working",
  });
};

module.exports = {
  processHierarchy,
};