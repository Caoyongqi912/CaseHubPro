import { ProColumns } from '@ant-design/pro-components';
import { CONFIG } from '@/utils/config';

const columns: ProColumns[] = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '请求协议',
    dataIndex: 'request_type',

    // render: request_type :stromg=> CONFIG.REQUEST_TYPE[request_type]
    // render: (value: string) => {
    //   return CONFIG.REQUEST_TYPE[value];
    // }
  },
  {
    title: '优先级',
    dataIndex: 'priority',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '创建人',
    dataIndex: 'create_user',
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
  },
];
export default columns;
