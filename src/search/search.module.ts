import { Module } from "@nestjs/common";
import { SearchController } from "./controller/search.controller";
import { ServiceModule } from "./service/service.module";

@Module({
  imports: [ServiceModule],
  exports: [ServiceModule],
  controllers: [SearchController],
  providers: []
})
export class SearchModule {}
