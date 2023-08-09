import { Statistic, StatisticCard } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import RcResizeObserver from 'rc-resize-observer';
import { countInfo } from '@/api/cbs';
import { Pie } from '@ant-design/plots';

const { Divider } = StatisticCard;

interface IInfo {
  create_time?: string;
  failNum: number;
  id?: number;
  successNum: number;
  today?: string;
  uid?: string;
  update_time?: string;
}

export default function IndexPage() {
  const [responsive, setResponsive] = useState(false);
  const [info, setInfo] = useState<IInfo>({
    successNum: 0,
    failNum: 0,
  });
  const PieData = [
    {
      type: '成功',
      value: info.successNum,
    },
    {
      type: '失败',
      value: info.failNum,
    },
  ];
  const PieConfig = {
    height: 110,
    appendPadding: 5,
    data: PieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  // const fetchIndexInfo = async () => {
  //   const { code, data } = await countInfo();
  //   if (code === 0) {
  //     setInfo(data);
  //   }
  // };
  // useEffect(() => {
  //   fetchIndexInfo();
  // }, []);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
        <StatisticCard
          statistic={{
            title: '总构次数',
            value: info.failNum + info.successNum,
            description: <Statistic title="日期" value={info.today} />,
          }}
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard
          statistic={{
            title: '成功',
            value: info.successNum,
            description: (
              <Statistic
                title="占比"
                value={
                  info.successNum === 0
                    ? '0%'
                    : `${(
                        ((info.successNum + info.failNum) / info.successNum) *
                        100
                      ).toFixed(2)}%`
                }
              />
            ),
          }}
          chartPlacement="left"
        />
        <StatisticCard
          statistic={{
            title: '失败',
            value: info.failNum,
            description: (
              <Statistic
                title="占比"
                value={
                  info.failNum === 0
                    ? '0%'
                    : `${(
                        ((info.successNum + info.failNum) / info.failNum) *
                        100
                      ).toFixed(2)}%`
                }
              />
            ),
          }}
          chartPlacement="left"
        />
        <Divider type={responsive ? 'horizontal' : 'vertical'} />
        <StatisticCard chart={<Pie {...PieConfig} />} />
      </StatisticCard.Group>
    </RcResizeObserver>
  );
}
