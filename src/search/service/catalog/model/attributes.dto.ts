import { Type } from 'class-transformer';
import { AuthorDisplay } from './authorDisplay.dto';
import { PubCreatedDisplay } from './pubCreatedDisplay.dto';

export class Attributes {
  title: string;

  @Type(() => AuthorDisplay)
  author_display: AuthorDisplay;

  @Type(() => PubCreatedDisplay)
  pub_created_display: PubCreatedDisplay;

  constructor(
    title: string,
    author_display: AuthorDisplay,
    pub_created_display: PubCreatedDisplay,
  ) {
    this.title = title;
    this.author_display = author_display;
    this.pub_created_display = pub_created_display;
  }
}
