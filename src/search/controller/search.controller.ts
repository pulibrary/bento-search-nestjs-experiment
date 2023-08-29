import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { SearchServiceFactory } from '../factory/searchService.factory';
import { SearchResponse } from '../model/searchResponse.dto';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchServiceFactory: SearchServiceFactory) {}

  @Get(':service')
  @ApiOperation({ summary: 'Get search results for service' })
  @ApiResponse({
    status: 200,
    description: 'Search results for a given service and search string',
    type: SearchResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  search(
    @Query('search') search: string,
    @Param('service') service: string,
  ): Observable<SearchResponse> {
    return this.searchServiceFactory
      .getSearchService(service)
      .getSearchResults(search);
  }
}
