import { Type } from "class-transformer";
import { AuthorDisplayAttributes } from "./authorDisplayAttributes";

export class AuthorDisplay {
  @Type(() => AuthorDisplayAttributes)
  attributes: AuthorDisplayAttributes;
}
