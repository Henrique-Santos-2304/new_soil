export type StatusReponse = 'Sucess' | 'Fail';

export interface ResponseHttp {
  status: StatusReponse;
}
export interface ResponseWithoutData extends ResponseHttp {
  error?: string;
}
