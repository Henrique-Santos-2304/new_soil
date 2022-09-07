/*
  Serviço de criptografia de dados, usado para criptografar e comparar senha de usuario

  ******************************************************************************

  @Params
    encrypt = { value } **Valor a ser criptografado
    compare = {
      old_value = valor criptografado , 
      valueCompare =  valor real a comparar com o criptografado
    }

  @Response
    encrypt = 
      Em caso de erro = new Error('ENCRYPT ERROR')
      Em caso de sucesso = Hash com o valor criptografado

    compare = 
      Em caso de erro = new Error('COMPARE ERROR')
      Em caso de sucesso = 
        se o dado recebido bate com o contido dentro do criptografado = true
        se o dado os dados não baterem = false

*/

interface IEncrypterData {
  encrypt({ value }: NEncrypt.Params): NEncrypt.Response;
  compare({ old_value, valueCompare }: NCompare.Params): NCompare.Response;
}

namespace NEncrypt {
  export type Params<P = string> = { value: P };
  export type Response = Promise<string>;
}

namespace NCompare {
  export type Params<P = string> = { old_value: string; valueCompare: P };
  export type Response = Promise<boolean>;
}

export { IEncrypterData, NEncrypt, NCompare };
