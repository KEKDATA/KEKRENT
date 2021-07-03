import { Record, String, Static, Array, Optional, Boolean } from 'runtypes';

const Fazwaz = Record({
  id: String,
  photos: Array(String),
  price: String,
  title: String,
  location: String,
  link: String,
  description: String,
  availableNow: String,
  petsInfo: Record({
    isAllowed: Boolean,
    isNA: Boolean,
    description: String,
  }),
  features: Array(Record({ text: String, image: Optional(String) })),
  basicInforms: Array(Record({ topic: String, info: String })),
});

export const FazwazContract = Array(Fazwaz);
export type FazwazType = Static<typeof Fazwaz>;
export type FazwazsType = Static<typeof FazwazContract>;
