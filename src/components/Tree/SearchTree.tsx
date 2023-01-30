import React, { FC, useState } from 'react';
import { Col, Dropdown, Input, Row, Tree } from 'antd';
import './SearchTree.less';
import {
  FolderTwoTone,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { API } from '@/api';

interface SelfProps {
  treeData: API.ICasePartResponse[];
  blockNode?: boolean;
  onAddNode: any;
  menu: Function;
  selectedKeys: any;
  onSelect: any;
  addCasePart: any;
  setTodo: any;
}

const SearchTree: FC<SelfProps> = ({
  treeData: gData,
  blockNode = true,
  onAddNode,
  menu,
  selectedKeys,
  onSelect,
  addCasePart,
  setTodo,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<Array<string>>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [nodeKey, setNodeKey] = useState<any>(null);

  const dataList: { id: number; partName: string }[] = [];

  const getParentKey = (
    id: number,
    tree: API.ITreeNode[],
  ): API.ITreeNode['id'] => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.id === id)) {
          parentKey = node.id;
        } else if (getParentKey(id, node.children)) {
          parentKey = getParentKey(id, node.children);
        }
      }
    }
    return parentKey;
  };

  const generateList = (data: API.ICasePartResponse[]) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { id, partName } = node;
      dataList.push({ id, partName });
      if (node.children) {
        generateList(node.children);
      }
    }
  };

  generateList(gData);

  //展开/收起节点时触发
  const onExpand = (expandedKeys: any) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = (e: any) => {
    const { value } = e.target;
    const expandedKeys = dataList
      .map((item) => {
        if (item.partName.indexOf(value) > -1) {
          return getParentKey(item.id, gData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(expandedKeys as any);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const loop = (data: any) =>
    data.map((item: API.ICasePartResponse) => {
      const index = item.partName.indexOf(searchValue);
      const beforeStr = item.partName.substring(0, index);
      const afterStr = item.partName.substring(index + searchValue.length);
      const name =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.partName}</span>
        );
      if (item.children) {
        return { name, id: item.id, children: loop(item.children) };
      }
      return {
        name,
        id: item.id,
      };
    });

  return (
    <div>
      <Row gutter={8}>
        <Col span={18}>
          <Input
            size="small"
            className="treeSearch"
            placeholder="输入要查找的目录"
            onChange={onChange}
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col span={6}>{addCasePart}</Col>
      </Row>
      <Tree
        onExpand={onExpand}
        defaultExpandAll
        blockNode={blockNode}
        selectedKeys={selectedKeys}
        onSelect={onSelect}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={loop(gData)}
        titleRender={(node: any) => {
          return (
            <div
              onMouseOver={() => setNodeKey(node.id)}
              onMouseLeave={() => setNodeKey(null)}
            >
              <FolderTwoTone
                className="folder"
                twoToneColor="rgb(255, 173, 210)"
              />
              {node.name}
              {nodeKey === node.id ? (
                <span className="suffixButton">
                  <PlusOutlined
                    onClick={(event) => {
                      event.stopPropagation();
                      onAddNode(node);
                    }}
                    className="left"
                  />
                  <Dropdown overlay={menu(node)} trigger={['click']}>
                    <MoreOutlined className="right" />
                  </Dropdown>
                </span>
              ) : null}
            </div>
          );
        }}
      />
    </div>
  );
};

export default SearchTree;
