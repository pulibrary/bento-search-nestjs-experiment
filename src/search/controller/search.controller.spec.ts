import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { lastValueFrom, of } from 'rxjs';
import { SearchItem } from '../model/searchItem.dto';
import { SearchResponse } from '../model/searchResponse.dto';
import { CatalogSearchService } from '../service/catalog/catalog.service';
import { SearchController } from './search.controller';

describe('SearchController', () => {
  let catalogSearchService: CatalogSearchService;
  let searchController: SearchController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SearchController],
      imports: [HttpModule],
      providers: [CatalogSearchService, ConfigService],
    }).compile();

    catalogSearchService =
      moduleRef.get<CatalogSearchService>(CatalogSearchService);
    searchController = moduleRef.get<SearchController>(SearchController);
  });

  describe('search/{service}', () => {
    const item1 = new SearchItem(
      'Cats.',
      null,
      "Glasgow, Collins; New York, G. P. Putnam's Sons [1974]",
      'https://catalog.princeton.edu/catalog/9912140633506421',
    );
    const item2 = new SearchItem(
      'Cats.',
      'Grabiański, Janusz',
      'New York : F. Watts, c1966.',
      'https://catalog.princeton.edu/catalog/SCSB-6710959',
    );
    const item3 = new SearchItem(
      'Cats / by Nina Leen',
      'Leen, Nina, 1909-',
      'New York : Holt, Rinehart, and Winston, c1980.',
      'https://catalog.princeton.edu/catalog/SCSB-6699279',
    );
    const result = new SearchResponse(
      'https://catalog.princeton.edu/catalog.json?q=cats&search_field=all_fields',
      40164,
      [item1, item2, item3],
    );

    it('should return a search response with 3 titles', async () => {
      jest
        .spyOn(catalogSearchService, 'getSearchResults')
        .mockImplementation(() => of(result));

      await expect(
        lastValueFrom(searchController.search('cats', 'catalog')),
      ).resolves.toEqual(result);
    });
  });
});
