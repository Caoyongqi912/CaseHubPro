import React, { useEffect, useState } from 'react';
import styles from './baseStyle.less';
import { useModel } from '@@/plugin-model/useModel';
import { Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { uploadAvatar } from '@/api/user';
import { Card, Descriptions } from 'antd';

const { Meta } = Card;

const Avatar = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [fileList, setFileList] = useState([]);
  const [avatarUpdate, setAvatarUpdate] = useState<number>(0);

  const upload: UploadProps = {
    name: 'file',
    maxCount: 1,
    showUploadList: false,
    onRemove: (file: any) => {
      const index = fileList.indexOf(file as never);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    customRequest: async (fileData) => {
      const form = new FormData();
      form.append('file', fileData.file);
      const res = await uploadAvatar(form);
      if (res.code === 0) {
        message.success(res.msg);
        setAvatarUpdate(avatarUpdate + 1);
        return;
      }
    },
  };
  useEffect(() => {
    initialState?.fetchUserInfo?.();
  }, [avatarUpdate]);

  return (
    <>
      <div className={styles.avatar}>
        <img src={currentUser?.avatar} alt="avatar" />
      </div>
      <Upload {...upload}>
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload>
    </>
  );
};

const BaseView: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};

  return (
    <div className={styles.baseView}>
      <div className={styles.left}>
        <Descriptions column={1} size={'middle'} bordered={true}>
          <Descriptions.Item label="UserName">
            {currentUser?.username}
          </Descriptions.Item>
          <Descriptions.Item label="Telephone">
            {currentUser?.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {currentUser?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Department">
            {currentUser?.departmentName}
          </Descriptions.Item>
          <Descriptions.Item label="Tag">
            {currentUser?.tagName}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles.right}>
        <Card style={{ width: 400 }}>
          <Meta avatar={<Avatar />} />
        </Card>
      </div>
    </div>
  );
};

export default BaseView;
