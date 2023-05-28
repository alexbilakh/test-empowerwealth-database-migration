export type AddressSchema = {
  _id: string;
  formattedAddress?: string;
  streetNumber?: number;
  street?: string;
  suburb?: string;
  state?: string;
  postCode?: string;
  isCurrent?: boolean;
};

export type BusinessDetails = {
  _id: string;
  name?: string;
  abn?: string;
};

export type ClientSchema = {
  _id: string;
  name?: string;
  dateOfBirth?: Date;
  businessDetails?: BusinessDetails;
  address?: AddressSchema[];
  associates?: ClientSchema[];
};
