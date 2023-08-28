import { Module } from "@nestjs/common";
import { CatalogModule } from "./catalog/catalog.module";

@Module({
  imports: [CatalogModule],
  exports: [CatalogModule],
  controllers: [],
  providers: []
})
export class ServiceModule {}
