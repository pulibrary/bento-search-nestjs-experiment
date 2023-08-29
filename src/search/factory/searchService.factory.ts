import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CatalogSearchService } from '../service/catalog/catalog.service';
import { SearchService } from '../service/service.service';

@Injectable()
export class SearchServiceFactory {
  constructor(private readonly catalogSearchService: CatalogSearchService) {}

  public getSearchService(context: string): SearchService {
    switch (context) {
      case 'catalog':
        return this.catalogSearchService;
      default:
        throw new HttpException(
          `The requested service ${context} is not a valid service`,
          HttpStatus.BAD_REQUEST,
        );
    }
  }
}
