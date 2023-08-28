import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";
import { config } from "src/app.config";
import { SearchItem } from "src/search/model/searchItem.dto";
import { SearchResponse } from "src/search/model/searchResponse.dto";
import { SearchResults } from "src/search/service/catalog/model/searchResults.dto";
import { SearchService } from "../service.interface";

@Injectable()
export class CatalogSearchService implements SearchService {
  constructor(private readonly httpService: HttpService) {}

  getSearchResults(searchString: string): Observable<SearchResponse> {
    var res =  this.fetchSearchResults(searchString);
    return res.pipe(
      map(rs => plainToInstance(SearchResults, rs.data)),
      map(results => {
        var items = results.data.slice(0, 3).map(function(item) {
          var creator = item.attributes.author_display === undefined ? null : item.attributes.author_display.attributes.value[0];
          var description = item.attributes.pub_created_display === undefined ? null : item.attributes.pub_created_display.attributes.value[0];
          return new SearchItem(
            item.attributes.title,
            creator,
            description,
            item.links.self
          )
        }, results)
        return new SearchResponse(results.links.self, results.meta.pages.total_count, items);
      })
    )
  }

  fetchSearchResults(searchString: string): Observable<AxiosResponse<SearchResults>> {
    return this.httpService.get(`${config.catalogUrl}?search_field=all_fields&q=${searchString}`)
  }
}
