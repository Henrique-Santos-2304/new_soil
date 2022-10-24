class AlreadyExistsError extends Error {
  constructor(data: string) {
    super(`${data} Already Exists`);

    Object.setPrototypeOf(this, AlreadyExistsError.prototype);
  }
}

export { AlreadyExistsError };
