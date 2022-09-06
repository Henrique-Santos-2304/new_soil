interface IEncrypterData{
  encrypt({value}: NEncrypt.Params): NEncrypt.Response
  compare({old_value, valueCompare}: NCompare.Params): NCompare.Response
}

namespace NEncrypt{
  export type Params<P=string> = {value: P}
  export type Response = Promise<string | "ENCRYPT ERROR">
}

namespace NCompare{
  export type Params<P=string> = {old_value: string, valueCompare: P}
  export type Response = Promise<boolean | "ENCRYPT ERROR">
}

export { IEncrypterData, NEncrypt, NCompare }