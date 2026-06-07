"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const compression = require("compression");
const morgan = require("morgan");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log'],
    });
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('PORT', 4000);
    const NODE_ENV = configService.get('NODE_ENV', 'development');
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: NODE_ENV === 'production' ? undefined : false,
    }));
    app.use(compression());
    app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'https://aethlacare.qa',
            'https://www.aethlacare.qa',
            'https://admin.aethlacare.qa',
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    });
    app.setGlobalPrefix('api/v1');
    app.enableVersioning({ type: common_1.VersioningType.URI });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    if (NODE_ENV !== 'production') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Aethla Care API')
            .setDescription('Aethla Care — Premium Home Healthcare Platform API (Qatar)')
            .setVersion('1.0')
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
            .addTag('auth', 'Authentication & Authorization')
            .addTag('clients', 'Client Management')
            .addTag('caregivers', 'Caregiver Management')
            .addTag('schedules', 'Scheduling System')
            .addTag('care-notes', 'Digital Care Notes')
            .addTag('billing', 'Billing & Finance')
            .addTag('incidents', 'Incident Management')
            .addTag('messages', 'Communication Center')
            .addTag('blog', 'Blog & CMS')
            .addTag('matching', 'AI Matching Engine')
            .addTag('dashboard', 'Analytics & Dashboard')
            .addTag('public', 'Public Endpoints')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api/docs', app, document, {
            swaggerOptions: { persistAuthorization: true },
        });
    }
    await app.listen(PORT);
    console.log(`
  ┌─────────────────────────────────────────────────────────┐
  │                                                         │
  │   🏥  Aethla Care API is running                        │
  │                                                         │
  │   🌐  http://localhost:${PORT}/api/v1                       │
  │   📚  http://localhost:${PORT}/api/docs                     │
  │   🌍  Environment: ${NODE_ENV.padEnd(16)}                │
  │                                                         │
  └─────────────────────────────────────────────────────────┘
  `);
}
bootstrap();
//# sourceMappingURL=main.js.map