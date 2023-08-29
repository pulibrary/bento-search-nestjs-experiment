import { Module } from '@nestjs/common';
import { SearchController } from './controller/search.controller';
import { SearchServiceFactory } from './factory/searchService.factory';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [ServiceModule],
  exports: [ServiceModule],
  controllers: [SearchController],
  providers: [SearchServiceFactory],
})
export class SearchModule {}
