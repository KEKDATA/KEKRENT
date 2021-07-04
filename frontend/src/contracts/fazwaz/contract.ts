import { Record, String, Static, Array, Optional, Boolean } from 'runtypes';

const Features = Array(Record({ text: String, image: Optional(String) }));

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
  projectHighlights: Array(
    Record({
      link: String,
      image: String,
      title: String,
    }),
  ),
  features: Features,
  basicInforms: Array(Record({ topic: String, info: String })),
});

export const FazwazContract = Record({
  posts: Array(Fazwaz),
  totalFeatures: Array(String),
});
export type FazwazType = Static<typeof Fazwaz>;
export type FazwazsType = Static<typeof FazwazContract>;
