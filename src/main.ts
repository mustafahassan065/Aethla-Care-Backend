import { NestFactory } from '@nestjs/core'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import * as compression from 'compression'
import * as morgan from 'morgan'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  })

  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('PORT', 4000)
  const NODE_ENV = configService.get<string>('NODE_ENV', 'development')

  // ── Security ────────────────────────────────────────────
  app.use(helmet({
    contentSecurityPolicy: NODE_ENV === 'production' ? undefined : false,
  }))

  // ── Compression ─────────────────────────────────────────
  app.use(compression())

  // ── Logging ─────────────────────────────────────────────
  app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'))

  // ── CORS ────────────────────────────────────────────────
  app.use(require('express').json({ limit: '10mb' }))
  app.use(require('express').urlencoded({ limit: '10mb', extended: true }))
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
  })

  // ── Global prefix ────────────────────────────────────────
  app.setGlobalPrefix('api/v1')

  // ── Versioning ──────────────────────────────────────────
  app.enableVersioning({ type: VersioningType.URI })

  // ── Global validation pipe ───────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  // ── Swagger API Docs ─────────────────────────────────────
  if (NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Aethla Care API')
      .setDescription('Aethla Care — Premium Home Healthcare Platform API (Qatar)')
      .setVersion('1.0')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
      .addTag('auth',          'Authentication & Authorization')
      .addTag('clients',       'Client Management')
      .addTag('caregivers',    'Caregiver Management')
      .addTag('schedules',     'Scheduling System')
      .addTag('care-notes',    'Digital Care Notes')
      .addTag('billing',       'Billing & Finance')
      .addTag('incidents',     'Incident Management')
      .addTag('messages',      'Communication Center')
      .addTag('blog',          'Blog & CMS')
      .addTag('matching',      'AI Matching Engine')
      .addTag('dashboard',     'Analytics & Dashboard')
      .addTag('public',        'Public Endpoints')
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    })
  }

  await app.listen(PORT)
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
  `)
}

bootstrap()
