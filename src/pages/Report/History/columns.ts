import { ProColumns } from '@ant-design/pro-components';

const columns: ProColumns[] = [
  {
    title: 'UID',
    dataIndex: 'uid',
    ellipsis: true,
  },
  {
    title: '执行人',
    dataIndex: 'starter',
  },
  {
    title: '执行时间',
    dataIndex: 'create_time',
    valueType: 'date',
  },
  {
    title: '状态',
    dataIndex: 'result_status',
  },
];

export default columns;
