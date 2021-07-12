export interface BasicInfo {
  title: string;
  numberOptions: Array<{ count: string; description: string }>;
  booleanOptions: Array<{
    isChecked: boolean;
    description: string;
  }>;
}

export interface PhuketRentHouse {
  link: string;
  price: string | null;
  basicInfoFirst: BasicInfo | null;
  basicInfoLast: BasicInfo | null;
  title: string;
  texts: string[];
  photosLinks: string[];
  siteMapLink: string | null;
}
