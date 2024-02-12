class ErrorResponse extends Error {
  statusCode;
  constructor(message, statusCode) {
    super(message);
    this.name = Error.name;
    this.statusCode = statusCode;
  }
}
module.exports = ErrorResponse;
