import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SearchItem } from './searchItem.dto';

export class SearchResponse {
  @ApiProperty({
    example:
      'https://catalog.princeton.edu/catalog.json?q=cats&search_field=all_fields',
    description: 'A URL linking to the service with full search results',
  })
  moreResults: string;

  @ApiProperty({
    example: 20,
    description: 'The total number of search results',
  })
  totalResults: number;

  @Type(() => SearchItem)
  @ApiProperty({
    type: SearchItem,
    description: 'A list of the top 3 search results',
  })
  searchResults: SearchItem[];

  constructor(
    moreResults: string,
    totalResults: number,
    searchResults: SearchItem[],
  ) {
    this.moreResults = moreResults;
    this.totalResults = totalResults;
    this.searchResults = searchResults;
  }
}
