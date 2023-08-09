import { ProColumns } from '@ant-design/pro-components';

const Columns: ProColumns[] = [
  {
    title: '名称',
    dataIndex: 'name',
    ellipsis: true,
    width: '10%',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '描述',
    dataIndex: 'desc',
    ellipsis: true,
    width: '10%',
  },
  {
    title: '路由',
    dataIndex: 'host',
    ellipsis: true,
    width: '10%',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    render: (text) => <a>{text}</a>,
  },
  {
    title: '端口',
    dataIndex: 'port',
    ellipsis: true,
    width: '10%',
  },
  {
    title: '创建人',
    dataIndex: 'creatorName',
    ellipsis: true,
    editable: false,
    search: false,
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'create_time',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
    editable: false,
  },
  {
    title: '更新时间',
    key: 'showTime',
    dataIndex: 'update_time',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
    editable: false,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.uid);
        }}
      >
        编辑
      </a>,
    ],
  },
];

export default Columns;
