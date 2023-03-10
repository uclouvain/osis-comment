import type {CommentLinks, EntryRecord} from "./interfaces";

export class Entry {
  uuid: string;
  comment: string;
  author: string | null;
  tags: string[];
  extra_data: object;
  links: CommentLinks;

  created_at: Date;

  constructor(
      {
        uuid,
        comment,
        author,
        tags,
        extra_data,
        links,
        created_at,
      }: EntryRecord,
  ) {
    this.uuid = uuid;
    this.comment = comment;
    this.author = author;
    this.tags = tags;
    this.extra_data = extra_data;
    this.links = links;
    this.created_at = new Date(created_at);
  }
}
