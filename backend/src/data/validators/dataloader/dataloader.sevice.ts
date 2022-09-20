import DataLoader from 'dataloader';

export interface IDataloaders {
  ownersLoader: DataLoader<number, any>;
}

export class DataloaderService {
  constructor(private readonly loader: any) {}

  createLoaders(): IDataloaders {
    const ownersLoader = new DataLoader<number, any>(async () => this.loader);

    return {
      ownersLoader, // return a new loader
    };
  }
}
