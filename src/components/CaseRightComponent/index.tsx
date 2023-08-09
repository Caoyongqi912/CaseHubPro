import React, { FC, useEffect, useState } from 'react';
import {
  Card,
  Col,
  Menu as AMenu,
  message,
  Modal,
  Result as R,
  Row,
  Select,
  Tooltip,
} from 'antd';
import { API, ResponseAPI } from '@/api';
import { queryProject } from '@/api/project';
import SearchTree from '@/components/Tree/SearchTree';
import NoRecord from '@/pages/Case/CaseAPI/component/NoRecord';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  addCasePart,
  casePartTree,
  delCasePart,
  putCasePart,
} from '@/api/interface';
import FormForModal from '@/components/InterfaceComponent/FormForModal';
import { ProCard } from '@ant-design/pro-components';

interface SelfProps {
  selectedProject: number | undefined;
  setSelectedProject: any;
  setCurrentCasePartID: any;
}

const Index: FC<SelfProps> = (props) => {
  const { selectedProject, setSelectedProject, setCurrentCasePartID } = props;
  const [projects, setProjects] = useState<API.IProject[]>([]);
  const [caseParts, setCaseParts] = useState<ResponseAPI.IQueryPartTree[]>([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [currentCasePart, setCurrentPart] = useState<number[]>([]);
  //modalTitle
  const [modalTitle, setModalTitle] = useState<string>('新建目录');
  //Modal 开关
  const [rootModal, setRootModal] = useState<boolean>(false);
  const [record, setRecord] = useState<API.ICasePart>({});
  const [todo, setTodo] = useState<boolean>(true);

  useEffect(() => {
    queryProject().then(({ code, data }) => {
      if (code === 0 && data?.length) {
        setSelectedProject(data[0].id);
        setProjects(data);
      }
    });
  }, []);

  useEffect(() => {
    listTestcaseTree().catch();
  }, [selectedProject]);

  /** 项目枚举 **/
  const projectsOptions = projects.map((p) => ({ value: p.id, label: p.name }));

  /**
   * 通过projectID 过滤CaseParts
   */
  const listTestcaseTree = async () => {
    if (!selectedProject) {
      return;
    }
    const res = await casePartTree({ projectID: selectedProject });
    setCaseParts(res.data);
    const firstCasePart = res.data?.[0];
    if (firstCasePart) {
      setCurrentCasePartID(firstCasePart.id);
      setCurrentPart([firstCasePart.id]);
    }
  };

  /**
   * 创建或者修改casePart
   * @param value
   */
  const onCreateOrUpdateCasePart = async (value: { partName: string }) => {
    const body: API.ICasePart = {
      projectID: selectedProject,
      parentID: todo ? currentNode || undefined : undefined,
      id: todo ? undefined : record.id,
      partName: value.partName,
    };
    const apiFn = todo ? addCasePart : putCasePart;
    const res = await apiFn(body);
    if (res.code === 0) {
      message.success(res.msg);
      setRootModal(false);
      await listTestcaseTree();
    }
  };

  /**
   * 添加目录按钮
   */
  const AddCasePart = (
    <Tooltip title="点击可新建根目录, 子目录需要在树上新建">
      <a
        style={{
          float: 'right',
          marginLeft: 20,
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
  // 目录操作
  const handleItemClick = (key: number, node: any) => {
    const actions: API.IObjGet = {
      1: () => {
        setCurrentNode(node.key);
        setModalTitle('新增目录');
        setRecord({ partName: '' });
        setRootModal(true);
        setTodo(true);
      },
      2: () => {
        setRecord({ partName: node.name.props.children[2], id: node.key });
        setModalTitle('编辑目录');
        setRootModal(true);
        setTodo(false);
      },
      3: () => {
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
      },
    };
    actions[key]?.();
  };
  // 目录选项
  const content = (node: any) => (
    <AMenu>
      <>
        <AMenu.Item>
          <a onClick={() => handleItemClick(2, node)}>
            <EditOutlined /> 编辑目录
          </a>
        </AMenu.Item>
        <AMenu.Item danger>
          <a onClick={() => handleItemClick(3, node)}>
            <DeleteOutlined /> 删除目录
          </a>
        </AMenu.Item>
      </>
    </AMenu>
  );
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
  //删除用例分组
  const onDeleteCasePart = async (id: number) => {
    const res = await delCasePart({ id: id });
    if (res) {
      await listTestcaseTree();
    }
  };

  return (
    <>
      {projects.length === 0 ? (
        <R status="404" subTitle={<span>你还没有添加任何项目</span>} />
      ) : (
        <>
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
          <ProCard
            style={{
              padding: 2,
            }}
            bordered={false}
            hoverable={true}
          >
            <Row gutter={8}>
              {/*项目*/}
              <Col span={24}>
                <div style={{ height: 40, lineHeight: '40px' }}>
                  {selectedProject ? (
                    <div onClick={() => setSelectedProject(undefined)}>
                      <span
                        style={{
                          display: 'inline-block',
                          marginLeft: 12,
                          fontWeight: 400,
                          fontSize: 15,
                        }}
                      >
                        {projects.find((p) => p.id === selectedProject)?.name}
                      </span>
                    </div>
                  ) : (
                    <Select
                      style={{ width: 150 }}
                      showSearch
                      allowClear
                      autoFocus={true}
                      placeholder="请选择项目"
                      filterOption={(input, option: any) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      options={projectsOptions}
                      onChange={(value: number) => setSelectedProject(value)}
                    />
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
          </ProCard>
        </>
      )}
    </>
  );
};

export default Index;
