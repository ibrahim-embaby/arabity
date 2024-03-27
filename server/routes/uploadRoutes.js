const router = require("express").Router();
const { v1: uuid } = require("uuid");
const { verifyToken } = require("../middlewares/verifyToken");

const S3 = require("aws-sdk/clients/s3");
const s3 = new S3({
  region: process.env.AWS_S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_IAM_ACCESS_KEY,
    secretAccessKey: process.env.AWS_IAM_SECRET_ACCESS_KEY,
  },
});

router.get("/", verifyToken, async (req, res) => {
  const key = `${req.user.id}/${uuid()}.jpeg`;
  try {
    const url = s3.getSignedUrl("putObject", {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      ContentType: "image/jpeg",
      Key: key,
    });

    res.status(200).json({ key, url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

module.exports = router;
