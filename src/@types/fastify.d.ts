// import { FastifyReply, FastifyRequest } from 'fastify';
export declare global {
  type IFastifyRequest = FastifyRequest<
    RouteGeneric,
    RawServer,
    RawRequest,
    SchemaCompiler,
    TypeProvider,
    ContextConfig,
    Logger
  >;
  type IFastifyReply = FastifyReply<
    RawServer,
    RawRequest,
    RawReply,
    RouteGeneric,
    ContextConfig,
    SchemaCompiler,
    TypeProvider
  >;
  type IFastifyReturn = ResolveFastifyReplyReturnType<
    TypeProvider,
    SchemaCompiler,
    RouteGeneric
  >;
  type IRoute = RouteOptions<
    RawServer,
    RawRequest,
    RawReply,
    RouteGeneric,
    ContextConfig,
    SchemaCompiler,
    TypeProvider,
    Logger
  >;
}
// export interface RouteOptions<
//   RawServer extends RawServerBase = RawServerDefault,
//   RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
//   RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
//   RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
//   ContextConfig = ContextConfigDefault,
//   SchemaCompiler extends FastifySchema = FastifySchema,
//   TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault,
//   Logger extends FastifyBaseLogger = FastifyBaseLogger,
// > extends RouteShorthandOptions<
//     RawServer,
//     RawRequest,
//     RawReply,
//     RouteGeneric,
//     ContextConfig,
//     SchemaCompiler,
//     TypeProvider,
//     Logger
//   > {
//   method: HTTPMethods | HTTPMethods[];
//   url: string;

//   request: FastifyRequest<
//     RouteGeneric,
//     RawServer,
//     RawRequest,
//     SchemaCompiler,
//     TypeProvider,
//     ContextConfig,
//     Logger
//   >;
//   reply: FastifyReply<
//     RawServer,
//     RawRequest,
//     RawReply,
//     RouteGeneric,
//     ContextConfig,
//     SchemaCompiler,
//     TypeProvider
//   >;

//   handler: RouteHandlerMethod<
//     RawServer,
//     RawRequest,
//     RawReply,
//     RouteGeneric,
//     ContextConfig,
//     SchemaCompiler,
//     TypeProvider,
//     Logger
//   >;
// }
