export class SearchItem {
  title: string;
  creator: string;
  description: string;
  link: string;

  constructor(
    title: string, creator: string, description: string, link: string) {
    this.title = title;
    this.creator = creator;
    this.description = description;
    this.link = link;
  }
}
