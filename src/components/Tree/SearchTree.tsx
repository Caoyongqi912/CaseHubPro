import React, { FC, useState } from 'react';
import { Col, Dropdown, Input, Row, Tree } from 'antd';
import './SearchTree.less';
import {
  FolderTwoTone,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import logo from '@@/plugin-layout/layout/component/logo';

interface SelfProps {
  treeData: Array<any>;
  blockNode: boolean;
  onAddNode: any;
  menu: any;
  selectedKeys: any;
  onSelect: any;
  addDirectory: any;
}

const SearchTree: FC<SelfProps> = ({
  treeData: gData,
  blockNode = true,
  onAddNode,
  menu,
  selectedKeys,
  onSelect,
  addDirectory,
}) => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [nodeKey, setNodeKey] = useState(null);

  const dataList: { id: number; partName: string }[] = [];

  const getParentKey = (id: number, tree: any) => {
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

  const generateList = (data) => {
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
  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onChange = (e) => {
    const { value } = e.target;
    const expandedKeys = dataList
      .map((item) => {
        if (item.partName.indexOf(value) > -1) {
          return getParentKey(item.id, gData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    setExpandedKeys(expandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  const loop = (data) =>
    data.map((item) => {
      console.log('=-=-----', item);
      const index = item.partName.indexOf(searchValue);
      const beforeStr = item.partName.substr(0, index);
      const afterStr = item.partName.substr(index + searchValue.length);
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
        return { name, key: item.id, children: loop(item.children) };
      }

      return {
        name,
        key: item.id,
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
        <Col span={6}>{addDirectory}</Col>
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
        titleRender={(node) => {
          return (
            <div
              onMouseOver={() => setNodeKey(node.id)}
              onMouseLeave={() => setNodeKey(null)}
            >
              {/*<FolderTwoTone className="folder" twoToneColor="rgb(255, 173, 210)"/>*/}
              {/*<FolderCode theme="outline" size="15" className="folder" />*/}
              {node.name}
              {nodeKey === node.key ? (
                <span className="suffixButton">
                  <PlusOutlined
                    onClick={(event) => {
                      event.stopPropagation();
                      onAddNode(node);
                    }}
                    className="left"
                  />
                  <Dropdown overlay={menu(node)} trigger="click">
                    <MoreOutlined
                      className="right"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
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
