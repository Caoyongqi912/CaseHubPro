import React, { FC } from 'react';
import { Card } from 'antd';
import PostmanBody from '@/pages/Case/CaseAPI/component/Postman/PostmanBody';

interface SelfProps {
  form: any;
  body: string;
  bodyType: number;
  setBody: any;
  setBodyType: any;
  headers: Array<any>;
  setHeaders: any;
  formData: Array<any>;
  setFromData: any;
}

const PostmanForm: FC<SelfProps> = (props, context) => {
  return (
    <Card bordered={false}>
      <PostmanBody {...props} />
    </Card>
  );
};

export default PostmanForm;
