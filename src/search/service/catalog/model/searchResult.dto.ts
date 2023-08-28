import { Type } from 'class-transformer';
import { Attributes } from './attributes.dto';
import { Format } from './format.dto';
import { SearchResultLinks } from './searchResultLinks.dto';

export class SearchResult {
  id: number;
  type: string;

  @Type(() => Attributes)
  attributes: Attributes;

  @Type(() => Format)
  format: Format;

  @Type(() => SearchResultLinks)
  links: SearchResultLinks;
}
