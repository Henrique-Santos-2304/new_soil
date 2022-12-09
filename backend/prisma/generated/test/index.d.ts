
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model User
 * 
 */
export type User = {
  user_id: string
  login: string
  password: string
  userType: UserType
}

/**
 * Model Farm
 * 
 */
export type Farm = {
  farm_id: string
  farm_name: string
  farm_city: string
  farm_lat: number
  farm_lng: number
  owner_id: string
  created_by: string
  updated_by: string | null
  admins: string[]
  dealers: string[]
  users: string[]
}

/**
 * Model Authorize
 * 
 */
export type Authorize = {
  authorize_id: string
  created_by: string
  farm_id: string | null
  pivot_id: string | null
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const UserType: {
  MASTER: 'MASTER',
  DEALER: 'DEALER',
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type UserType = (typeof UserType)[keyof typeof UserType]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.farm`: Exposes CRUD operations for the **Farm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Farms
    * const farms = await prisma.farm.findMany()
    * ```
    */
  get farm(): Prisma.FarmDelegate<GlobalReject>;

  /**
   * `prisma.authorize`: Exposes CRUD operations for the **Authorize** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Authorizes
    * const authorizes = await prisma.authorize.findMany()
    * ```
    */
  get authorize(): Prisma.AuthorizeDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export import Metrics = runtime.Metrics
  export import Metric = runtime.Metric
  export import MetricHistogram = runtime.MetricHistogram
  export import MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Prisma Client JS version: 4.3.0
   * Query Engine version: c875e43600dfe042452e0b868f7a48b817b9640b
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export import FieldRef = runtime.FieldRef

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    User: 'User',
    Farm: 'Farm',
    Authorize: 'Authorize'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    farms: number
  }

  export type UserCountOutputTypeSelect = {
    farms?: boolean
  }

  export type UserCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UserCountOutputType
    : S extends undefined
    ? never
    : S extends UserCountOutputTypeArgs
    ?'include' extends U
    ? UserCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
    : UserCountOutputType
  : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    user_id: string | null
    login: string | null
    password: string | null
    userType: UserType | null
  }

  export type UserMaxAggregateOutputType = {
    user_id: string | null
    login: string | null
    password: string | null
    userType: UserType | null
  }

  export type UserCountAggregateOutputType = {
    user_id: number
    login: number
    password: number
    userType: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    user_id?: true
    login?: true
    password?: true
    userType?: true
  }

  export type UserMaxAggregateInputType = {
    user_id?: true
    login?: true
    password?: true
    userType?: true
  }

  export type UserCountAggregateInputType = {
    user_id?: true
    login?: true
    password?: true
    userType?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    user_id: string
    login: string
    password: string
    userType: UserType
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    user_id?: boolean
    login?: boolean
    password?: boolean
    userType?: boolean
    farms?: boolean | FarmFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserInclude = {
    farms?: boolean | FarmFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
      > = S extends true
        ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ?'include' extends U
    ? User  & {
    [P in TrueKeys<S['include']>]:
        P extends 'farms' ? Array < FarmGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'farms' ? Array < FarmGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
    : User
  : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const userWithUser_idOnly = await prisma.user.findMany({ select: { user_id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find one User that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    farms<T extends FarmFindManyArgs = {}>(args?: Subset<T, FarmFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Farm>>, PrismaPromise<Array<FarmGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User: findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User: findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User: findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = UserFindUniqueArgsBase
      

  /**
   * User: findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = UserFindFirstArgsBase
      

  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model Farm
   */


  export type AggregateFarm = {
    _count: FarmCountAggregateOutputType | null
    _avg: FarmAvgAggregateOutputType | null
    _sum: FarmSumAggregateOutputType | null
    _min: FarmMinAggregateOutputType | null
    _max: FarmMaxAggregateOutputType | null
  }

  export type FarmAvgAggregateOutputType = {
    farm_lat: number | null
    farm_lng: number | null
  }

  export type FarmSumAggregateOutputType = {
    farm_lat: number | null
    farm_lng: number | null
  }

  export type FarmMinAggregateOutputType = {
    farm_id: string | null
    farm_name: string | null
    farm_city: string | null
    farm_lat: number | null
    farm_lng: number | null
    owner_id: string | null
    created_by: string | null
    updated_by: string | null
  }

  export type FarmMaxAggregateOutputType = {
    farm_id: string | null
    farm_name: string | null
    farm_city: string | null
    farm_lat: number | null
    farm_lng: number | null
    owner_id: string | null
    created_by: string | null
    updated_by: string | null
  }

  export type FarmCountAggregateOutputType = {
    farm_id: number
    farm_name: number
    farm_city: number
    farm_lat: number
    farm_lng: number
    owner_id: number
    created_by: number
    updated_by: number
    admins: number
    dealers: number
    users: number
    _all: number
  }


  export type FarmAvgAggregateInputType = {
    farm_lat?: true
    farm_lng?: true
  }

  export type FarmSumAggregateInputType = {
    farm_lat?: true
    farm_lng?: true
  }

  export type FarmMinAggregateInputType = {
    farm_id?: true
    farm_name?: true
    farm_city?: true
    farm_lat?: true
    farm_lng?: true
    owner_id?: true
    created_by?: true
    updated_by?: true
  }

  export type FarmMaxAggregateInputType = {
    farm_id?: true
    farm_name?: true
    farm_city?: true
    farm_lat?: true
    farm_lng?: true
    owner_id?: true
    created_by?: true
    updated_by?: true
  }

  export type FarmCountAggregateInputType = {
    farm_id?: true
    farm_name?: true
    farm_city?: true
    farm_lat?: true
    farm_lng?: true
    owner_id?: true
    created_by?: true
    updated_by?: true
    admins?: true
    dealers?: true
    users?: true
    _all?: true
  }

  export type FarmAggregateArgs = {
    /**
     * Filter which Farm to aggregate.
     * 
    **/
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     * 
    **/
    orderBy?: Enumerable<FarmOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Farms
    **/
    _count?: true | FarmCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FarmAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FarmSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FarmMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FarmMaxAggregateInputType
  }

  export type GetFarmAggregateType<T extends FarmAggregateArgs> = {
        [P in keyof T & keyof AggregateFarm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFarm[P]>
      : GetScalarType<T[P], AggregateFarm[P]>
  }




  export type FarmGroupByArgs = {
    where?: FarmWhereInput
    orderBy?: Enumerable<FarmOrderByWithAggregationInput>
    by: Array<FarmScalarFieldEnum>
    having?: FarmScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FarmCountAggregateInputType | true
    _avg?: FarmAvgAggregateInputType
    _sum?: FarmSumAggregateInputType
    _min?: FarmMinAggregateInputType
    _max?: FarmMaxAggregateInputType
  }


  export type FarmGroupByOutputType = {
    farm_id: string
    farm_name: string
    farm_city: string
    farm_lat: number
    farm_lng: number
    owner_id: string
    created_by: string
    updated_by: string | null
    admins: string[]
    dealers: string[]
    users: string[]
    _count: FarmCountAggregateOutputType | null
    _avg: FarmAvgAggregateOutputType | null
    _sum: FarmSumAggregateOutputType | null
    _min: FarmMinAggregateOutputType | null
    _max: FarmMaxAggregateOutputType | null
  }

  type GetFarmGroupByPayload<T extends FarmGroupByArgs> = PrismaPromise<
    Array<
      PickArray<FarmGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FarmGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FarmGroupByOutputType[P]>
            : GetScalarType<T[P], FarmGroupByOutputType[P]>
        }
      >
    >


  export type FarmSelect = {
    farm_id?: boolean
    farm_name?: boolean
    farm_city?: boolean
    farm_lat?: boolean
    farm_lng?: boolean
    owner?: boolean | UserArgs
    owner_id?: boolean
    created_by?: boolean
    updated_by?: boolean
    admins?: boolean
    dealers?: boolean
    users?: boolean
  }

  export type FarmInclude = {
    owner?: boolean | UserArgs
  }

  export type FarmGetPayload<
    S extends boolean | null | undefined | FarmArgs,
    U = keyof S
      > = S extends true
        ? Farm
    : S extends undefined
    ? never
    : S extends FarmArgs | FarmFindManyArgs
    ?'include' extends U
    ? Farm  & {
    [P in TrueKeys<S['include']>]:
        P extends 'owner' ? UserGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'owner' ? UserGetPayload<S['select'][P]> :  P extends keyof Farm ? Farm[P] : never
  } 
    : Farm
  : Farm


  type FarmCountArgs = Merge<
    Omit<FarmFindManyArgs, 'select' | 'include'> & {
      select?: FarmCountAggregateInputType | true
    }
  >

  export interface FarmDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Farm that matches the filter.
     * @param {FarmFindUniqueArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FarmFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, FarmFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Farm'> extends True ? CheckSelect<T, Prisma__FarmClient<Farm>, Prisma__FarmClient<FarmGetPayload<T>>> : CheckSelect<T, Prisma__FarmClient<Farm | null >, Prisma__FarmClient<FarmGetPayload<T> | null >>

    /**
     * Find the first Farm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindFirstArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FarmFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, FarmFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Farm'> extends True ? CheckSelect<T, Prisma__FarmClient<Farm>, Prisma__FarmClient<FarmGetPayload<T>>> : CheckSelect<T, Prisma__FarmClient<Farm | null >, Prisma__FarmClient<FarmGetPayload<T> | null >>

    /**
     * Find zero or more Farms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Farms
     * const farms = await prisma.farm.findMany()
     * 
     * // Get first 10 Farms
     * const farms = await prisma.farm.findMany({ take: 10 })
     * 
     * // Only select the `farm_id`
     * const farmWithFarm_idOnly = await prisma.farm.findMany({ select: { farm_id: true } })
     * 
    **/
    findMany<T extends FarmFindManyArgs>(
      args?: SelectSubset<T, FarmFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Farm>>, PrismaPromise<Array<FarmGetPayload<T>>>>

    /**
     * Create a Farm.
     * @param {FarmCreateArgs} args - Arguments to create a Farm.
     * @example
     * // Create one Farm
     * const Farm = await prisma.farm.create({
     *   data: {
     *     // ... data to create a Farm
     *   }
     * })
     * 
    **/
    create<T extends FarmCreateArgs>(
      args: SelectSubset<T, FarmCreateArgs>
    ): CheckSelect<T, Prisma__FarmClient<Farm>, Prisma__FarmClient<FarmGetPayload<T>>>

    /**
     * Create many Farms.
     *     @param {FarmCreateManyArgs} args - Arguments to create many Farms.
     *     @example
     *     // Create many Farms
     *     const farm = await prisma.farm.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends FarmCreateManyArgs>(
      args?: SelectSubset<T, FarmCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Farm.
     * @param {FarmDeleteArgs} args - Arguments to delete one Farm.
     * @example
     * // Delete one Farm
     * const Farm = await prisma.farm.delete({
     *   where: {
     *     // ... filter to delete one Farm
     *   }
     * })
     * 
    **/
    delete<T extends FarmDeleteArgs>(
      args: SelectSubset<T, FarmDeleteArgs>
    ): CheckSelect<T, Prisma__FarmClient<Farm>, Prisma__FarmClient<FarmGetPayload<T>>>

    /**
     * Update one Farm.
     * @param {FarmUpdateArgs} args - Arguments to update one Farm.
     * @example
     * // Update one Farm
     * const farm = await prisma.farm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends FarmUpdateArgs>(
      args: SelectSubset<T, FarmUpdateArgs>
    ): CheckSelect<T, Prisma__FarmClient<Farm>, Prisma__FarmClient<FarmGetPayload<T>>>

    /**
     * Delete zero or more Farms.
     * @param {FarmDeleteManyArgs} args - Arguments to filter Farms to delete.
     * @example
     * // Delete a few Farms
     * const { count } = await prisma.farm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends FarmDeleteManyArgs>(
      args?: SelectSubset<T, FarmDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Farms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Farms
     * const farm = await prisma.farm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends FarmUpdateManyArgs>(
      args: SelectSubset<T, FarmUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Farm.
     * @param {FarmUpsertArgs} args - Arguments to update or create a Farm.
     * @example
     * // Update or create a Farm
     * const farm = await prisma.farm.upsert({
     *   create: {
     *     // ... data to create a Farm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Farm we want to update
     *   }
     * })
    **/
    upsert<T extends FarmUpsertArgs>(
      args: SelectSubset<T, FarmUpsertArgs>
    ): CheckSelect<T, Prisma__FarmClient<Farm>, Prisma__FarmClient<FarmGetPayload<T>>>

    /**
     * Find one Farm that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {FarmFindUniqueOrThrowArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends FarmFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, FarmFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__FarmClient<Farm>, Prisma__FarmClient<FarmGetPayload<T>>>

    /**
     * Find the first Farm that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmFindFirstOrThrowArgs} args - Arguments to find a Farm
     * @example
     * // Get one Farm
     * const farm = await prisma.farm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends FarmFindFirstOrThrowArgs>(
      args?: SelectSubset<T, FarmFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__FarmClient<Farm>, Prisma__FarmClient<FarmGetPayload<T>>>

    /**
     * Count the number of Farms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmCountArgs} args - Arguments to filter Farms to count.
     * @example
     * // Count the number of Farms
     * const count = await prisma.farm.count({
     *   where: {
     *     // ... the filter for the Farms we want to count
     *   }
     * })
    **/
    count<T extends FarmCountArgs>(
      args?: Subset<T, FarmCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FarmCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Farm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FarmAggregateArgs>(args: Subset<T, FarmAggregateArgs>): PrismaPromise<GetFarmAggregateType<T>>

    /**
     * Group by Farm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FarmGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FarmGroupByArgs['orderBy'] }
        : { orderBy?: FarmGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FarmGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFarmGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Farm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__FarmClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    owner<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Farm base type for findUnique actions
   */
  export type FarmFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Farm
     * 
    **/
    select?: FarmSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FarmInclude | null
    /**
     * Filter, which Farm to fetch.
     * 
    **/
    where: FarmWhereUniqueInput
  }

  /**
   * Farm: findUnique
   */
  export interface FarmFindUniqueArgs extends FarmFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Farm base type for findFirst actions
   */
  export type FarmFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Farm
     * 
    **/
    select?: FarmSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FarmInclude | null
    /**
     * Filter, which Farm to fetch.
     * 
    **/
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     * 
    **/
    orderBy?: Enumerable<FarmOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Farms.
     * 
    **/
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Farms.
     * 
    **/
    distinct?: Enumerable<FarmScalarFieldEnum>
  }

  /**
   * Farm: findFirst
   */
  export interface FarmFindFirstArgs extends FarmFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Farm findMany
   */
  export type FarmFindManyArgs = {
    /**
     * Select specific fields to fetch from the Farm
     * 
    **/
    select?: FarmSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FarmInclude | null
    /**
     * Filter, which Farms to fetch.
     * 
    **/
    where?: FarmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Farms to fetch.
     * 
    **/
    orderBy?: Enumerable<FarmOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Farms.
     * 
    **/
    cursor?: FarmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Farms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Farms.
     * 
    **/
    skip?: number
    distinct?: Enumerable<FarmScalarFieldEnum>
  }


  /**
   * Farm create
   */
  export type FarmCreateArgs = {
    /**
     * Select specific fields to fetch from the Farm
     * 
    **/
    select?: FarmSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FarmInclude | null
    /**
     * The data needed to create a Farm.
     * 
    **/
    data: XOR<FarmCreateInput, FarmUncheckedCreateInput>
  }


  /**
   * Farm createMany
   */
  export type FarmCreateManyArgs = {
    /**
     * The data used to create many Farms.
     * 
    **/
    data: Enumerable<FarmCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Farm update
   */
  export type FarmUpdateArgs = {
    /**
     * Select specific fields to fetch from the Farm
     * 
    **/
    select?: FarmSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FarmInclude | null
    /**
     * The data needed to update a Farm.
     * 
    **/
    data: XOR<FarmUpdateInput, FarmUncheckedUpdateInput>
    /**
     * Choose, which Farm to update.
     * 
    **/
    where: FarmWhereUniqueInput
  }


  /**
   * Farm updateMany
   */
  export type FarmUpdateManyArgs = {
    /**
     * The data used to update Farms.
     * 
    **/
    data: XOR<FarmUpdateManyMutationInput, FarmUncheckedUpdateManyInput>
    /**
     * Filter which Farms to update
     * 
    **/
    where?: FarmWhereInput
  }


  /**
   * Farm upsert
   */
  export type FarmUpsertArgs = {
    /**
     * Select specific fields to fetch from the Farm
     * 
    **/
    select?: FarmSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FarmInclude | null
    /**
     * The filter to search for the Farm to update in case it exists.
     * 
    **/
    where: FarmWhereUniqueInput
    /**
     * In case the Farm found by the `where` argument doesn't exist, create a new Farm with this data.
     * 
    **/
    create: XOR<FarmCreateInput, FarmUncheckedCreateInput>
    /**
     * In case the Farm was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<FarmUpdateInput, FarmUncheckedUpdateInput>
  }


  /**
   * Farm delete
   */
  export type FarmDeleteArgs = {
    /**
     * Select specific fields to fetch from the Farm
     * 
    **/
    select?: FarmSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FarmInclude | null
    /**
     * Filter which Farm to delete.
     * 
    **/
    where: FarmWhereUniqueInput
  }


  /**
   * Farm deleteMany
   */
  export type FarmDeleteManyArgs = {
    /**
     * Filter which Farms to delete
     * 
    **/
    where?: FarmWhereInput
  }


  /**
   * Farm: findUniqueOrThrow
   */
  export type FarmFindUniqueOrThrowArgs = FarmFindUniqueArgsBase
      

  /**
   * Farm: findFirstOrThrow
   */
  export type FarmFindFirstOrThrowArgs = FarmFindFirstArgsBase
      

  /**
   * Farm without action
   */
  export type FarmArgs = {
    /**
     * Select specific fields to fetch from the Farm
     * 
    **/
    select?: FarmSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FarmInclude | null
  }



  /**
   * Model Authorize
   */


  export type AggregateAuthorize = {
    _count: AuthorizeCountAggregateOutputType | null
    _min: AuthorizeMinAggregateOutputType | null
    _max: AuthorizeMaxAggregateOutputType | null
  }

  export type AuthorizeMinAggregateOutputType = {
    authorize_id: string | null
    created_by: string | null
    farm_id: string | null
    pivot_id: string | null
  }

  export type AuthorizeMaxAggregateOutputType = {
    authorize_id: string | null
    created_by: string | null
    farm_id: string | null
    pivot_id: string | null
  }

  export type AuthorizeCountAggregateOutputType = {
    authorize_id: number
    created_by: number
    farm_id: number
    pivot_id: number
    _all: number
  }


  export type AuthorizeMinAggregateInputType = {
    authorize_id?: true
    created_by?: true
    farm_id?: true
    pivot_id?: true
  }

  export type AuthorizeMaxAggregateInputType = {
    authorize_id?: true
    created_by?: true
    farm_id?: true
    pivot_id?: true
  }

  export type AuthorizeCountAggregateInputType = {
    authorize_id?: true
    created_by?: true
    farm_id?: true
    pivot_id?: true
    _all?: true
  }

  export type AuthorizeAggregateArgs = {
    /**
     * Filter which Authorize to aggregate.
     * 
    **/
    where?: AuthorizeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authorizes to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthorizeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AuthorizeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authorizes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authorizes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Authorizes
    **/
    _count?: true | AuthorizeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthorizeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthorizeMaxAggregateInputType
  }

  export type GetAuthorizeAggregateType<T extends AuthorizeAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthorize]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthorize[P]>
      : GetScalarType<T[P], AggregateAuthorize[P]>
  }




  export type AuthorizeGroupByArgs = {
    where?: AuthorizeWhereInput
    orderBy?: Enumerable<AuthorizeOrderByWithAggregationInput>
    by: Array<AuthorizeScalarFieldEnum>
    having?: AuthorizeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthorizeCountAggregateInputType | true
    _min?: AuthorizeMinAggregateInputType
    _max?: AuthorizeMaxAggregateInputType
  }


  export type AuthorizeGroupByOutputType = {
    authorize_id: string
    created_by: string
    farm_id: string | null
    pivot_id: string | null
    _count: AuthorizeCountAggregateOutputType | null
    _min: AuthorizeMinAggregateOutputType | null
    _max: AuthorizeMaxAggregateOutputType | null
  }

  type GetAuthorizeGroupByPayload<T extends AuthorizeGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AuthorizeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthorizeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthorizeGroupByOutputType[P]>
            : GetScalarType<T[P], AuthorizeGroupByOutputType[P]>
        }
      >
    >


  export type AuthorizeSelect = {
    authorize_id?: boolean
    created_by?: boolean
    farm_id?: boolean
    pivot_id?: boolean
  }

  export type AuthorizeGetPayload<
    S extends boolean | null | undefined | AuthorizeArgs,
    U = keyof S
      > = S extends true
        ? Authorize
    : S extends undefined
    ? never
    : S extends AuthorizeArgs | AuthorizeFindManyArgs
    ?'include' extends U
    ? Authorize 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof Authorize ? Authorize[P] : never
  } 
    : Authorize
  : Authorize


  type AuthorizeCountArgs = Merge<
    Omit<AuthorizeFindManyArgs, 'select' | 'include'> & {
      select?: AuthorizeCountAggregateInputType | true
    }
  >

  export interface AuthorizeDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Authorize that matches the filter.
     * @param {AuthorizeFindUniqueArgs} args - Arguments to find a Authorize
     * @example
     * // Get one Authorize
     * const authorize = await prisma.authorize.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AuthorizeFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AuthorizeFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Authorize'> extends True ? CheckSelect<T, Prisma__AuthorizeClient<Authorize>, Prisma__AuthorizeClient<AuthorizeGetPayload<T>>> : CheckSelect<T, Prisma__AuthorizeClient<Authorize | null >, Prisma__AuthorizeClient<AuthorizeGetPayload<T> | null >>

    /**
     * Find the first Authorize that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizeFindFirstArgs} args - Arguments to find a Authorize
     * @example
     * // Get one Authorize
     * const authorize = await prisma.authorize.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AuthorizeFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AuthorizeFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Authorize'> extends True ? CheckSelect<T, Prisma__AuthorizeClient<Authorize>, Prisma__AuthorizeClient<AuthorizeGetPayload<T>>> : CheckSelect<T, Prisma__AuthorizeClient<Authorize | null >, Prisma__AuthorizeClient<AuthorizeGetPayload<T> | null >>

    /**
     * Find zero or more Authorizes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Authorizes
     * const authorizes = await prisma.authorize.findMany()
     * 
     * // Get first 10 Authorizes
     * const authorizes = await prisma.authorize.findMany({ take: 10 })
     * 
     * // Only select the `authorize_id`
     * const authorizeWithAuthorize_idOnly = await prisma.authorize.findMany({ select: { authorize_id: true } })
     * 
    **/
    findMany<T extends AuthorizeFindManyArgs>(
      args?: SelectSubset<T, AuthorizeFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Authorize>>, PrismaPromise<Array<AuthorizeGetPayload<T>>>>

    /**
     * Create a Authorize.
     * @param {AuthorizeCreateArgs} args - Arguments to create a Authorize.
     * @example
     * // Create one Authorize
     * const Authorize = await prisma.authorize.create({
     *   data: {
     *     // ... data to create a Authorize
     *   }
     * })
     * 
    **/
    create<T extends AuthorizeCreateArgs>(
      args: SelectSubset<T, AuthorizeCreateArgs>
    ): CheckSelect<T, Prisma__AuthorizeClient<Authorize>, Prisma__AuthorizeClient<AuthorizeGetPayload<T>>>

    /**
     * Create many Authorizes.
     *     @param {AuthorizeCreateManyArgs} args - Arguments to create many Authorizes.
     *     @example
     *     // Create many Authorizes
     *     const authorize = await prisma.authorize.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AuthorizeCreateManyArgs>(
      args?: SelectSubset<T, AuthorizeCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Authorize.
     * @param {AuthorizeDeleteArgs} args - Arguments to delete one Authorize.
     * @example
     * // Delete one Authorize
     * const Authorize = await prisma.authorize.delete({
     *   where: {
     *     // ... filter to delete one Authorize
     *   }
     * })
     * 
    **/
    delete<T extends AuthorizeDeleteArgs>(
      args: SelectSubset<T, AuthorizeDeleteArgs>
    ): CheckSelect<T, Prisma__AuthorizeClient<Authorize>, Prisma__AuthorizeClient<AuthorizeGetPayload<T>>>

    /**
     * Update one Authorize.
     * @param {AuthorizeUpdateArgs} args - Arguments to update one Authorize.
     * @example
     * // Update one Authorize
     * const authorize = await prisma.authorize.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AuthorizeUpdateArgs>(
      args: SelectSubset<T, AuthorizeUpdateArgs>
    ): CheckSelect<T, Prisma__AuthorizeClient<Authorize>, Prisma__AuthorizeClient<AuthorizeGetPayload<T>>>

    /**
     * Delete zero or more Authorizes.
     * @param {AuthorizeDeleteManyArgs} args - Arguments to filter Authorizes to delete.
     * @example
     * // Delete a few Authorizes
     * const { count } = await prisma.authorize.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AuthorizeDeleteManyArgs>(
      args?: SelectSubset<T, AuthorizeDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Authorizes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Authorizes
     * const authorize = await prisma.authorize.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AuthorizeUpdateManyArgs>(
      args: SelectSubset<T, AuthorizeUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Authorize.
     * @param {AuthorizeUpsertArgs} args - Arguments to update or create a Authorize.
     * @example
     * // Update or create a Authorize
     * const authorize = await prisma.authorize.upsert({
     *   create: {
     *     // ... data to create a Authorize
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Authorize we want to update
     *   }
     * })
    **/
    upsert<T extends AuthorizeUpsertArgs>(
      args: SelectSubset<T, AuthorizeUpsertArgs>
    ): CheckSelect<T, Prisma__AuthorizeClient<Authorize>, Prisma__AuthorizeClient<AuthorizeGetPayload<T>>>

    /**
     * Find one Authorize that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {AuthorizeFindUniqueOrThrowArgs} args - Arguments to find a Authorize
     * @example
     * // Get one Authorize
     * const authorize = await prisma.authorize.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AuthorizeFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AuthorizeFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__AuthorizeClient<Authorize>, Prisma__AuthorizeClient<AuthorizeGetPayload<T>>>

    /**
     * Find the first Authorize that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizeFindFirstOrThrowArgs} args - Arguments to find a Authorize
     * @example
     * // Get one Authorize
     * const authorize = await prisma.authorize.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AuthorizeFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AuthorizeFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__AuthorizeClient<Authorize>, Prisma__AuthorizeClient<AuthorizeGetPayload<T>>>

    /**
     * Count the number of Authorizes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizeCountArgs} args - Arguments to filter Authorizes to count.
     * @example
     * // Count the number of Authorizes
     * const count = await prisma.authorize.count({
     *   where: {
     *     // ... the filter for the Authorizes we want to count
     *   }
     * })
    **/
    count<T extends AuthorizeCountArgs>(
      args?: Subset<T, AuthorizeCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthorizeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Authorize.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthorizeAggregateArgs>(args: Subset<T, AuthorizeAggregateArgs>): PrismaPromise<GetAuthorizeAggregateType<T>>

    /**
     * Group by Authorize.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthorizeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthorizeGroupByArgs['orderBy'] }
        : { orderBy?: AuthorizeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthorizeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthorizeGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Authorize.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AuthorizeClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Authorize base type for findUnique actions
   */
  export type AuthorizeFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Authorize
     * 
    **/
    select?: AuthorizeSelect | null
    /**
     * Filter, which Authorize to fetch.
     * 
    **/
    where: AuthorizeWhereUniqueInput
  }

  /**
   * Authorize: findUnique
   */
  export interface AuthorizeFindUniqueArgs extends AuthorizeFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Authorize base type for findFirst actions
   */
  export type AuthorizeFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Authorize
     * 
    **/
    select?: AuthorizeSelect | null
    /**
     * Filter, which Authorize to fetch.
     * 
    **/
    where?: AuthorizeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authorizes to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthorizeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Authorizes.
     * 
    **/
    cursor?: AuthorizeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authorizes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authorizes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Authorizes.
     * 
    **/
    distinct?: Enumerable<AuthorizeScalarFieldEnum>
  }

  /**
   * Authorize: findFirst
   */
  export interface AuthorizeFindFirstArgs extends AuthorizeFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Authorize findMany
   */
  export type AuthorizeFindManyArgs = {
    /**
     * Select specific fields to fetch from the Authorize
     * 
    **/
    select?: AuthorizeSelect | null
    /**
     * Filter, which Authorizes to fetch.
     * 
    **/
    where?: AuthorizeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Authorizes to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthorizeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Authorizes.
     * 
    **/
    cursor?: AuthorizeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Authorizes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Authorizes.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AuthorizeScalarFieldEnum>
  }


  /**
   * Authorize create
   */
  export type AuthorizeCreateArgs = {
    /**
     * Select specific fields to fetch from the Authorize
     * 
    **/
    select?: AuthorizeSelect | null
    /**
     * The data needed to create a Authorize.
     * 
    **/
    data: XOR<AuthorizeCreateInput, AuthorizeUncheckedCreateInput>
  }


  /**
   * Authorize createMany
   */
  export type AuthorizeCreateManyArgs = {
    /**
     * The data used to create many Authorizes.
     * 
    **/
    data: Enumerable<AuthorizeCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Authorize update
   */
  export type AuthorizeUpdateArgs = {
    /**
     * Select specific fields to fetch from the Authorize
     * 
    **/
    select?: AuthorizeSelect | null
    /**
     * The data needed to update a Authorize.
     * 
    **/
    data: XOR<AuthorizeUpdateInput, AuthorizeUncheckedUpdateInput>
    /**
     * Choose, which Authorize to update.
     * 
    **/
    where: AuthorizeWhereUniqueInput
  }


  /**
   * Authorize updateMany
   */
  export type AuthorizeUpdateManyArgs = {
    /**
     * The data used to update Authorizes.
     * 
    **/
    data: XOR<AuthorizeUpdateManyMutationInput, AuthorizeUncheckedUpdateManyInput>
    /**
     * Filter which Authorizes to update
     * 
    **/
    where?: AuthorizeWhereInput
  }


  /**
   * Authorize upsert
   */
  export type AuthorizeUpsertArgs = {
    /**
     * Select specific fields to fetch from the Authorize
     * 
    **/
    select?: AuthorizeSelect | null
    /**
     * The filter to search for the Authorize to update in case it exists.
     * 
    **/
    where: AuthorizeWhereUniqueInput
    /**
     * In case the Authorize found by the `where` argument doesn't exist, create a new Authorize with this data.
     * 
    **/
    create: XOR<AuthorizeCreateInput, AuthorizeUncheckedCreateInput>
    /**
     * In case the Authorize was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AuthorizeUpdateInput, AuthorizeUncheckedUpdateInput>
  }


  /**
   * Authorize delete
   */
  export type AuthorizeDeleteArgs = {
    /**
     * Select specific fields to fetch from the Authorize
     * 
    **/
    select?: AuthorizeSelect | null
    /**
     * Filter which Authorize to delete.
     * 
    **/
    where: AuthorizeWhereUniqueInput
  }


  /**
   * Authorize deleteMany
   */
  export type AuthorizeDeleteManyArgs = {
    /**
     * Filter which Authorizes to delete
     * 
    **/
    where?: AuthorizeWhereInput
  }


  /**
   * Authorize: findUniqueOrThrow
   */
  export type AuthorizeFindUniqueOrThrowArgs = AuthorizeFindUniqueArgsBase
      

  /**
   * Authorize: findFirstOrThrow
   */
  export type AuthorizeFindFirstOrThrowArgs = AuthorizeFindFirstArgsBase
      

  /**
   * Authorize without action
   */
  export type AuthorizeArgs = {
    /**
     * Select specific fields to fetch from the Authorize
     * 
    **/
    select?: AuthorizeSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const AuthorizeScalarFieldEnum: {
    authorize_id: 'authorize_id',
    created_by: 'created_by',
    farm_id: 'farm_id',
    pivot_id: 'pivot_id'
  };

  export type AuthorizeScalarFieldEnum = (typeof AuthorizeScalarFieldEnum)[keyof typeof AuthorizeScalarFieldEnum]


  export const FarmScalarFieldEnum: {
    farm_id: 'farm_id',
    farm_name: 'farm_name',
    farm_city: 'farm_city',
    farm_lat: 'farm_lat',
    farm_lng: 'farm_lng',
    owner_id: 'owner_id',
    created_by: 'created_by',
    updated_by: 'updated_by',
    admins: 'admins',
    dealers: 'dealers',
    users: 'users'
  };

  export type FarmScalarFieldEnum = (typeof FarmScalarFieldEnum)[keyof typeof FarmScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    user_id: 'user_id',
    login: 'login',
    password: 'password',
    userType: 'userType'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    user_id?: StringFilter | string
    login?: StringFilter | string
    password?: StringFilter | string
    userType?: EnumUserTypeFilter | UserType
    farms?: FarmListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    user_id?: SortOrder
    login?: SortOrder
    password?: SortOrder
    userType?: SortOrder
    farms?: FarmOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    user_id?: string
  }

  export type UserOrderByWithAggregationInput = {
    user_id?: SortOrder
    login?: SortOrder
    password?: SortOrder
    userType?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    user_id?: StringWithAggregatesFilter | string
    login?: StringWithAggregatesFilter | string
    password?: StringWithAggregatesFilter | string
    userType?: EnumUserTypeWithAggregatesFilter | UserType
  }

  export type FarmWhereInput = {
    AND?: Enumerable<FarmWhereInput>
    OR?: Enumerable<FarmWhereInput>
    NOT?: Enumerable<FarmWhereInput>
    farm_id?: StringFilter | string
    farm_name?: StringFilter | string
    farm_city?: StringFilter | string
    farm_lat?: FloatFilter | number
    farm_lng?: FloatFilter | number
    owner?: XOR<UserRelationFilter, UserWhereInput>
    owner_id?: StringFilter | string
    created_by?: StringFilter | string
    updated_by?: StringNullableFilter | string | null
    admins?: StringNullableListFilter
    dealers?: StringNullableListFilter
    users?: StringNullableListFilter
  }

  export type FarmOrderByWithRelationInput = {
    farm_id?: SortOrder
    farm_name?: SortOrder
    farm_city?: SortOrder
    farm_lat?: SortOrder
    farm_lng?: SortOrder
    owner?: UserOrderByWithRelationInput
    owner_id?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    admins?: SortOrder
    dealers?: SortOrder
    users?: SortOrder
  }

  export type FarmWhereUniqueInput = {
    farm_id?: string
    farm_name?: string
  }

  export type FarmOrderByWithAggregationInput = {
    farm_id?: SortOrder
    farm_name?: SortOrder
    farm_city?: SortOrder
    farm_lat?: SortOrder
    farm_lng?: SortOrder
    owner_id?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    admins?: SortOrder
    dealers?: SortOrder
    users?: SortOrder
    _count?: FarmCountOrderByAggregateInput
    _avg?: FarmAvgOrderByAggregateInput
    _max?: FarmMaxOrderByAggregateInput
    _min?: FarmMinOrderByAggregateInput
    _sum?: FarmSumOrderByAggregateInput
  }

  export type FarmScalarWhereWithAggregatesInput = {
    AND?: Enumerable<FarmScalarWhereWithAggregatesInput>
    OR?: Enumerable<FarmScalarWhereWithAggregatesInput>
    NOT?: Enumerable<FarmScalarWhereWithAggregatesInput>
    farm_id?: StringWithAggregatesFilter | string
    farm_name?: StringWithAggregatesFilter | string
    farm_city?: StringWithAggregatesFilter | string
    farm_lat?: FloatWithAggregatesFilter | number
    farm_lng?: FloatWithAggregatesFilter | number
    owner_id?: StringWithAggregatesFilter | string
    created_by?: StringWithAggregatesFilter | string
    updated_by?: StringNullableWithAggregatesFilter | string | null
    admins?: StringNullableListFilter
    dealers?: StringNullableListFilter
    users?: StringNullableListFilter
  }

  export type AuthorizeWhereInput = {
    AND?: Enumerable<AuthorizeWhereInput>
    OR?: Enumerable<AuthorizeWhereInput>
    NOT?: Enumerable<AuthorizeWhereInput>
    authorize_id?: StringFilter | string
    created_by?: StringFilter | string
    farm_id?: StringNullableFilter | string | null
    pivot_id?: StringNullableFilter | string | null
  }

  export type AuthorizeOrderByWithRelationInput = {
    authorize_id?: SortOrder
    created_by?: SortOrder
    farm_id?: SortOrder
    pivot_id?: SortOrder
  }

  export type AuthorizeWhereUniqueInput = {
    authorize_id?: string
  }

  export type AuthorizeOrderByWithAggregationInput = {
    authorize_id?: SortOrder
    created_by?: SortOrder
    farm_id?: SortOrder
    pivot_id?: SortOrder
    _count?: AuthorizeCountOrderByAggregateInput
    _max?: AuthorizeMaxOrderByAggregateInput
    _min?: AuthorizeMinOrderByAggregateInput
  }

  export type AuthorizeScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AuthorizeScalarWhereWithAggregatesInput>
    OR?: Enumerable<AuthorizeScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AuthorizeScalarWhereWithAggregatesInput>
    authorize_id?: StringWithAggregatesFilter | string
    created_by?: StringWithAggregatesFilter | string
    farm_id?: StringNullableWithAggregatesFilter | string | null
    pivot_id?: StringNullableWithAggregatesFilter | string | null
  }

  export type UserCreateInput = {
    user_id?: string
    login: string
    password: string
    userType: UserType
    farms?: FarmCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateInput = {
    user_id?: string
    login: string
    password: string
    userType: UserType
    farms?: FarmUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | UserType
    farms?: FarmUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | UserType
    farms?: FarmUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateManyInput = {
    user_id?: string
    login: string
    password: string
    userType: UserType
  }

  export type UserUpdateManyMutationInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | UserType
  }

  export type UserUncheckedUpdateManyInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | UserType
  }

  export type FarmCreateInput = {
    farm_id?: string
    farm_name: string
    farm_city: string
    farm_lat: number
    farm_lng: number
    owner: UserCreateNestedOneWithoutFarmsInput
    created_by: string
    updated_by?: string | null
    admins?: FarmCreateadminsInput | Enumerable<string>
    dealers?: FarmCreatedealersInput | Enumerable<string>
    users?: FarmCreateusersInput | Enumerable<string>
  }

  export type FarmUncheckedCreateInput = {
    farm_id?: string
    farm_name: string
    farm_city: string
    farm_lat: number
    farm_lng: number
    owner_id: string
    created_by: string
    updated_by?: string | null
    admins?: FarmCreateadminsInput | Enumerable<string>
    dealers?: FarmCreatedealersInput | Enumerable<string>
    users?: FarmCreateusersInput | Enumerable<string>
  }

  export type FarmUpdateInput = {
    farm_id?: StringFieldUpdateOperationsInput | string
    farm_name?: StringFieldUpdateOperationsInput | string
    farm_city?: StringFieldUpdateOperationsInput | string
    farm_lat?: FloatFieldUpdateOperationsInput | number
    farm_lng?: FloatFieldUpdateOperationsInput | number
    owner?: UserUpdateOneRequiredWithoutFarmsNestedInput
    created_by?: StringFieldUpdateOperationsInput | string
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    admins?: FarmUpdateadminsInput | Enumerable<string>
    dealers?: FarmUpdatedealersInput | Enumerable<string>
    users?: FarmUpdateusersInput | Enumerable<string>
  }

  export type FarmUncheckedUpdateInput = {
    farm_id?: StringFieldUpdateOperationsInput | string
    farm_name?: StringFieldUpdateOperationsInput | string
    farm_city?: StringFieldUpdateOperationsInput | string
    farm_lat?: FloatFieldUpdateOperationsInput | number
    farm_lng?: FloatFieldUpdateOperationsInput | number
    owner_id?: StringFieldUpdateOperationsInput | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    admins?: FarmUpdateadminsInput | Enumerable<string>
    dealers?: FarmUpdatedealersInput | Enumerable<string>
    users?: FarmUpdateusersInput | Enumerable<string>
  }

  export type FarmCreateManyInput = {
    farm_id?: string
    farm_name: string
    farm_city: string
    farm_lat: number
    farm_lng: number
    owner_id: string
    created_by: string
    updated_by?: string | null
    admins?: FarmCreateadminsInput | Enumerable<string>
    dealers?: FarmCreatedealersInput | Enumerable<string>
    users?: FarmCreateusersInput | Enumerable<string>
  }

  export type FarmUpdateManyMutationInput = {
    farm_id?: StringFieldUpdateOperationsInput | string
    farm_name?: StringFieldUpdateOperationsInput | string
    farm_city?: StringFieldUpdateOperationsInput | string
    farm_lat?: FloatFieldUpdateOperationsInput | number
    farm_lng?: FloatFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    admins?: FarmUpdateadminsInput | Enumerable<string>
    dealers?: FarmUpdatedealersInput | Enumerable<string>
    users?: FarmUpdateusersInput | Enumerable<string>
  }

  export type FarmUncheckedUpdateManyInput = {
    farm_id?: StringFieldUpdateOperationsInput | string
    farm_name?: StringFieldUpdateOperationsInput | string
    farm_city?: StringFieldUpdateOperationsInput | string
    farm_lat?: FloatFieldUpdateOperationsInput | number
    farm_lng?: FloatFieldUpdateOperationsInput | number
    owner_id?: StringFieldUpdateOperationsInput | string
    created_by?: StringFieldUpdateOperationsInput | string
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    admins?: FarmUpdateadminsInput | Enumerable<string>
    dealers?: FarmUpdatedealersInput | Enumerable<string>
    users?: FarmUpdateusersInput | Enumerable<string>
  }

  export type AuthorizeCreateInput = {
    authorize_id?: string
    created_by: string
    farm_id?: string | null
    pivot_id?: string | null
  }

  export type AuthorizeUncheckedCreateInput = {
    authorize_id?: string
    created_by: string
    farm_id?: string | null
    pivot_id?: string | null
  }

  export type AuthorizeUpdateInput = {
    authorize_id?: StringFieldUpdateOperationsInput | string
    created_by?: StringFieldUpdateOperationsInput | string
    farm_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivot_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorizeUncheckedUpdateInput = {
    authorize_id?: StringFieldUpdateOperationsInput | string
    created_by?: StringFieldUpdateOperationsInput | string
    farm_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivot_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorizeCreateManyInput = {
    authorize_id?: string
    created_by: string
    farm_id?: string | null
    pivot_id?: string | null
  }

  export type AuthorizeUpdateManyMutationInput = {
    authorize_id?: StringFieldUpdateOperationsInput | string
    created_by?: StringFieldUpdateOperationsInput | string
    farm_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivot_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorizeUncheckedUpdateManyInput = {
    authorize_id?: StringFieldUpdateOperationsInput | string
    created_by?: StringFieldUpdateOperationsInput | string
    farm_id?: NullableStringFieldUpdateOperationsInput | string | null
    pivot_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type EnumUserTypeFilter = {
    equals?: UserType
    in?: Enumerable<UserType>
    notIn?: Enumerable<UserType>
    not?: NestedEnumUserTypeFilter | UserType
  }

  export type FarmListRelationFilter = {
    every?: FarmWhereInput
    some?: FarmWhereInput
    none?: FarmWhereInput
  }

  export type FarmOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    user_id?: SortOrder
    login?: SortOrder
    password?: SortOrder
    userType?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    user_id?: SortOrder
    login?: SortOrder
    password?: SortOrder
    userType?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    user_id?: SortOrder
    login?: SortOrder
    password?: SortOrder
    userType?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type EnumUserTypeWithAggregatesFilter = {
    equals?: UserType
    in?: Enumerable<UserType>
    notIn?: Enumerable<UserType>
    not?: NestedEnumUserTypeWithAggregatesFilter | UserType
    _count?: NestedIntFilter
    _min?: NestedEnumUserTypeFilter
    _max?: NestedEnumUserTypeFilter
  }

  export type FloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type StringNullableListFilter = {
    equals?: Enumerable<string> | null
    has?: string | null
    hasEvery?: Enumerable<string>
    hasSome?: Enumerable<string>
    isEmpty?: boolean
  }

  export type FarmCountOrderByAggregateInput = {
    farm_id?: SortOrder
    farm_name?: SortOrder
    farm_city?: SortOrder
    farm_lat?: SortOrder
    farm_lng?: SortOrder
    owner_id?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    admins?: SortOrder
    dealers?: SortOrder
    users?: SortOrder
  }

  export type FarmAvgOrderByAggregateInput = {
    farm_lat?: SortOrder
    farm_lng?: SortOrder
  }

  export type FarmMaxOrderByAggregateInput = {
    farm_id?: SortOrder
    farm_name?: SortOrder
    farm_city?: SortOrder
    farm_lat?: SortOrder
    farm_lng?: SortOrder
    owner_id?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
  }

  export type FarmMinOrderByAggregateInput = {
    farm_id?: SortOrder
    farm_name?: SortOrder
    farm_city?: SortOrder
    farm_lat?: SortOrder
    farm_lng?: SortOrder
    owner_id?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
  }

  export type FarmSumOrderByAggregateInput = {
    farm_lat?: SortOrder
    farm_lng?: SortOrder
  }

  export type FloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type AuthorizeCountOrderByAggregateInput = {
    authorize_id?: SortOrder
    created_by?: SortOrder
    farm_id?: SortOrder
    pivot_id?: SortOrder
  }

  export type AuthorizeMaxOrderByAggregateInput = {
    authorize_id?: SortOrder
    created_by?: SortOrder
    farm_id?: SortOrder
    pivot_id?: SortOrder
  }

  export type AuthorizeMinOrderByAggregateInput = {
    authorize_id?: SortOrder
    created_by?: SortOrder
    farm_id?: SortOrder
    pivot_id?: SortOrder
  }

  export type FarmCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<FarmCreateWithoutOwnerInput>, Enumerable<FarmUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<FarmCreateOrConnectWithoutOwnerInput>
    createMany?: FarmCreateManyOwnerInputEnvelope
    connect?: Enumerable<FarmWhereUniqueInput>
  }

  export type FarmUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<FarmCreateWithoutOwnerInput>, Enumerable<FarmUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<FarmCreateOrConnectWithoutOwnerInput>
    createMany?: FarmCreateManyOwnerInputEnvelope
    connect?: Enumerable<FarmWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserTypeFieldUpdateOperationsInput = {
    set?: UserType
  }

  export type FarmUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<Enumerable<FarmCreateWithoutOwnerInput>, Enumerable<FarmUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<FarmCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<FarmUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: FarmCreateManyOwnerInputEnvelope
    set?: Enumerable<FarmWhereUniqueInput>
    disconnect?: Enumerable<FarmWhereUniqueInput>
    delete?: Enumerable<FarmWhereUniqueInput>
    connect?: Enumerable<FarmWhereUniqueInput>
    update?: Enumerable<FarmUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<FarmUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<FarmScalarWhereInput>
  }

  export type FarmUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<Enumerable<FarmCreateWithoutOwnerInput>, Enumerable<FarmUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<FarmCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<FarmUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: FarmCreateManyOwnerInputEnvelope
    set?: Enumerable<FarmWhereUniqueInput>
    disconnect?: Enumerable<FarmWhereUniqueInput>
    delete?: Enumerable<FarmWhereUniqueInput>
    connect?: Enumerable<FarmWhereUniqueInput>
    update?: Enumerable<FarmUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<FarmUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<FarmScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutFarmsInput = {
    create?: XOR<UserCreateWithoutFarmsInput, UserUncheckedCreateWithoutFarmsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFarmsInput
    connect?: UserWhereUniqueInput
  }

  export type FarmCreateadminsInput = {
    set: Enumerable<string>
  }

  export type FarmCreatedealersInput = {
    set: Enumerable<string>
  }

  export type FarmCreateusersInput = {
    set: Enumerable<string>
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutFarmsNestedInput = {
    create?: XOR<UserCreateWithoutFarmsInput, UserUncheckedCreateWithoutFarmsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFarmsInput
    upsert?: UserUpsertWithoutFarmsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutFarmsInput, UserUncheckedUpdateWithoutFarmsInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FarmUpdateadminsInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type FarmUpdatedealersInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type FarmUpdateusersInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedEnumUserTypeFilter = {
    equals?: UserType
    in?: Enumerable<UserType>
    notIn?: Enumerable<UserType>
    not?: NestedEnumUserTypeFilter | UserType
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedEnumUserTypeWithAggregatesFilter = {
    equals?: UserType
    in?: Enumerable<UserType>
    notIn?: Enumerable<UserType>
    not?: NestedEnumUserTypeWithAggregatesFilter | UserType
    _count?: NestedIntFilter
    _min?: NestedEnumUserTypeFilter
    _max?: NestedEnumUserTypeFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedFloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type FarmCreateWithoutOwnerInput = {
    farm_id?: string
    farm_name: string
    farm_city: string
    farm_lat: number
    farm_lng: number
    created_by: string
    updated_by?: string | null
    admins?: FarmCreateadminsInput | Enumerable<string>
    dealers?: FarmCreatedealersInput | Enumerable<string>
    users?: FarmCreateusersInput | Enumerable<string>
  }

  export type FarmUncheckedCreateWithoutOwnerInput = {
    farm_id?: string
    farm_name: string
    farm_city: string
    farm_lat: number
    farm_lng: number
    created_by: string
    updated_by?: string | null
    admins?: FarmCreateadminsInput | Enumerable<string>
    dealers?: FarmCreatedealersInput | Enumerable<string>
    users?: FarmCreateusersInput | Enumerable<string>
  }

  export type FarmCreateOrConnectWithoutOwnerInput = {
    where: FarmWhereUniqueInput
    create: XOR<FarmCreateWithoutOwnerInput, FarmUncheckedCreateWithoutOwnerInput>
  }

  export type FarmCreateManyOwnerInputEnvelope = {
    data: Enumerable<FarmCreateManyOwnerInput>
    skipDuplicates?: boolean
  }

  export type FarmUpsertWithWhereUniqueWithoutOwnerInput = {
    where: FarmWhereUniqueInput
    update: XOR<FarmUpdateWithoutOwnerInput, FarmUncheckedUpdateWithoutOwnerInput>
    create: XOR<FarmCreateWithoutOwnerInput, FarmUncheckedCreateWithoutOwnerInput>
  }

  export type FarmUpdateWithWhereUniqueWithoutOwnerInput = {
    where: FarmWhereUniqueInput
    data: XOR<FarmUpdateWithoutOwnerInput, FarmUncheckedUpdateWithoutOwnerInput>
  }

  export type FarmUpdateManyWithWhereWithoutOwnerInput = {
    where: FarmScalarWhereInput
    data: XOR<FarmUpdateManyMutationInput, FarmUncheckedUpdateManyWithoutFarmsInput>
  }

  export type FarmScalarWhereInput = {
    AND?: Enumerable<FarmScalarWhereInput>
    OR?: Enumerable<FarmScalarWhereInput>
    NOT?: Enumerable<FarmScalarWhereInput>
    farm_id?: StringFilter | string
    farm_name?: StringFilter | string
    farm_city?: StringFilter | string
    farm_lat?: FloatFilter | number
    farm_lng?: FloatFilter | number
    owner_id?: StringFilter | string
    created_by?: StringFilter | string
    updated_by?: StringNullableFilter | string | null
    admins?: StringNullableListFilter
    dealers?: StringNullableListFilter
    users?: StringNullableListFilter
  }

  export type UserCreateWithoutFarmsInput = {
    user_id?: string
    login: string
    password: string
    userType: UserType
  }

  export type UserUncheckedCreateWithoutFarmsInput = {
    user_id?: string
    login: string
    password: string
    userType: UserType
  }

  export type UserCreateOrConnectWithoutFarmsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFarmsInput, UserUncheckedCreateWithoutFarmsInput>
  }

  export type UserUpsertWithoutFarmsInput = {
    update: XOR<UserUpdateWithoutFarmsInput, UserUncheckedUpdateWithoutFarmsInput>
    create: XOR<UserCreateWithoutFarmsInput, UserUncheckedCreateWithoutFarmsInput>
  }

  export type UserUpdateWithoutFarmsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | UserType
  }

  export type UserUncheckedUpdateWithoutFarmsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    userType?: EnumUserTypeFieldUpdateOperationsInput | UserType
  }

  export type FarmCreateManyOwnerInput = {
    farm_id?: string
    farm_name: string
    farm_city: string
    farm_lat: number
    farm_lng: number
    created_by: string
    updated_by?: string | null
    admins?: FarmCreateadminsInput | Enumerable<string>
    dealers?: FarmCreatedealersInput | Enumerable<string>
    users?: FarmCreateusersInput | Enumerable<string>
  }

  export type FarmUpdateWithoutOwnerInput = {
    farm_id?: StringFieldUpdateOperationsInput | string
    farm_name?: StringFieldUpdateOperationsInput | string
    farm_city?: StringFieldUpdateOperationsInput | string
    farm_lat?: FloatFieldUpdateOperationsInput | number
    farm_lng?: FloatFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    admins?: FarmUpdateadminsInput | Enumerable<string>
    dealers?: FarmUpdatedealersInput | Enumerable<string>
    users?: FarmUpdateusersInput | Enumerable<string>
  }

  export type FarmUncheckedUpdateWithoutOwnerInput = {
    farm_id?: StringFieldUpdateOperationsInput | string
    farm_name?: StringFieldUpdateOperationsInput | string
    farm_city?: StringFieldUpdateOperationsInput | string
    farm_lat?: FloatFieldUpdateOperationsInput | number
    farm_lng?: FloatFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    admins?: FarmUpdateadminsInput | Enumerable<string>
    dealers?: FarmUpdatedealersInput | Enumerable<string>
    users?: FarmUpdateusersInput | Enumerable<string>
  }

  export type FarmUncheckedUpdateManyWithoutFarmsInput = {
    farm_id?: StringFieldUpdateOperationsInput | string
    farm_name?: StringFieldUpdateOperationsInput | string
    farm_city?: StringFieldUpdateOperationsInput | string
    farm_lat?: FloatFieldUpdateOperationsInput | number
    farm_lng?: FloatFieldUpdateOperationsInput | number
    created_by?: StringFieldUpdateOperationsInput | string
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    admins?: FarmUpdateadminsInput | Enumerable<string>
    dealers?: FarmUpdatedealersInput | Enumerable<string>
    users?: FarmUpdateusersInput | Enumerable<string>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}