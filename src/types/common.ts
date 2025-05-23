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
    id: number;
    user_id: number;
    plan: number;
    start_date: string;
  };
};
