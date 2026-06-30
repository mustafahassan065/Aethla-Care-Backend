import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ThrottlerModule } from '@nestjs/throttler'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ScheduleModule } from '@nestjs/schedule'

import { AuthModule }          from './modules/auth/auth.module'
import { UsersModule }         from './modules/users/users.module'
import { ClientsModule }       from './modules/clients/clients.module'
import { CaregiversModule }    from './modules/caregivers/caregivers.module'
import { SchedulesModule }     from './modules/schedules/schedules.module'
import { CareNotesModule }     from './modules/care-notes/care-notes.module'
import { BillingModule }       from './modules/billing/billing.module'
import { IncidentsModule }     from './modules/incidents/incidents.module'
import { MessagesModule }      from './modules/messages/messages.module'
import { BlogModule }          from './modules/blog/blog.module'
import { StaffModule }         from './modules/staff/staff.module'
import { MatchingModule }      from './modules/matching/matching.module'
import { DashboardModule }     from './modules/dashboard/dashboard.module'
import { PublicModule }        from './modules/public/public.module'
import { ActivityModule }      from './modules/activity/activity.module'
import { SettingsModule }      from './modules/settings/settings.module'
import { FAQModule }           from './modules/faq/faq.module'
import { NotificationsModule } from './modules/notifications/notifications.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        uri:    cfg.get<string>('MONGODB_URI'),
        dbName: cfg.get<string>('MONGODB_DB_NAME', 'aethla'),
      }),
      inject: [ConfigService],
    }),

    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),

    AuthModule,
    UsersModule,
    ClientsModule,
    CaregiversModule,
    SchedulesModule,
    CareNotesModule,
    BillingModule,
    IncidentsModule,
    MessagesModule,
    BlogModule,
    StaffModule,
    MatchingModule,
    DashboardModule,
    PublicModule,
    ActivityModule,
    SettingsModule,
    FAQModule,
    NotificationsModule,
  ],
})
export class AppModule {}