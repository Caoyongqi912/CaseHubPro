import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  // 修改左上角的 logo
  logo: '/icons/caseHub.jpg',
  // 设置标题的 title
  title: 'caseHUB',
  layout: 'mix',
  menu: {
    type: 'sub',
  },
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
};

export default settings;
