export interface Tweet {
  id: string;
  tweet_id: string;
  user: User;
  text: string;
  media: Media[];

  dump: any;
}

export interface User {
  id: string;
  name: string;
  screen_name: string;
}

export interface Media {
  id: string;
  type: string;
  url: string;
}
