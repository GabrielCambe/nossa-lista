export interface MovieType {
    id: string;
    title: string;
    genre: string;
    year: string;
    imageUrl: string;
    link: string;
  }

export type MoviesByCategoryType = {
  [key: string]: MovieType[];
};
