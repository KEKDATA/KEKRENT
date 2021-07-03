import React from 'react';
import { Route } from 'wouter';
import { ParseNavigation } from 'features/parse_navigation/feature';
import { FazwazPage } from 'pages/fazwaz/page';
import { FacebookPage } from './facebook/page';
import { paths } from './paths';
import { Error404Page } from './error404/page';

export const Pages = () => {
  return (
    <>
      <ParseNavigation />
      <Route path={paths.facebook()} component={FacebookPage} />
      <Route path={paths.fazwaz()} component={FazwazPage} />
      <Route path="/404" component={Error404Page} />
    </>
  );
};
