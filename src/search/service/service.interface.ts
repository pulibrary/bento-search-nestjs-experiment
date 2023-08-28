import { Observable } from 'rxjs';
import { SearchResponse } from '../model/searchResponse.dto';

export interface SearchService {
  getSearchResults(searchString: string): Observable<SearchResponse>;
}
