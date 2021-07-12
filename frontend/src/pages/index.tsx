import { Error404Page } from './error404/page';
import { FacebookPage } from './facebook/page';
import { paths } from './paths';
import { ParseNavigation } from 'features/parse_navigation/feature';
import { FazwazPage } from 'pages/fazwaz/page';
import { PhuketRentHousePage } from 'pages/phuket_rent_house/page';
import React from 'react';
import { Route } from 'wouter';

export const Pages = () => {
  return (
    <>
      <ParseNavigation />
      <Route path={paths.facebook()} component={FacebookPage} />
      <Route path={paths.fazwaz()} component={FazwazPage} />
      <Route path={paths.phuketRentHouse()} component={PhuketRentHousePage} />
      <Route path="/404" component={Error404Page} />
    </>
  );
};
