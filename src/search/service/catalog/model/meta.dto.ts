import { Type } from "class-transformer";
import { Pages } from "./pages.dto";

export class Meta {
  @Type(() => Pages)
  pages: Pages;
}
