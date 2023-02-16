import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Row,
  Col,
  Select,
  Modal,
  Result,
  Tooltip,
  Menu as AMenu,
  message,
  Card,
  Empty,
  Tag,
  Divider,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { queryProject } from '@/api/project';
import FormForModal from '@/components/InterfaceComponent/FormForModal';
import {
  ActionType,
  ProColumns,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import RecorderDrawer from '@/components/InterfaceComponent/RecorderDrawer';
import AddApiCase from '@/pages/Case/CaseAPI/component/AddApiCase';
import { API } from '@/api';
import SearchTree from '@/components/Tree/SearchTree';
import NoRecord from '@/pages/Case/CaseAPI/component/NoRecord';
import {
  addCasePart,
  casePartTree,
  delApiCase,
  delCasePart,
  pageApiCase,
  putCasePart,
  queryApiCaseByCasePartID,
} from '@/api/interface';
import { CONFIG } from '@/utils/config';
import { history } from 'umi';

const CaseApi: FC = (props) => {
  const [addCaseVisible, setAddCaseVisible] = useState(false);
  const [caseParts, setCaseParts] = useState<API.ICasePartResponse[]>([]);
  const [projects, setProject] = useState<API.IProject[]>([]);
  const [projectID, setProjectID] = useState<number>(0);
  const [editing, setEditing] = useState<boolean>(false);
  const [todo, setTodo] = useState<boolean>(true);
  //modalTitle
  const [modalTitle, setModalTitle] = useState<string>('新建目录');
  //Modal 开关
  const [rootModal, setRootModal] = useState<boolean>(false);
  const [record, setRecord] = useState<API.ICasePart>({});
  const [currentNode, setCurrentNode] = useState(null);
  const [currentCasePartID, setCurrentCasePartID] = useState(null);
  const [currentCasePart, setCurrentPart] = useState<API.ICasePart[]>([]);
  const [currentCaseAPI, setCurrentCaseAPI] = useState([]);
  const [projectsOpt, setProjectOpt] = useState([]);
  const actionRef = useRef<ActionType>(); //Table action 的引用，便于自定义触发
  const ref = useRef<ProFormInstance>();

  useEffect(() => {
    queryProjects();
  }, []);
  useEffect(() => {
    listTestcaseTree();
  }, [projectID]);
  useEffect(() => {
    queryCaseApis();
  }, [currentCasePartID, currentCasePart]);

  /**
   * 查询所有项目
   * 存储第一个项目id与name
   */
  const queryProjects = async () => {
    const { data } = await queryProject();
    if (data) {
      setProject(data);
      setProjectID(data[0].id!);
      let temp: any = [];
      data.map((i: API.IProject) => {
        const _ = { value: i.id, label: i.name };
        temp.push(_);
      });
      setProjectOpt(temp);
    }
  };

  const getProject: any = () => {
    if (projects.length === 0) {
      return 'loading...';
    }
    const filter_project: API.IProject[] = projects.filter(
      (p) => p.id === projectID,
    );
    if (filter_project.length === 0) {
      return projects[0];
    }
    return filter_project[0];
  };

  /**
   * 创建casePart
   * @param value
   */
  const onCreateOrUpdateCasePart = async (value: any) => {
    let body: API.ICasePart = {};
    body.projectID = projectID;
    let res: API.IResponse<any>;
    // 新增？
    if (todo) {
      // 新增子节点？
      if (currentNode) {
        body.parentID = currentNode;
        body.partName = value.partName;
        res = await addCasePart(body);
      } else {
        body.partName = value.partName;
        res = await addCasePart(body);
      }
    } else {
      // 修改
      body.id = record.id;
      body.partName = value.partName;
      res = await putCasePart(body);
    }
    if (res.code === 0) {
      message.success(res.msg);
      setRootModal(false);
      saveCase({
        selectedRowKeys: [],
      });
      listTestcaseTree();
    }
  };

  // 根据 所选partID 查询 apiCase列
  const queryCaseApis = async () => {
    if (currentCasePartID) {
      const res = await queryApiCaseByCasePartID({
        casePartID: currentCasePartID,
      });
      setCurrentCaseAPI(res.data);
    }
  };

  // 删除用例
  const delCase = async (uid: string) => {
    const res = await delApiCase({ uid: uid });
    if (res.code === 0) {
      message.success(res.msg);
      await queryCaseApis();
    }
    return;
  };

  // table columns
  const columns: ProColumns[] = [
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '请求协议',
      dataIndex: 'http',
      search: false,
      render: (text: any, record) => {
        return CONFIG.REQUEST_TYPE[text];
      },
    },
    {
      title: '优先级',
      dataIndex: 'level',
      valueType: 'select',
      valueEnum: CONFIG.CASE_LEVEL_ENUM,
      render: (text, record) => {
        return <Tag color={'blue'}>{text}</Tag>;
        // return <Tag color={CONFIG.RENDER_CASE_STATUS[text].color}>{
        //   CONFIG.RENDER_CASE_STATUS[text].text
        // }</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: CONFIG.CASE_STATUS_ENUM,
      render: (text, record) => {
        return (
          <Tag color={CONFIG.RENDER_CASE_STATUS[record.status].color}>
            {CONFIG.RENDER_CASE_STATUS[record.status].text}
          </Tag>
        );
      },
    },
    {
      title: '创建人',
      dataIndex: 'creatorName',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'date',
      search: false,
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
              onClick={() => {
                history.push(`/interface/caseApi/detail/${record.uid}`);
              }}
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
                Modal.confirm({
                  title: '确认删除？',
                  icon: <ExclamationCircleOutlined />,
                  content: '删除后不可恢复，请谨慎~',
                  okText: '确定',
                  okType: 'danger',
                  cancelText: '点错了',
                  onOk: async () => {
                    await delCase(record.uid);
                  },
                });
              }}
            >
              删除
            </a>
          </>
        );
      },
    },
  ];

  // 新增目录filed
  const fields = [
    {
      name: 'partName',
      label: '目录名称',
      required: true,
      placeholder: '请输入目录名称, 不超过18个字符',
      type: 'input',
    },
  ];

  const saveCase = (data: any) => {};

  // 切换项目
  const changeProject = (projectID: number) => {
    setProjectID(projectID);
    setCurrentCaseAPI([]);
  };

  /**
   * 通过projectID 过滤CaseParts
   */
  const listTestcaseTree = async () => {
    if (projectID) {
      const res = await casePartTree({ projectID: projectID });
      setCaseParts(res.data);
      if (res.data.length > 0) {
        setCurrentCasePartID(res.data[0].id);
        setCurrentPart([res.data[0].id]);
      }
    }
  };
  //删除用例分组
  const onDeleteCasePart = async (id: number) => {
    const res = await delCasePart({ id: id });
    if (res) {
      listTestcaseTree();
    }
  };
  // 目录操作
  const handleItemClick = (key: number, node: any) => {
    if (key === 1) {
      // 新增目录
      setCurrentNode(node.key);
      setModalTitle('新增目录');
      setRecord({ partName: '' });
      setRootModal(true);
      setTodo(true);
    } else if (key === 2) {
      setRecord({ partName: node.name.props.children[2], id: node.key });
      setModalTitle('编辑目录');
      setRootModal(true);
      setTodo(false);
    } else if (key === 3) {
      Modal.confirm({
        title: '你确定要删除这个目录吗?',
        icon: <ExclamationCircleOutlined />,
        content: '删除后，目录下的case也将不再可见！！！',
        okText: '确定',
        okType: 'danger',
        cancelText: '点错了',
        onOk() {
          onDeleteCasePart(node.key);
        },
      });
    }
  };
  // 目录选项
  const content = (node: any) => (
    <AMenu>
      <AMenu.Item key="1">
        <a
          onClick={() => {
            handleItemClick(2, node);
          }}
        >
          <EditOutlined /> 编辑目录
        </a>
      </AMenu.Item>
      <AMenu.Item key="2" danger>
        <a
          onClick={() => {
            handleItemClick(3, node);
          }}
        >
          <DeleteOutlined /> 删除目录
        </a>
      </AMenu.Item>
    </AMenu>
  );

  // 新建目录
  const AddCasePart = (
    <Tooltip title="点击可新建根目录, 子目录需要在树上新建">
      <a
        style={{
          float: 'right',
          marginRight: '20px',
          fontSize: '14px',
          lineHeight: '26px',
        }}
        onClick={() => {
          setRootModal(true);
          setRecord({ partName: '' });
          setModalTitle('新建根目录');
          setCurrentNode(null);
          setTodo(true);
        }}
      >
        <PlusOutlined />
      </a>
    </Tooltip>
  );

  return (
    <PageContainer title={false}>
      {/*<TestResult flag={true} width={1000} caseName={name} />*/}
      {/*<FormForModal title={'移动用例'} fields={moveFields} />*/}
      {projects.length === 0 ? (
        <Result status="404" subTitle={<span>你还没有添加任何项目</span>} />
      ) : (
        <Row gutter={2}>
          <FormForModal
            title={modalTitle}
            onCancel={() => setRootModal(false)}
            fields={fields}
            onFinish={onCreateOrUpdateCasePart}
            record={record}
            visible={rootModal}
            left={6}
            right={18}
            width={400}
            formName="root"
          />
          <RecorderDrawer
            visible={addCaseVisible}
            setVisible={setAddCaseVisible}
          />
          <Col span={6}>
            <Card
              style={{
                height: '100%',
                padding: 24,
                overflowX: 'hidden',
                overflow: 'auto',
              }}
              bordered={false}
              hoverable={true}
            >
              <Row gutter={8}>
                <Col span={24}>
                  <div style={{ height: 40, lineHeight: '40px' }}>
                    {editing ? (
                      <Select
                        style={{ width: 150 }}
                        showSearch
                        allowClear
                        autoFocus={true}
                        defaultValue={projectID}
                        placeholder="请选择项目"
                        onChange={(e: number) => {
                          if (e !== undefined) {
                            changeProject(e);
                          }
                          setEditing(false);
                        }}
                        filterOption={(input, option: any) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        options={projectsOpt}
                      />
                    ) : (
                      <div onClick={() => setEditing(true)}>
                        <span
                          style={{
                            display: 'inline-block',
                            marginLeft: 12,
                            fontWeight: 400,
                            fontSize: 15,
                          }}
                        >
                          {getProject().name}
                        </span>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
              <Card style={{ marginTop: 24 }}>
                {caseParts.length > 0 ? (
                  <SearchTree
                    treeData={caseParts}
                    addCasePart={AddCasePart}
                    menu={content}
                    onSelect={(keys: React.Key[], info: any) => {
                      if (keys[0] != currentCasePart[0]) {
                        setCurrentCasePartID(info.node.key);
                        // @ts-ignore
                        setCurrentPart([keys[0]]);
                      }
                    }}
                    onAddNode={(node: any) => {
                      setCurrentNode(node.key);
                      handleItemClick(1, node);
                    }}
                    selectedKeys={currentCasePart}
                  />
                ) : (
                  <NoRecord
                    height={180}
                    desc={
                      <div>
                        还没有目录，
                        <a
                          onClick={() => {
                            setRootModal(true);
                            setRecord({ partName: '' });
                            setModalTitle('新建根目录');
                            setCurrentNode(null);
                          }}
                        >
                          添加
                        </a>
                        一个吧~
                      </div>
                    }
                  />
                )}
              </Card>
            </Card>
          </Col>

          <Col span={18}>
            <Card
              style={{
                height: '100%',
                overflowX: 'hidden',
                overflow: 'auto',
              }}
              bordered={false}
              hoverable={true}
            >
              {currentCasePartID ? (
                <Row style={{ marginTop: 16 }}>
                  <Col span={24}>
                    <ProTable
                      formRef={ref}
                      editable={{
                        type: 'single',
                      }}
                      rowKey={(record) => record.uid}
                      actionRef={actionRef}
                      // @ts-ignore
                      request={async (param: API.ISearch) => {
                        param.casePartID = currentCasePartID;
                        const res: any = await pageApiCase(param);
                        setCurrentCaseAPI(res.data.items);
                      }}
                      dataSource={currentCaseAPI}
                      rowSelection={{}}
                      pagination={{
                        pageSize: 10,
                      }}
                      columnsState={{
                        persistenceKey: 'pro-table-singe-demos',
                        persistenceType: 'localStorage', //持久化列的类类型， localStorage 设置在关闭浏览器后也是存在的，sessionStorage 关闭浏览器后会丢失 sessionStorage
                      }}
                      cardBordered
                      search={{
                        labelWidth: 'auto',
                        span: 6,
                      }}
                      options={{
                        setting: {
                          listsHeight: 400,
                        },
                        reload: true,
                      }}
                      bordered
                      columns={columns}
                      toolBarRender={() => [
                        <AddApiCase
                          queryCaseApis={queryCaseApis}
                          casePartID={currentCasePartID}
                          projectID={projectID}
                        />,
                      ]}
                    ></ProTable>
                  </Col>
                </Row>
              ) : (
                <Empty
                  imageStyle={{ height: 230 }}
                  description="快选中左侧的目录畅享用例之旅吧~"
                />
              )}
            </Card>
          </Col>
        </Row>
      )}
    </PageContainer>
  );
};

export default CaseApi;
