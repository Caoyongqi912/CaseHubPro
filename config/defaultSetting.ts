import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  // 修改左上角的 logo
  logo: '/icons/caseHub.jpg',
  // 设置标题的 title
  title: 'caseHUB',
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixSiderbar: true,
};

export default settings;
