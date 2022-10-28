/* 
    Na camada core teremos as abstrações do nosso código.
    Bem como interfaces de services, modelos de classes, métodos abstratos,
    que serão implementados pelo estante da aplicação.
    Para uma organização melhor separamos em 3 subclasses base, domain, repository.
*/
export * from './models';
export * from './usecases';
export * from './repositories';
export * from './validators';
export * from './controllers';
export * from './utils';
