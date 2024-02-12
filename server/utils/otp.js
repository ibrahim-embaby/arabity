const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const sendEmail = require("./sendEmail");
const accountSid = "ACdbb5a7b3acd3c8d71a7c71e4b63f3615";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = "VAac9b38951a1917a0e49a1a073b98784a";
const client = require("twilio")(accountSid, authToken);

async function createEmailOtp(params, callback) {
  try {
    const otp = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const ttl = 10 * 60 * 1000; // 10 min
    const expires = Date.now() + ttl;
    const data = `${params.email}.${otp}.${expires}`;
    const hash = crypto
      .createHmac("sha256", process.env.OTP_SECRET_KEY)
      .update(data)
      .digest("hex");
    const fullHash = `${hash}.${expires}`;

    console.log(`your OTP is ${otp}`);

    // send email
    await sendEmail(
      params.email,
      otp,
      params.username,
      "Email Verification",
      "varificationmail"
    );

    return callback(null, fullHash);
  } catch (error) {
    console.log(error);
  }
}

async function verifyEmailOtp(params, callback) {
  try {
    let [hashValue, expires] = params.hash.split(".");

    let now = Date.now();
    if (now > parseInt(expires)) return callback("OTP Expired");

    let data = `${params.email}.${params.otp}.${expires}`;
    let newCalculateHash = crypto
      .createHmac("sha256", process.env.OTP_SECRET_KEY)
      .update(data)
      .digest("hex");

    if (newCalculateHash === hashValue) return callback(null, "Success");

    return callback("Invalid OTP");
  } catch (error) {
    console.log(error);
  }
}

async function createPasswordOtp(params, callback) {
  try {
    const otp = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const ttl = 10 * 60 * 1000; // 10 min
    const expires = Date.now() + ttl;
    const data = `${params.email}.${otp}.${expires}`;
    const hash = crypto
      .createHmac("sha256", process.env.OTP_SECRET_KEY)
      .update(data)
      .digest("hex");
    const fullHash = `${hash}.${expires}`;

    console.log(`your OTP is ${otp}`);

    // send email
    await sendEmail(
      params.email,
      otp,
      params.username,
      "Reset Password",
      "forgotpasswordmail"
    );

    return callback(null, fullHash);
  } catch (error) {
    console.log(error);
  }
}

async function verifyPasswordOtp(params, callback) {
  try {
    let [hashValue, expires] = params.hash.split(".");

    let now = Date.now();
    if (now > parseInt(expires)) return callback("OTP Expired");

    let data = `${params.email}.${params.otp}.${expires}`;
    let newCalculateHash = crypto
      .createHmac("sha256", process.env.OTP_SECRET_KEY)
      .update(data)
      .digest("hex");

    if (newCalculateHash === hashValue) return callback(null, "Success");

    return callback("Invalid OTP");
  } catch (error) {
    console.log(error);
  }
}

async function createTwilioOtp(params, callback) {
  // send sms
  try {
    const verification = await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: params.phone, channel: "sms" });

    console.log(verification.status);
    if (verification.status === "pending")
      return callback(null, verification.status);
  } catch (error) {
    console.log(error);
  }
}

async function verifyTwilioOtp(params, callback) {
  try {
    const verification_check = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: params.phone, code: params.otp });

    console.log(verification_check.status);
    if (verification_check.status === "approved")
      return callback(null, "Success");
    return callback("Invalid OTP");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createEmailOtp,
  verifyEmailOtp,
  createTwilioOtp,
  verifyTwilioOtp,
  createPasswordOtp,
  verifyPasswordOtp,
};
