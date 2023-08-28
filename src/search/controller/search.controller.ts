import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { SearchResponse } from '../model/searchResponse.dto';
import { CatalogSearchService } from '../service/catalog/catalog.service';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly catalogSearchService: CatalogSearchService) {}

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
    switch (service) {
      case 'catalog':
        return this.catalogSearchService.getSearchResults(search);
      default:
        throw new HttpException(
          `The requested service ${service} is not a valid service`,
          HttpStatus.BAD_REQUEST,
        );
    }
  }
}
