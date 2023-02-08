import { ProColumns } from '@ant-design/pro-components';

const Columns: ProColumns[] = [
  {
    title: 'uid',
    dataIndex: 'uid',
    ellipsis: false,
    editable: false,
    formItemProps: { label: 'uid' },
  },
  {
    title: 'name',
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
    title: 'desc',
    dataIndex: 'desc',
    ellipsis: true,
    width: '10%',
  },
  {
    title: 'host',
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
  },
  {
    title: 'creatorName',
    dataIndex: 'creatorName',
    ellipsis: true,
    editable: false,
    search: false,
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'create_time',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
    editable: false,
  },
  {
    title: '更新时间',
    key: 'showTime',
    dataIndex: 'update_time',
    valueType: 'date',
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
