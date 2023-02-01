import { ProColumns } from '@ant-design/pro-components';
import { CONFIG } from '@/utils/config';
import { Divider, message, Tag } from 'antd';
import { delApiCase } from '@/api/interface';

const delCase = async (uid: string) => {
  console.log('--', uid);
  const res = await delApiCase({ uid: uid });
  if (res.code === 0) {
    message.success(res.msg);
  }
  return;
};

const columns: ProColumns[] = [
  {
    title: '名称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '请求协议',
    dataIndex: 'http',
    render: (text, record) => {
      // @ts-ignore
      return CONFIG.REQUEST_TYPE[text];
    },
  },
  {
    title: '优先级',
    dataIndex: 'level',
    render: (text) => {
      return <Tag>{text}</Tag>;
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '创建人',
    dataIndex: 'creatorName',
    // render: (text, record) => {
    //   return <Avatar >{text}</Avatar>;
    // }
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    valueType: 'date',
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => {
      return (
        <>
          <a
            target="_blank"
            rel="noopener noreferrer"
            key="view"
            // onClick={() => {
            //   history.push("/project/detail/" + record.uid);
          >
            详情
          </a>
          <Divider type={'vertical'} />
          {/*<Dropdown>*/}
          <a>执行</a>
          {/*</Dropdown>*/}
          <Divider type={'vertical'} />
          <a
            onClick={() => {
              delCase(record.uid);
            }}
          >
            删除
          </a>
        </>
      );
    },
  },
];
export default columns;
