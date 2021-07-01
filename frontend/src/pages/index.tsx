import React from 'react';
import { Route } from 'wouter';
import { HomePage } from './home/page';
import { paths } from './paths';
import { Error404Page } from './error404/page';

export const Pages = () => {
  return (
    <>
      <Route path={paths.home()} component={HomePage} />
      <Route path="/404" component={Error404Page} />
    </>
  );
};
