import { Type } from 'class-transformer';
import { Links } from './links.dto';
import { Meta } from './meta.dto';
import { SearchResult } from './searchResult.dto';

export class SearchResults {
  @Type(() => Links)
  links: Links;

  @Type(() => Meta)
  meta: Meta;

  @Type(() => SearchResult)
  data: Array<SearchResult>;
}
