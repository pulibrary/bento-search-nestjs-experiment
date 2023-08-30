import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { lastValueFrom, of } from 'rxjs';
import { CatalogSearchService } from './catalog.service';

import { AxiosResponse } from 'axios';
import { Links } from './model/links.dto';
import { Pages } from './model/pages.dto';
import { Meta } from './model/meta.dto';
import { PubCreatedDisplayAttributes } from './model/pubCreatedDisplayAttributes.dto';
import { PubCreatedDisplay } from './model/pubCreatedDisplay.dto';
import { Attributes } from './model/attributes.dto';
import { SearchResultLinks } from './model/searchResultLinks.dto';
import { SearchResult } from './model/searchResult.dto';
import { SearchResults } from './model/searchResults.dto';
import { SearchItem } from '../../../search/model/searchItem.dto';
import { SearchResponse } from '../../../search/model/searchResponse.dto';
import { AuthorDisplayAttributes } from './model/authorDisplayAttributes';
import { AuthorDisplay } from './model/authorDisplay.dto';

describe('CatalogSearchService', () => {
  let httpService: HttpService;
  let catalogSearchService: CatalogSearchService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CatalogSearchService, ConfigService],
    }).compile();

    httpService = moduleRef.get<HttpService>(HttpService);
    catalogSearchService =
      moduleRef.get<CatalogSearchService>(CatalogSearchService);
  });

  describe('CatalogSearchService', () => {
    const SEARCH_STRING = 'cats';
    const MORE_RESULTS_LINK =
      'https://catalog.princeton.edu/catalog.json?q=cats&search_field=all_fields';
    const TOTAL_RESULTS_COUNT = 40172;

    const PUBLISHER_NAME1 = 'New York : F. Watts, c1966.';
    const TITLE1 = 'Cats.';
    const ITEM_LINK1 = 'https://catalog.princeton.edu/catalog/SCSB-6710959';

    const AUTHOR_NAME2 = 'Leen, Nina, 1909-';
    const PUBLISHER_NAME2 = 'New York : Holt, Rinehart, and Winston, c1980.';
    const TITLE2 = 'Cats / by Nina Leen.';
    const ITEM_LINK2 = 'https://catalog.princeton.edu/catalog/SCSB-6699279';

    const links = new Links(MORE_RESULTS_LINK);
    const pages = new Pages(TOTAL_RESULTS_COUNT);
    const meta = new Meta(pages);

    const pubCreatedDisplayAttributes1 = new PubCreatedDisplayAttributes([
      PUBLISHER_NAME1,
    ]);
    const pubCreatedDisplay1 = new PubCreatedDisplay(
      pubCreatedDisplayAttributes1,
    );
    const attributes1 = new Attributes(TITLE1, undefined, pubCreatedDisplay1);
    const searchResultLinks1 = new SearchResultLinks(ITEM_LINK1);
    const searchResult1 = new SearchResult(attributes1, searchResultLinks1);

    const authorDisplayAttributes2 = new AuthorDisplayAttributes([
      AUTHOR_NAME2,
    ]);
    const authorDisplay2 = new AuthorDisplay(authorDisplayAttributes2);
    const pubCreatedDisplayAttributes2 = new PubCreatedDisplayAttributes([
      PUBLISHER_NAME2,
    ]);
    const pubCreatedDisplay2 = new PubCreatedDisplay(
      pubCreatedDisplayAttributes2,
    );
    const attributes2 = new Attributes(
      TITLE2,
      authorDisplay2,
      pubCreatedDisplay2,
    );
    const searchResultLinks2 = new SearchResultLinks(ITEM_LINK2);
    const searchResult2 = new SearchResult(attributes2, searchResultLinks2);

    const searchResults = new SearchResults(links, meta, [
      searchResult1,
      searchResult2,
    ]);

    const mockResponse: AxiosResponse<SearchResults> = {
      status: 200,
      statusText: '',
      headers: {},
      config: null,
      data: searchResults,
    };

    describe('fetchSearchResults', () => {
      it('should fetch JSON from the catalog', async () => {
        jest
          .spyOn(httpService, 'get')
          .mockImplementation(() => of(mockResponse));

        await expect(
          lastValueFrom(catalogSearchService.fetchSearchResults(SEARCH_STRING)),
        ).resolves.toEqual(mockResponse);
      });
    });

    describe('getSearchResults', () => {
      it('should return a SearchResponse object', async () => {
        const searchItem1 = new SearchItem(
          TITLE1,
          '',
          PUBLISHER_NAME1,
          ITEM_LINK1,
        );
        const searchItem2 = new SearchItem(
          TITLE2,
          AUTHOR_NAME2,
          PUBLISHER_NAME2,
          ITEM_LINK2,
        );
        const searchResponse = new SearchResponse(
          MORE_RESULTS_LINK,
          TOTAL_RESULTS_COUNT,
          [searchItem1, searchItem2],
        );

        jest
          .spyOn(httpService, 'get')
          .mockImplementation(() => of(mockResponse));

        await expect(
          lastValueFrom(catalogSearchService.getSearchResults(SEARCH_STRING)),
        ).resolves.toEqual(searchResponse);
      });
    });
  });
});
