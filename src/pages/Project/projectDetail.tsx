import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import { PageContainer } from '@ant-design/pro-components';
import { projectDetailInfo, queryProjectUsers } from '@/api/project';
import { Card, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ProjectRoles from '@/pages/Project/projectRoles';

const ProjectDetail = () => {
  const projectID = useParams();
  const [project, setProject] = useState<API.IProject>({});
  const [users, setUsers] = useState<API.IUser[]>([]);

  const ProjectInfo = async () => {
    const res = await projectDetailInfo(projectID as API.IProject);
    if (res.code === 0) {
      setProject(res.data);
    }
  };

  const ProjectUsers = async () => {
    const res = await queryProjectUsers(projectID as API.IProject);
    if (res.code === 0) {
      setUsers(res.data);
    }
  };

  useEffect(() => {
    ProjectInfo();
    ProjectUsers();
  }, []);

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `用户列表`,
      children: <ProjectRoles detail={project} users={users} />,
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
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
      </Card>
    </PageContainer>
  );
};

export default ProjectDetail;
