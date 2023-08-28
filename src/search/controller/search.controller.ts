import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { SearchResponse } from "../model/searchResponse.dto";
import { CatalogSearchService } from "../service/catalog/catalog.service";

@Controller('search')
export class SearchController {
  constructor(private readonly catalogSearchService: CatalogSearchService) {}

  @Get()
  search(): Observable<SearchResponse> {
    return this.catalogSearchService.getSearchResults('cats');
  }
}
