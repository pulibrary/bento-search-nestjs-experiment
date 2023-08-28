import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { CatalogSearchService } from "./catalog.service";

@Module({
  imports: [HttpModule],
  exports: [CatalogSearchService],
  providers: [
    CatalogSearchService
  ]
})
export class CatalogModule {}
