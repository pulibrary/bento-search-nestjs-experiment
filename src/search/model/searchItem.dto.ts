import { ApiProperty } from '@nestjs/swagger';

export class SearchItem {
  @ApiProperty({
    example: 'Cats',
    description: 'The title of the search result',
  })
  title: string;

  @ApiProperty({
    example: 'Leen, Nina, 1909-',
    description: 'Author/Creator of the search result',
  })
  creator: string;

  @ApiProperty({
    example: 'New York : Holt, Rinehart, and Winston, c1980.',
    description: 'A description of the search result',
  })
  description: string;

  @ApiProperty({
    example: 'https://catalog.princeton.edu/catalog/SCSB-6699279',
    description: 'A link to the search result details',
  })
  link: string;

  constructor(
    title: string,
    creator: string,
    description: string,
    link: string,
  ) {
    this.title = title;
    this.creator = creator;
    this.description = description;
    this.link = link;
  }
}
