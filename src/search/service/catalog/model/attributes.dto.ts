import { Type } from 'class-transformer';
import { AuthorDisplay } from './authorDisplay.dto';
import { PubCreatedDisplay } from './pubCreatedDisplay.dto';

export class Attributes {
  title: string;

  @Type(() => AuthorDisplay)
  author_display: AuthorDisplay;

  @Type(() => PubCreatedDisplay)
  pub_created_display: PubCreatedDisplay;
}
