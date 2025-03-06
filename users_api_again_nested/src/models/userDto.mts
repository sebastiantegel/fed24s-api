export type UserDto = {
  id: number;
  username: string;
  adress: AdressDto;
};

export type AdressDto = {
  street: string;
  zipCode: string;
  region: string;
};
