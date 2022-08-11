import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { useRef } from "react";
import NewProject from "@/components/NewProject";
import { pageProject } from "@/api/project";
import columns from "@/pages/Project/columns";


export default () => {
  const actionRef = useRef<ActionType>(); //Table action 的引用，便于自定义触发
  const getProjectPage = async () => {
    const response = await pageProject({ pageSize: 1, current: 10 }).then(
      res => {
        return {
          data: res.data.items,
          total: res.data.pageInfo.total,
          success: res.msg,
          pageSize: res.data.pageInfo.page,
          current: res.data.pageInfo.limit

        };
      }
    ).catch(error => console.log(error));
    return Promise.resolve(response);
  };

  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      cardBordered
      // @ts-ignore
      request={getProjectPage}
      editable={{ //可编辑表格的相关配置
        type: "multiple" //https://procomponents.ant.design/components/editable-table#editable-%E7%BC%96%E8%BE%91%E8%A1%8C%E9%85%8D%E7%BD%AE
      }}
      columnsState={{
        persistenceKey: "pro-table-singe-demos",
        persistenceType: "localStorage", //持久化列的类类型， localStorage 设置在关闭浏览器后也是存在的，sessionStorage 关闭浏览器后会丢失 sessionStorage
        onChange(value) {
          console.log("value: ", value);
        }
      }}
      rowKey="id"
      search={{
        labelWidth: "auto"
      }}
      options={{
        setting: {
          listsHeight: 400
        },
        reload: true
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === "get") {
            return {
              ...values,
              created_at: [values.startTime, values.endTime]
            };
          }
          return values;
        }
      }}
      pagination={{
        pageSize: 4,
        onChange: (page) => console.log(page)
      }}
      dateFormatter="string"
      headerTitle="Project List"
      toolBarRender={() => [
        <NewProject />
      ]}
    />
  );
};
