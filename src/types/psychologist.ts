export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface Psychologist {
  id?: string;
  name: string;
  avatar_url: string;
  price_per_hour: number;
  rating: number;
  specialization: string;
  license: string;
  experience: string;
  initial_consultation: string;
  about: string;
  reviews: Review[];
}
