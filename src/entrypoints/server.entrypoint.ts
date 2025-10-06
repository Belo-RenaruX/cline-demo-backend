import 'dotenv/config';

import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import cors from '@fastify/cors';
import ejs from 'ejs';
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { LoggerClient } from 'src/clients/logger/logger.client';
import { EnvHelper } from 'src/helpers/env.helper';
import { OpenApiManager } from 'src/managers/openapi/openapi.manager';
import swaggerMeta from 'src/statics/swaggerMeta.static';
import swaggerTemplate from 'src/templates/swagger.template';
import { LoginUserV1Router } from 'src/controllers/loginUserV1/loginUser.router';
import { LoginUserV1Docs } from 'src/controllers/loginUserV1/loginUser.docs';

export class Server {
  private static readonly app: FastifyInstance = Fastify({ logger: false });
  private static readonly registry: OpenAPIRegistry = new OpenAPIRegistry();
  private static readonly manager: OpenApiManager = new OpenApiManager(this.registry);
  private static readonly logger: LoggerClient = LoggerClient.instance;
  private static readonly port: number = Number(EnvHelper.get('NODE_PORT'));

  static async start(): Promise<void> {
    try {
      await this.setup();
      await this.app.listen({ host: '0.0.0.0', port: this.port });
      this.logger.info(`Server running on port ${this.port}`);
    } catch (error) {
      this.logger.error('Server failed on startup', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      process.exit(1);
    }
  }

  static async shutdown(fatal = false): Promise<void> {
    try {
      await this.app.close();
      this.logger.info('Server closed gracefully');
      process.exit(fatal ? 1 : 0);
    } catch (error) {
      this.logger.error('Error during shutdown', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      process.exit(1);
    }
  }

  private static async setup(): Promise<void> {
    this.registerHooks();
    this.registerDocs();
    this.registerRoutes();
    await this.app.register(cors, {
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    });
    this.setupDocsEndpoint();
  }

  private static registerHooks(): void {
    this.app.addHook('onRequest', async (request: FastifyRequest) => {
      this.logger.info('Incoming Request', {
        method: request.method,
        url: request.url,
        ip: request.ip,
        body: request.body ?? {},
        query: request.query ?? {},
        path: request.params ?? {},
        userAgent: request.headers['user-agent'],
      });
    });

    this.app.addHook('onResponse', async (request: FastifyRequest, reply: FastifyReply) => {
      this.logger.info('Response Sent', {
        method: request.method,
        url: request.url,
        statusCode: reply.statusCode,
      });
    });
  }

  private static registerDocs(): void {
    new LoginUserV1Docs(this.manager).registerDocs();
  }

  private static registerRoutes(): void {
    new LoginUserV1Router(this.app).registerRouter();
  }

  private static setupDocsEndpoint(): void {
    const generator = new OpenApiGeneratorV3(this.registry.definitions);

    this.app.get('/docs', async (_, reply) => {
      const html = ejs.render(swaggerTemplate, {
        title: `${swaggerMeta.info.title} - Docs`,
      });

      reply.type('text/html').send(html);
    });

    this.app.get('/docs/spec.json', async (_, reply) => {
      const spec = generator.generateDocument(swaggerMeta);

      reply.type('application/json').send(spec);
    });
  }
}

void Server.start();

process.once('SIGINT', () => Server.shutdown());
process.once('SIGTERM', () => Server.shutdown());

process.on('unhandledRejection', (err) => {
  LoggerClient.instance.error('Unhandled promise rejection', {
    err: err instanceof Error ? { name: err.name, message: err.message, stack: err.stack } : String(err),
  });
});

process.on('uncaughtException', (err) => {
  LoggerClient.instance.error('Uncaught exception', {
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
  setImmediate(() => Server.shutdown(true));
});
