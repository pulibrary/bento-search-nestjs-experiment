import { Type } from 'class-transformer';
import { Attributes } from './attributes.dto';
import { SearchResultLinks } from './searchResultLinks.dto';

export class SearchResult {
  @Type(() => Attributes)
  attributes: Attributes;

  @Type(() => SearchResultLinks)
  links: SearchResultLinks;

  constructor(attributes: Attributes, links: SearchResultLinks) {
    this.attributes = attributes;
    this.links = links;
  }
}
