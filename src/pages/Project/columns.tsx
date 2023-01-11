import { ProColumns } from '@ant-design/pro-components';

const columns: ProColumns[] = [
  {
    title: 'id',
    dataIndex: 'id',
    width: 50,
    editable: false,
    hideInSearch: true,
  },
  {
    title: 'uid',
    dataIndex: 'uid',
    ellipsis: false,
    editable: false,
    formItemProps: { label: 'uid' },
  },
  {
    title: 'title',
    dataIndex: 'name',
    ellipsis: true, //是否自动缩略
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
    search: false,
  },
  {
    title: 'admin',
    dataIndex: 'adminName',
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
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
    ],
  },
];

export default columns;
