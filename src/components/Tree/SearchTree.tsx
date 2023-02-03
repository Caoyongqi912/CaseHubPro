import React, { FC, Key, useState } from 'react';
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
  onAddNode: any;
  menu: Function;
  selectedKeys: any;
  onSelect: any;
  addCasePart: any;
}

const SearchTree: FC<SelfProps> = ({
  treeData: gData,
  onAddNode,
  menu,
  selectedKeys,
  onSelect,
  addCasePart,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [nodeKey, setNodeKey] = useState<any>(null);

  const dataList: { id: number; partName: string }[] = [];

  const getParentKey = (id: number, tree: any): API.ITreeNode['key'] => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item: any) => item.key === id)) {
          parentKey = node.key;
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
  const onExpand = (expandedKeys: Key[]) => {
    setExpandedKeys(expandedKeys);
    //关闭自动展开父节点
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

  const loop: any = (data: API.ICasePartResponse[]) =>
    data.map((item) => {
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
        return { name, key: item.id, children: loop(item.children) };
      }
      return {
        name,
        key: item.id,
      };
    });

  return (
    <>
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
        onExpand={onExpand} //展开/收起节点时触发
        blockNode={true} //是否节点占据一行
        selectedKeys={selectedKeys} //（受控）设置选中的树节点
        onSelect={onSelect} //点击树节点触发
        expandedKeys={expandedKeys} //（受控）展开指定的树节点
        autoExpandParent={autoExpandParent} //是否自动展开父节点
        treeData={loop(gData)} //treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一）
        titleRender={(node: any) => {
          return (
            <div
              onMouseOver={() => setNodeKey(node.key)}
              onMouseLeave={() => setNodeKey(null)}
            >
              <FolderTwoTone
                className="folder"
                twoToneColor="rgb(255, 173, 210)"
              />
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
                  <Dropdown overlay={menu(node)} trigger={['click']}>
                    <MoreOutlined className="right" />
                  </Dropdown>
                </span>
              ) : null}
            </div>
          );
        }}
      />
    </>
  );
};

export default SearchTree;
