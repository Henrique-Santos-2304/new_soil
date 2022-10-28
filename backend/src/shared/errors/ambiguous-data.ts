class AmbiguousData extends Error {
  constructor(data: string) {
    super(
      `${data} Ambiguous Data, The data received is equal a ${data} data of db`,
    );

    Object.setPrototypeOf(this, AmbiguousData.prototype);
  }
}

export { AmbiguousData };
