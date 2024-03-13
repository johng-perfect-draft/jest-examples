import wretch from 'wretch';

export interface Beer {
  price: string;
  name: string;
  id: number;
}

export const getBeerList: () => Promise<Beer[]> = async () => {
  try {
    const response = await wretch('https://api.sampleapis.com/beers/ale')
      .get()
      .json();
    return response as Beer[];
  } catch (error) {
    throw new Error('Failed to fetch beers');
  }
};
