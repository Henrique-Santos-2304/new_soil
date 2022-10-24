class NotFoundError extends Error {
  constructor(data: string) {
    super(`${data} Not Found`);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export { NotFoundError };
