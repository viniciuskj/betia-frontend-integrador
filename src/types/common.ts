export type UserData = {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
  };
  created_at: string;
  updated_at: string;
  subscription: {
    start_date: string;
  };
};
