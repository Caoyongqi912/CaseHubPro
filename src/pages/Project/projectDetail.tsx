import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import { PageContainer } from '@ant-design/pro-components';
import { projectDetailInfo, queryProjectUsers } from '@/api/project';
import { Card, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ProjectRoles from '@/pages/Project/projectRoles';
import { API } from '@/api';

const ProjectDetail = () => {
  const projectUID = useParams<{ uid: string }>();
  const { uid } = projectUID;
  console.log('=====', uid);
  const [project, setProject] = useState<API.IProject>({});

  const ProjectInfo = async () => {
    const res = await projectDetailInfo({ uid: uid });
    if (res.code === 0) {
      setProject(res.data);
    }
  };

  useEffect(() => {
    ProjectInfo();
  }, []);

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `用户列表`,
      children: <ProjectRoles projectUID={uid} />,
    },
  ];
  return (
    <PageContainer
      onBack={() => {
        window.history.back();
      }}
      title={project.name}
    >
      <Card bodyStyle={{ padding: '8px 18px' }}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </Card>
    </PageContainer>
  );
};

export default ProjectDetail;
