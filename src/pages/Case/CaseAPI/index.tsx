import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Row,
  Drawer,
  Col,
  Select,
  Modal,
  Result,
  Tooltip,
  Menu as AMenu,
  message,
  Card,
  Empty,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import SplitPane, { Props } from 'react-split-pane';
import { queryProject } from '@/api/project';
import FormForModal from '@/components/InterfaceComponent/FormForModal';
import TestResult from '@/components/InterfaceComponent/TestResult';
import AddTestCaseComponent from '@/components/InterfaceComponent/AddTestCaseComponent';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import './caseApiLess.css';
import RecorderDrawer from '@/components/InterfaceComponent/RecorderDrawer';
import columns from '@/pages/Case/CaseAPI/columns';
import AddApiCase from '@/pages/Case/CaseAPI/component/AddApiCase';
import { API } from '@/api';
import SearchTree from '@/components/Tree/SearchTree';
import NoRecord from '@/pages/Case/CaseAPI/component/NoRecord';
import {
  addCasePart,
  casePartTree,
  delCasePart,
  putCasePart,
  queryApiCaseByCasePartID,
} from '@/api/interface';

const { Option } = Select;

const SplitProps: Props = {
  className: 'caseSplit',
  split: 'vertical',
  minSize: 100,
  maxSize: -100,
  defaultSize: '10%',
};

