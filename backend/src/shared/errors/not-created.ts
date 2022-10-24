class NotCreatedError extends Error {
  constructor(data: string) {
    super(`${data} Not Created`);

    Object.setPrototypeOf(this, NotCreatedError.prototype);
  }
}

export { NotCreatedError };
