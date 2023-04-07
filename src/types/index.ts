export type Event = {
  key: string;
  currentTarget: { 
    title: string; 
  };
};

export type ResponseData = {
  total_count: number;
  items: Item[];
}

export type Item = {
  id: number;
  name: String;
  full_name: String;
  html_url: string;
  language: String;
  forks: number;
  stargazers_count: number;
  updated_at: string;
  forks_count: number;
  description: string;
}