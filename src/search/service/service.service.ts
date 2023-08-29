import { Observable } from 'rxjs';
import { SearchResponse } from '../model/searchResponse.dto';

export abstract class SearchService {
  abstract getSearchResults(searchString: string): Observable<SearchResponse>;
}
