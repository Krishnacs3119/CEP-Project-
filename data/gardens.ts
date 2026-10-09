export interface Garden {
  id: string;
  name: string;
  category: string;
  coordinates: [number, number]; // [lat, lng]
  area: string;
  address: string;
  description: string;
  googleMapsUrl: string;
}

export const mindspaceGarden: Garden = {
  id: 'mindspace-garden',
  name: 'Mindspace Garden',
  category: 'Garden',
  coordinates: [19.1794904, 72.8336388],
  area: 'Malad West, Mumbai',
  address: 'Mindspace, Malad West, Mumbai, Maharashtra 400064',
  description:
    'An urban landscaped garden with lush greenery, walking pathways, lawns and a variety of trees and plants.',
  googleMapsUrl: 'https://maps.app.goo.gl/Gf5JysVXwcvBLFGm8',
};

export const gardensData: Garden[] = [mindspaceGarden];
