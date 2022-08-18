import { FilterFieldTypeEnum } from '../../graphql/types/_server';

export const tableHeadCells = [
  {
    columnName: 'name',
    type: FilterFieldTypeEnum.Text,
    label: 'Name'
  },
  {
    columnName: 'authorEmail',
    type: FilterFieldTypeEnum.Text,
    label: 'Author Email'
  },
  {
    columnName: 'genre',
    type: FilterFieldTypeEnum.Text,
    label: 'Genre'
  },
  {
    columnName: 'description',
    type: FilterFieldTypeEnum.Text,
    label: 'Description'
  },
  {
    columnName: 'price',
    type: FilterFieldTypeEnum.Number,
    label: 'Price'
  },
  {
    columnName: 'trackLength',
    type: FilterFieldTypeEnum.Number,
    label: 'Track Length'
  }
];
