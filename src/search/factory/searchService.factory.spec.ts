import { HttpModule } from "@nestjs/axios";
import { HttpException, HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { CatalogSearchService } from "../service/catalog/catalog.service";
import { SearchServiceFactory } from "./searchService.factory";

describe('SearchServiceFactory', () => {
  let catalogSearchService: CatalogSearchService;
  let searchServiceFactory: SearchServiceFactory;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [SearchServiceFactory, CatalogSearchService, ConfigService]
    }).compile();

    catalogSearchService = moduleRef.get<CatalogSearchService>(CatalogSearchService);
    searchServiceFactory = moduleRef.get<SearchServiceFactory>(SearchServiceFactory);
  });

  describe('getSearchService', () => {
    it('should return the CatalogSearchService when called', () => {
      expect(searchServiceFactory.getSearchService('catalog')).toBeInstanceOf(CatalogSearchService);
    });

    it('should return a 400 when called with unknown service', () => {
      expect(() => {
        searchServiceFactory.getSearchService('cats');
      }).toThrowError(HttpException);
    });
  })
});
