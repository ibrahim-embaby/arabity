const asyncHandler = require("express-async-handler");
const {
  validateCreateMechanicPost,
  MechanicPost,
} = require("../models/MechanicPost");
const { WorkshopOwner } = require("../models/Mechanic");

/**
 * @desc
 * @route /api/mechanic/:mechanicId/posts/:postId
 * @method
 * @access
 */
module.exports.Ctrl = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});

/**
 * @desc create mechanic post
 * @route /api/mechanic-posts/
 * @method POST
 * @access private (logged user only)
 */
module.exports.createMechanicPostCtrl = asyncHandler(async (req, res) => {
  try {
    const { error } = validateCreateMechanicPost(req.body);
    if (error) return res.status(400).json({ message: error.message });
    const { text } = req.body;
    const isMechanic = await WorkshopOwner.findById(req.user.id);
    if (!isMechanic)
      return res.status(400).json({ message: req.t("forbidden") });
    const newPost = await MechanicPost.create({
      postCreator: req.user.id,
      text,
    });
    res.status(201).json({ data: newPost, message: req.t("post_created") });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});

/**
 * @desc get single mechanic post
 * @route /api/mechanic-posts/:id
 * @method GET
 * @access public
 */
module.exports.getSingleMechanicPostCtrl = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: req.t("server_error") });
  }
});
