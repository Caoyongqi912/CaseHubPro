import React, { useEffect, useState } from 'react';
import { Avatar, List } from 'antd';
import ProjectAddUser from '@/pages/Project/projectAddUser';

interface IProjectDetail {
  detail: API.IProject;
  users: API.IUser[];
}

interface Items {
  title: string;
  avatar: string;
  description: string;
}

const ProjectRoles: React.FC<IProjectDetail> = (props) => {
  let { detail, users } = props;
  const [us, setUs] = useState<Items[]>([]);
  const dealUsers = () => {
    let u: Items[] = [];
    users.forEach((items) => {
      let _ = {
        title: items.username + ' / ' + items.email,
        avatar: 'http://localhost:5000/api/file/avatar?uid=' + items.avatar,
        description: items.departmentName + '/' + items.tagName,
      };
      u.push(_);
    });
    setUs(u);
  };

  useEffect(() => {
    dealUsers();
  }, [users]);
  return (
    <>
      <ProjectAddUser UID={detail.uid!} />
      <br />
      <br />
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={us}
        renderItem={(item: Items) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar alt={item.avatar} src={item.avatar} />}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      ></List>
    </>
  );
};

export default ProjectRoles;
