import { ProColumns } from '@ant-design/pro-components';
import { history } from 'umi';

const columns: ProColumns[] = [
  {
    title: 'uid',
    dataIndex: 'uid',
    ellipsis: false,
    editable: false,
    copyable: true,
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
          action?.startEditable?.(record.uid);
        }}
      >
        编辑
      </a>,
      <a
        target="_blank"
        rel="noopener noreferrer"
        key="view"
        onClick={() => {
          history.push('/project/detail/' + record.uid);
        }}
      >
        查看
      </a>,
    ],
  },
];

export default columns;
