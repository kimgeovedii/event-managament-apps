// Mock Data - Categories
// Simulates API response structure

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  eventCount: number;
  image: string;
  color: 'pink' | 'cyan' | 'purple' | 'lime';
  badge?: string;
}

export interface CategoriesResponse {
  data: Category[];
}

export const mockCategories: CategoriesResponse = {
  data: [
    {
      id: "cat-nightlife",
      name: "Nightlife",
      slug: "nightlife",
      icon: "nightlife",
      eventCount: 120,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1WMCZoHaSjngfsapkDhVHLgDTxMNqXxRRTUYcoJvyzaHyf1gLIIKM-DQCIwjlZzN5mxDCzT4AUx_zb-gP4hfAj4JTp8JzT5wPom0D0KSK2wvAvXdIbvfZvK1bxv_DtasgZTq26l03bjJpOvcLTm3-W5OHiXcCf1VwVVQzQo4sa6IzmQgw7f5mzBeDl3crEd42p99COQmTx5fkdNWtT9s7jxs-gf8ocM5UGeI15OE0GCGiv5MEDTATjQy4ypZJ7OsWWDItnoSDYQA",
      color: "purple",
      badge: "120+ Events",
    },
    {
      id: "cat-creative",
      name: "Creative",
      slug: "creative",
      icon: "palette",
      eventCount: 85,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJnPkYGfBE5cP94vJ88oI0Z0uDmkb5vidVRnfhJtB4oUGVxbXQbPo7cxw4ebcegpwuZu7_Io5yTdVtdkwziG0zf8co13cWWQf-5OZch7HavJSxyfp_BTyL02lGn8TKHxwnLq9i-Xn6l_1BXTYZF8uqHyYjLtcPd704eZAV05qcKzAsPks5rEx7_LzssuT6WGVSkaIpQmBDEZmt-zCgXaeZwK2h3N-5F9nrnD3105xfIj7diU4RB6kNtRIGUjrTMljPW-Op5FKtITQ",
      color: "cyan",
      badge: "Daily",
    },
    {
      id: "cat-concerts",
      name: "Concerts",
      slug: "concerts",
      icon: "music_note",
      eventCount: 64,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1WMCZoHaSjngfsapkDhVHLgDTxMNqXxRRTUYcoJvyzaHyf1gLIIKM-DQCIwjlZzN5mxDCzT4AUx_zb-gP4hfAj4JTp8JzT5wPom0D0KSK2wvAvXdIbvfZvK1bxv_DtasgZTq26l03bjJpOvcLTm3-W5OHiXcCf1VwVVQzQo4sa6IzmQgw7f5mzBeDl3crEd42p99COQmTx5fkdNWtT9s7jxs-gf8ocM5UGeI15OE0GCGiv5MEDTATjQy4ypZJ7OsWWDItnoSDYQA",
      color: "pink",
      badge: "Live",
    },
  ],
};

// Filter categories for filter bar
export interface FilterCategory {
  id: string;
  name: string;
  icon: string;
  color: 'pink' | 'cyan' | 'purple' | 'lime' | 'yellow';
}

export const filterCategories: FilterCategory[] = [
  { id: "all", name: "All Vibes", icon: "grid_view", color: "pink" },
  { id: "music", name: "Music", icon: "music_note", color: "purple" },
  { id: "nightlife", name: "Nightlife", icon: "nightlife", color: "pink" },
  { id: "workshop", name: "Workshop", icon: "palette", color: "cyan" },
  { id: "food", name: "Food", icon: "restaurant", color: "yellow" },
];

// Simulated API fetch function
export const fetchCategories = async (): Promise<CategoriesResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockCategories;
};
