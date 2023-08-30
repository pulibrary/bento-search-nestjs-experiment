import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { CatalogSearchService } from '../src/search/service/catalog/catalog.service';
import { SearchItem } from '../src/search/model/searchItem.dto';
import { SearchResponse } from '../src/search/model/searchResponse.dto';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  const REQUEST_URL = '/search/catalog?search=cats';
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

  const searchItem1 = new SearchItem(TITLE1, '', PUBLISHER_NAME1, ITEM_LINK1);
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

  const expectedResponse = {
    moreResults:
      'https://catalog.princeton.edu/catalog.json?q=cats&search_field=all_fields',
    totalResults: 40172,
    searchResults: [
      {
        title: 'Cats.',
        creator: '',
        description: 'New York : F. Watts, c1966.',
        link: 'https://catalog.princeton.edu/catalog/SCSB-6710959',
      },
      {
        title: 'Cats / by Nina Leen.',
        creator: 'Leen, Nina, 1909-',
        description: 'New York : Holt, Rinehart, and Winston, c1980.',
        link: 'https://catalog.princeton.edu/catalog/SCSB-6699279',
      },
    ],
  };

  let app: INestApplication;
  const catalogSearchService = {
    getSearchResults: () => searchResponse,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CatalogSearchService)
      .useValue(catalogSearchService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /search/catalog?search=cats', () => {
    return request(app.getHttpServer())
      .get(REQUEST_URL)
      .expect(200)
      .expect(expectedResponse);
  });

  afterAll(async () => {
    await app.close();
  });
});
