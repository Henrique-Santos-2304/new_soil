class QueryError extends Error {
  constructor() {
    super('Query Error');

    Object.setPrototypeOf(this, QueryError.prototype);
  }
}

class DatabaseError extends Error {
  constructor() {
    super('DATABASE ERROR');

    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

export { QueryError, DatabaseError };
