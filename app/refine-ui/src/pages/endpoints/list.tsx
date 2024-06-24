import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { useMany, type BaseRecord } from "@refinedev/core";
import { Space, Table } from "antd";

export const EndpointList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    pagination: {
      mode: "client"
    }
  });

  return (
    <List>
      <Table {...tableProps} rowKey="name">
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column dataIndex="type" title={"Type"} />
        <Table.Column dataIndex="active" title={"Status"} render={v => v == true ? 'Active' : 'Not active'} />
        <Table.Column
          dataIndex={["createdAt"]}
          title={"Created at"}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["createdBy"]}
          title={"Created by"}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.name} />
              <ShowButton hideText size="small" recordItemId={record.name} />
              <DeleteButton hideText size="small" recordItemId={record.name} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
