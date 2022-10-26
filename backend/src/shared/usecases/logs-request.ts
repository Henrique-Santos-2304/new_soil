import { Logger } from '@nestjs/common';

const messageRequest = {
  findSucess: `Busca realizada com sucesso...\n`,
  findError: 'Busca Finalizada com erros...\n',
  createdSucess: `Dados criados com sucesso...\n`,
  createdError: 'Criação de dados Finalizada com erros...\n',
  authSucess: `Usuario autenticado com sucesso...\n`,
  authError: 'Requisição para autenticar Usuario Finalizada com erros...\n',
  deleteError: 'Erro ao deletar dados...',
  deleteSucess: 'Dados deletados com sucesso..',
};

const logInitRequest = (logger: Logger, message: string): void => {
  logger.warn('');
  logger.log(message);
};

const logFinishRequestAuth = (
  logger: Logger,
  err: boolean,
  message?: string,
) => {
  const { authError, authSucess } = messageRequest;
  logger.log(err ? authError : authSucess);
  message && logger.error(message);
};

const logFinishRequestFind = (
  logger: Logger,
  err: boolean,
  message?: string,
): void => {
  const { findError, findSucess } = messageRequest;
  logger.log(err ? findError : findSucess);
  message && logger.error(message);
};

const logFinishRequestCreate = (
  logger: Logger,
  err: boolean,
  message?: string,
): void => {
  const { createdError, createdSucess } = messageRequest;
  logger.log(err ? createdError : createdSucess);
  message && logger.error(message);
};

const logFinishRequestDelete = (
  logger: Logger,
  err: boolean,
  message?: string,
): void => {
  const { deleteError, deleteSucess } = messageRequest;
  logger.log(err ? deleteError : deleteSucess);
  message && logger.error(message);
};

export {
  logInitRequest,
  logFinishRequestFind,
  logFinishRequestCreate,
  logFinishRequestAuth,
  logFinishRequestDelete,
  messageRequest,
};
