import { FazwazType } from 'contracts/fazwaz/contract';
import { PetsFilter } from 'typings/pets';

export const getResultPetsFilter = ({
  petsFilter,
  petsInfo,
  isSomeFeatureFounded,
}: {
  petsFilter: PetsFilter;
  petsInfo: FazwazType['petsInfo'];
  isSomeFeatureFounded: boolean;
}) => {
  switch (petsFilter) {
    case PetsFilter.Allowed: {
      return isSomeFeatureFounded && (petsInfo.isAllowed || petsInfo.isNA);
    }
    case PetsFilter.NotAllowed: {
      return isSomeFeatureFounded && !petsInfo.isAllowed && !petsInfo.isNA;
    }
    default: {
      return isSomeFeatureFounded;
    }
  }
};

export const checkIsSomeFeatureFounded = ({
  features,
  checkedFeatures,
}: {
  features: FazwazType['features'];
  checkedFeatures: string[];
}) => {
  const normalizedFeatures = features.map(({ text }) => text);
  const isSomeFeatureFounded = normalizedFeatures.some((feature) =>
    checkedFeatures.includes(feature),
  );

  return isSomeFeatureFounded;
};