const Index: FC = (props) => {
  const [addCaseVisible, setAddCaseVisible] = useState(false);
  const [caseParts, setCaseParts] = useState<API.ICasePartResponse[]>([]);
  const [projects, setProject] = useState<API.IProject[]>([]);
  const [projectID, setProjectID] = useState<number>(0);
  const [projectName, setProjectName] = useState<string>('');
  const [editing, setEditing] = useState<boolean>(false);
  const [todo, setTodo] = useState<boolean>(true);
  //modalTitle
  const [modalTitle, setModalTitle] = useState<string>('新建目录');
  //Modal 开关
  const [rootModal, setRootModal] = useState<boolean>(false);
  const [record, setRecord] = useState<API.ICasePart>({});
  const [name, setName] = useState('');
  const [currentNode, setCurrentNode] = useState(null);
  const [currentCasePartID, setCurrentCasePartID] = useState(null);
  const [currentCasePart, setCurrentPart] = useState<API.ICasePart[]>([]);
  const [currentCaseAPI, setCurrentCaseAPI] = useState([]);
  const actionRef = useRef<ActionType>(); //Table action 的引用，便于自定义触发

  useEffect(() => {
    queryProjects();
  }, []);
  useEffect(() => {
    listTestcaseTree();
  }, [projectID, projectName]);

  useEffect(() => {
    queryCaseApis();
  }, [currentCasePartID]);

  /**
   * 查询所有项目
   * 存储第一个项目id与name
   */
  const queryProjects = async () => {
    const { data } = await queryProject();
    if (data) {
      setProject(data);
      setProjectID(data[0].id!);
      setProjectName(data[0].name!);
    }
  };
  const getProject = () => {
    if (projects.length === 0) {
      return 'loading...';
    }
    const filter_project: API.IProject[] = projects.filter(
      (p) => p.id === projectID,
    );
    if (filter_project.length === 0) {
      // save({ project_id: projects[0].id });
      return projects[0];
    }
    return filter_project[0];
  };

  /**
   * 创建casePart
   * @param value
   */
  const onCreateOrUpdateCasePart = async (value: any) => {
    console.log('todo', todo);
    console.log('value', value);
    console.log('record', record);
    console.log('currentNode', currentNode);
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

  const queryCaseApis = async () => {
    if (currentCasePartID) {
      const res = await queryApiCaseByCasePartID({
        casePartID: currentCasePartID,
      });
      console.log(res.data);
      setCurrentCaseAPI(res.data);
    }
  };

  const moveFields = [
    {
      name: 'directory_id',
      label: '目标目录',
      required: true,
      placeholder: '请选择要移动到的目录',
      type: 'select',
      // component: <TreeSelect treeData={directory} showSearch treeDefaultExpandAll/>
    },
  ];
  const isReload = (value: boolean) => {
    if (value) {
      actionRef.current?.reload();
    }
  };

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

  const saveCase = (data) => {};
  const save = (data) => {
    // localStorage.setItem("project_id", data.project_id)
  };
  /**
   * 通过projectID 过滤CaseParts
   */
  const listTestcaseTree = async () => {
    if (projectID) {
      const res = await casePartTree({ projectID: projectID });
      setCaseParts(res.data);
      return;
    }
  };
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
      setCurrentNode(node.id);
      setModalTitle('新增目录');
      setRecord({ partName: '' });
      setRootModal(true);
      setTodo(true);
    } else if (key === 2) {
      setRecord({ partName: node.name.props.children[2], id: node.id });
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
          onDeleteCasePart(node.id);
        },
      });
    }
  };
  // menu
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

  const AddCasePart = (
    <Tooltip title="点击可新建根目录, 子目录需要在树上新建">
      <a
        className="casePartAddButton"
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
        <Row gutter={8}>
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
          <Drawer
            bodyStyle={{ padding: 0 }}
            visible={addCaseVisible}
            width={1300}
            title="添加用例"
            onClose={() => setAddCaseVisible(false)}
            maskClosable={false}
          >
            <AddTestCaseComponent />
          </Drawer>
          <RecorderDrawer
            visible={addCaseVisible}
            setVisible={setAddCaseVisible}
          />
          <SplitPane {...SplitProps}>
            <Card
              style={{
                height: 1000,
                padding: 24,
                overflowX: 'hidden',
                overflow: 'auto',
              }}
            >
              <Row gutter={8}>
                {/*项目*/}
                <Col span={24}>
                  <div style={{ height: 40, lineHeight: '40px' }}>
                    {editing ? (
                      <Select
                        style={{ marginLeft: 32, width: 150 }}
                        showSearch
                        allowClear
                        autoFocus={true}
                        value={projectName}
                        placeholder="请选择项目"
                        onChange={(e) => {
                          if (e !== undefined) {
                            save({ projectID: e });
                          }
                          setEditing(false);
                        }}
                        filterOption={(input, option: any) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {projects.map((value) => (
                          <Option key={value.uid}>{value.name} </Option>
                        ))}
                      </Select>
                    ) : (
                      <div onClick={() => setEditing(true)}>
                        <span
                          style={{
                            display: 'inline-block',
                            marginLeft: 12,
                            fontWeight: 400,
                            fontSize: 14,
                          }}
                        >
                          {getProject().name}
                        </span>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
              {/*目录*/}
              <Card style={{ marginTop: 24 }}>
                {caseParts.length > 0 ? (
                  <SearchTree
                    setTodo={setTodo}
                    treeData={caseParts}
                    addCasePart={AddCasePart}
                    menu={content}
                    onSelect={(keys: React.Key[], info: any) => {
                      setCurrentCasePartID(info.node.id);
                    }}
                    onAddNode={(node: any) => {
                      setCurrentNode(node.id);
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

            <Card
              style={{ height: 1000, overflowX: 'hidden', overflow: 'auto' }}
            >
              {currentCasePartID ? (
                <Row style={{ marginTop: 16 }}>
                  <Col span={24}>
                    <ProTable
                      editable={{
                        type: 'single',
                      }}
                      rowKey={(record) => record.uid}
                      actionRef={actionRef}
                      dataSource={currentCaseAPI}
                      rowSelection={{}}
                      pagination={{
                        pageSize: 10,
                      }}
                      columnsState={{
                        persistenceKey: 'pro-table-singe-demos',
                        persistenceType: 'localStorage', //持久化列的类类型， localStorage 设置在关闭浏览器后也是存在的，sessionStorage 关闭浏览器后会丢失 sessionStorage
                        onChange(value) {
                          console.log('value: ', value);
                        },
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
                          casePartID={currentCasePartID}
                          projectID={projectID}
                          isReload={isReload}
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
          </SplitPane>
        </Row>
      )}
    </PageContainer>
  );
};

export default Index;
