import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminQuestionModule } from './modules/admin/question/admin.question.module';
import configurations from './config/configuration';
import { AdminSurveyMdule } from './modules/admin/survey/admin.survery.module';
import { SurveyMdule } from './modules/user/survey/survery.module';
import { DatabaseModule } from './database/database.module';
import { AnswerModule } from './modules/user/answer/answer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: configurations }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: ['dist/**/entities/**/*.entity.js'],
      }),
    }),
    AdminQuestionModule,
    AdminSurveyMdule,
    DatabaseModule,
    AnswerModule,
    SurveyMdule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
