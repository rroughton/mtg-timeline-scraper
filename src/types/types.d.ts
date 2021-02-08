export interface Event {
    date: string;
    banned: string[];
    restricted: string[];
    unbanned: string[];
    unrestricted: string[];
  }

export type RestrictionTypes = 'banned' | 'restricted' | 'unbanned' | 'unrestricted';