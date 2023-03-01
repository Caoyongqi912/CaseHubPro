import { ProColumns } from '@ant-design/pro-components';

const ExtractColumns: ProColumns[] = [
  {
    title: '变量名',
    dataIndex: 'key',
  },
  {
    title: '提取语法',
    dataIndex: 'val',
  },
  {
    title: 'Opt',
    valueType: 'option',
  },
];

export default ExtractColumns;
