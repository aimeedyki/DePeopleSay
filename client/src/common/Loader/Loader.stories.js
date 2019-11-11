import React from 'react';
import Loader from './LoaderComponent';

export default {
  component: Loader,
  title: 'Loader',
};

export const Example = () => <Loader show><div/></Loader>;
