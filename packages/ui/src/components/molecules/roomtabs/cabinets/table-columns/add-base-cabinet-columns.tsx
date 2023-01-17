import React from 'react';
import { Checkbox } from 'antd';

const addBaseCabinetColumns =  [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'Base Doors',
    key: 'base_doors',
    dataIndex: 'base_doors',
  },
  {
    title: 'Upper Doors',
    key: 'upper_doors',
    dataIndex: 'upper_doors',
  },
  {
    title: 'Drawer Fronts',
    key: 'drawer_fronts',
    dataIndex: 'drawer_fronts',
  },
  {
    title: 'Drawers',
    key: 'drawers',
    dataIndex: 'drawers',
  },
  {
    title: 'Favorite',
    key: 'favorite',
    dataIndex: 'favorite',

    render(checked: boolean) {
      return (
        <Checkbox checked={checked} />
      )
    }
  },
];

export default addBaseCabinetColumns;
