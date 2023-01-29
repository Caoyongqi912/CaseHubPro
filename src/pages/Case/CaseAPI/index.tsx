import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Row,
  Drawer,
  Col,
  Select,
  Modal,
  Result,
  Tooltip,
  Dropdown,
  Menu as AMenu,
  Spin,
} from 'antd';
import {
  PlusOutlined,
  RocketOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
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
import { casePartTree } from '@/api/interface';

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
  const [caseParts, setCaseParts] = useState<API.ICasePart[]>([]);
  const [projects, setProject] = useState<API.IProject[]>([]);
  const [projectID, setProjectID] = useState<number>(0);
  const [editing, setEditing] = useState(false);
  const [modalTitle, setModalTitle] = useState('新建目录');
  const [rootModal, setRootModal] = useState(false);
  const [record, setRecord] = useState({});
  const [name, setName] = useState('');
  const [currentNode, setCurrentNode] = useState(null);
  const [currentDirectory, setCurrentDirectory] = useState([]);
  const actionRef = useRef<ActionType>(); //Table action 的引用，便于自定义触发
  useEffect(() => {
    queryProjects();
  }, []);
  useEffect(() => {
    listTestcaseTree();
  }, [projectID]);
  const queryProjects = async () => {
    const { data } = await queryProject();
    if (data) {
      setProject(data);
      setProjectID(data[0].id!);
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
  const onCreateDirectory = () => {};
  const AddCaseMenu = (
    <AMenu>
      <AMenu.Item key="1">
        <a
          onClick={() => {
            // onAddTestCase();
          }}
        >
          <RocketOutlined /> 普通用例
        </a>
      </AMenu.Item>
    </AMenu>
  );
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
  const fields = [
    {
      name: 'name',
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
  const listTestcaseTree = async () => {
    if (projectID) {
      const res = await casePartTree({ projectID: projectID });
      setCaseParts(res.data);
      return;
    }
  };
  const onDeleteDirectory = async (key) => {
    const res = null;
    if (res) {
      listTestcaseTree();
    }
  };
  const handleItemClick = (key, node) => {
    if (key === 1) {
      // 新增目录
      setCurrentNode(node.key);
      setModalTitle('新增目录');
      setRecord({ name: '' });
      setRootModal(true);
    } else if (key === 2) {
      setRecord({ name: node.title.props.children[2], id: node.key });
      setModalTitle('编辑目录');
      setRootModal(true);
    } else if (key === 3) {
      Modal.confirm({
        title: '你确定要删除这个目录吗?',
        icon: <ExclamationCircleOutlined />,
        content: '删除后，目录下的case也将不再可见！！！',
        okText: '确定',
        okType: 'danger',
        cancelText: '点错了',
        onOk() {
          onDeleteDirectory(node.key);
        },
      });
    }
  };
  // menu
  const content = (node) => (
    <AMenu>
      <AMenu.Item key="1">
        <a
          onClick={(e) => {
            e.stopPropagation();
            handleItemClick(2, node);
          }}
        >
          <EditOutlined /> 编辑目录
        </a>
      </AMenu.Item>
      <AMenu.Item key="2" danger>
        <a
          onClick={(e) => {
            e.stopPropagation();
            handleItemClick(3, node);
          }}
        >
          <DeleteOutlined /> 删除目录
        </a>
      </AMenu.Item>
    </AMenu>
  );

  const AddDirectory = (
    <Tooltip title="点击可新建根目录, 子目录需要在树上新建">
      <a
        className="directoryButton"
        onClick={() => {
          setRootModal(true);
          setRecord({ name: '' });
          setModalTitle('新建根目录');
          setCurrentNode(null);
        }}
      >
        <PlusOutlined />
      </a>
    </Tooltip>
  );
  return (
    <PageContainer title={false} style={{ margin: -8 }}>
      <TestResult flag={true} width={1000} caseName={name} />
      <FormForModal title={'移动用例'} fields={moveFields} />
      {projects.length === 0 ? (
        <Result status="404" subTitle={<span>你还没有添加任何项目</span>} />
      ) : (
        <Row gutter={1}>
          <FormForModal
            title={modalTitle}
            onCancel={() => setRootModal(false)}
            fields={fields}
            onFinish={onCreateDirectory}
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
            <div className={'card'}>
              <Row gutter={8}>
                <Col span={24}>
                  <div style={{ height: 40, lineHeight: '40px' }}>
                    {editing ? (
                      <Select
                        style={{ marginLeft: 32, width: 150 }}
                        showSearch
                        allowClear
                        autoFocus={true}
                        value={projectID}
                        placeholder="请选择项目"
                        onChange={(e) => {
                          if (e !== undefined) {
                            save({ projectID: e });
                          }
                          setEditing(false);
                        }}
                        filterOption={(input, option) =>
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
              <div style={{ marginTop: 24 }}>
                {caseParts.length > 0 ? (
                  <SearchTree
                    treeData={caseParts}
                    addDirectory={AddDirectory}
                    menu={content}
                    onSelect={(keys) => {
                      saveCase({
                        currentDirectory:
                          keys[0] === currentDirectory[0] ? [] : keys,
                        selectedRowKeys: [],
                      });
                    }}
                    onAddNode={(node) => {
                      setCurrentNode(node.key);
                      handleItemClick(1, node);
                    }}
                    selectedKeys={currentDirectory}
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
                            setRecord({ name: '' });
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
              </div>
            </div>

            <div className={'card'}>
              <Row style={{ marginTop: 16 }}>
                <Col span={24}>
                  <ProTable
                    editable={{
                      type: 'single',
                    }}
                    rowKey={(record) => record.uid}
                    actionRef={actionRef}
                    cardBordered
                    bordered
                    columns={columns}
                    toolBarRender={() => [<AddApiCase />]}
                  ></ProTable>
                </Col>
              </Row>
            </div>
          </SplitPane>
        </Row>
      )}
    </PageContainer>
  );
};

export default Index;
