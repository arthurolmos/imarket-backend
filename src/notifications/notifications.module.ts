import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Notification } from './notification.entity';
import { NotificationsResolver } from './notifications.resolver';
import { NotificationsService } from './notifications.service';
import { PushNotificationManagersModule } from '../push-notification-managers/push-notification-managers.module';
import { PushNotificationTokensModule } from '../push-notification-tokens/push-notification-tokens.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    UsersModule,
    PushNotificationManagersModule,
    PushNotificationTokensModule,
  ],
  providers: [NotificationsService, NotificationsResolver],
})
export class NotificationsModule {}
