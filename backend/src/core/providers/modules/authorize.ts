import { Provider } from '@nestjs/common';
import { getAuthorizeControllerProvider } from '../controllers';
import { createAuthorizeProvider, findAuthorizeRepoProvider } from '../repos';
import { findAuthorizeServiceProvider } from '../services';
import { loggerServiceProvider } from '../utils';

const allAuthorizesRepoProviders: Provider[] = [
  findAuthorizeRepoProvider,
  createAuthorizeProvider,
];

const allServicesAuthorizeProviders: Provider[] = [
  findAuthorizeServiceProvider,
];

const allControllersAuthorizeProviders: Provider[] = [
  getAuthorizeControllerProvider,
];

const utilsProvider: Provider[] = [loggerServiceProvider];

const allAuthorizesProviders: Provider[] = [
  ...allAuthorizesRepoProviders,
  ...allServicesAuthorizeProviders,
  ...allControllersAuthorizeProviders,
  ...utilsProvider,
];

export { allAuthorizesProviders };
