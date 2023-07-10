type user = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: address;
  geo: geo;
  phone: string;
  website: string;
  company: company;
};

type address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
};

type geo = {
  lat: string;
  lng: string;
};
type company = {
  name: string;
  catchPhrase: string;
  bs: string;
};
