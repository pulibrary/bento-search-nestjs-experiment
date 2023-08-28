import { Type } from "class-transformer";
import { SearchItem } from "./searchItem.dto";

export class SearchResponse {
  moreResults: string;
  totalResults: number;

  @Type(() => SearchItem)
  searchResults: SearchItem[];

  constructor(moreResults: string, totalResults: number, searchResults: SearchItem[]) {
    this.moreResults = moreResults;
    this.totalResults = totalResults;
    this.searchResults = searchResults;
  }
}
