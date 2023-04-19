import React, { useEffect, useState } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormRadio,
  ProFormCheckbox,
  ProFormSelect,
} from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { getPerfSetting } from '@/api/cbs';
import { Card, Radio } from 'antd';
import { Loading } from '@icon-park/react';

const Index = () => {
  const [form] = ProForm.useForm();
  const [city, setCity] = useState('bj');
  const [currentSetInfoID, setCurrentSetInfoID] = useState(0);
  const [DEPTID_OPT, SET_DEPTID_OPT] =
    useState<{ label: number; value: number }[]>();
  const [loading, setLoading] = useState(true);
  const [respData, setRespData] = useState<any>();
  const [perfSetting, SetPerfSetting] = useState();
  useEffect(() => {
    setLoading(true);
    getPerfSetting({ city: city }).then(({ code, data }) => {
      if (code === 0) {
        setRespData(data);
        const SET_INFO_ID_OPT = data.map(({ DEPTID }) => ({
          label: DEPTID,
          value: DEPTID,
        }));
        SET_DEPTID_OPT(SET_INFO_ID_OPT);
        setCurrentSetInfoID(0);
        SetPerfSetting(data[0]);
        setLoading(false);
      }
    });
  }, [city]);

  if (loading) {
    return <Loading title={'加载中'} />;
  }
  const currentIdChange = (value: any) => {
    const targetItem = respData!.find(
      ({ DEPTID }) => DEPTID == value.target.value,
    );
    form.setFieldsValue(targetItem);
  };

  const cityChange = (value: any) => {
    setCity(value.target.value);
  };
  return (
    <PageContainer title={false}>
      <ProForm form={form} layout={'horizontal'} initialValues={perfSetting}>
        <Card>
          <ProForm.Group title={'城市选择'}>
            <Radio.Group
              defaultValue={city}
              onChange={cityChange}
              options={[
                {
                  label: '北京',
                  value: 'bj',
                },
                {
                  label: '杭州',
                  value: 'hz',
                },
                {
                  label: '南京',
                  value: 'nj',
                },
              ]}
            />
          </ProForm.Group>
          <ProForm.Group title={'部门ID'} style={{ marginTop: 10 }}>
            <Radio.Group
              options={DEPTID_OPT}
              name={'DEPTID'}
              defaultValue={DEPTID_OPT![currentSetInfoID].value}
              onChange={currentIdChange}
            />
          </ProForm.Group>
          <ProForm.Group style={{ marginTop: 10 }}>
            <ProFormText
              name={'COMPANYID'}
              addonBefore={'公司ID'}
              style={{ width: '10', marginTop: 20 }}
              readonly={true}
            />
            <ProFormSelect
              name={'STATUS'}
              options={[
                { label: '执行中', value: 2 },
                { label: '无效', value: 3 },
                {
                  label: '待执行',
                  value: 1,
                },
              ]}
              style={{ marginTop: 20 }}
              readonly={true}
            />

            <ProFormRadio.Group
              name={'BUSINESSTYPE'}
              options={[
                { label: '买卖', value: 2 },
                { label: '租赁', value: 1 },
              ]}
            />
          </ProForm.Group>
        </Card>

        <Card>
          <ProForm.Group title={'计算比例得方式'}>
            <ProFormRadio.Group
              name={'CALPERCENTWAY'}
              options={[
                { label: '计算比例', value: 2 },
                { label: '默认比例', value: 1 },
              ]}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProForm.Group
              title={'用途为车位或者法拍时是否产生维护人业绩'}
              labelLayout={'inline'}
            >
              <ProFormRadio.Group
                name={'PARKINGORAUCTION'}
                options={[
                  { label: '否', value: 2 },
                  { label: '是', value: 1 },
                ]}
              />
            </ProForm.Group>
            <ProForm.Group title={'维护人离职业绩处理'}>
              <ProFormRadio.Group
                name={'USERLEAVE'}
                options={[
                  { label: '给成交人', value: 2 },
                  { label: '充公', value: 1 },
                ]}
              />
            </ProForm.Group>
          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              addonBefore={'房源维护总分'}
              name={'MAINTAINTOTAL'}
              style={{ width: '10', marginTop: 20 }}
            />
            <ProFormText
              addonBefore={'价格取值时间'}
              name={'COUNTSTANDARDHOURS'}
              style={{ width: '10', marginTop: 20 }}
            />
            <ProFormText
              addonBefore={'房源分达标分业绩比例百分比'}
              name={'HOUSESCOREGETPERF'}
              style={{ width: '10', marginTop: 20 }}
            />
            <ProFormText
              addonBefore={'溢价偏离度达标分业绩比例'}
              name={'BARGADEVGEARGETPERF'}
              style={{ width: '10', marginTop: 20 }}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProForm.Group title={'是否启用房源维护总分'}>
              <ProFormRadio.Group
                name={'MAINTAINTOTALFLAG'}
                options={[
                  { label: '否', value: 2 },
                  { label: '是', value: 1 },
                ]}
              />
            </ProForm.Group>

            <ProForm.Group title={'是否启用计算基准价'}>
              <ProFormRadio.Group
                name={'COUNTSTANDARDFLAG'}
                options={[
                  { label: '否', value: 2 },
                  { label: '是', value: 1 },
                ]}
              />
            </ProForm.Group>
            <ProForm.Group title={'是否启用 报成交前（）小时维护人'}>
              <ProFormRadio.Group
                name={'DEALBEFORE_TIMEFLAG'}
                options={[
                  { label: '否', value: 2 },
                  { label: '是', value: 1 },
                ]}
              />
            </ProForm.Group>
          </ProForm.Group>
        </Card>
        <Card>
          <ProForm.Group title={'议价偏离度考核'} style={{ marginTop: 20 }} />
          <ProFormRadio.Group
            name="BEGEARGEAR_SWITCH"
            options={[
              {
                label: '开',
                value: 1,
              },
              {
                label: '关',
                value: 0,
              },
            ]}
          />
          <ProFormCheckbox width={'xl'} name="ARGUEHOUSEINPUTFLAG">
            <ProFormText
              addonBefore={'议价偏离度生成维护业绩要满足房源录入时间实在成交'}
              addonAfter={'小时前'}
              name={'ARGUEHOUSEINPUT'}
            />
          </ProFormCheckbox>
          <ProFormText
            name={'COUNTSTANDARDHOURS'}
            addonBefore={'价格取值时间'}
            addonAfter={'小时以前'}
          />

          <ProForm.Group title={'计算基准'}>
            <ProFormRadio.Group
              name={'COUNTSTANDARD'}
              options={[
                {
                  label: '低价',
                  value: 1,
                },
                {
                  label: '挂牌价',
                  value: 2,
                },
              ]}
            />
          </ProForm.Group>
        </Card>
      </ProForm>
    </PageContainer>
  );
};

export default Index;
