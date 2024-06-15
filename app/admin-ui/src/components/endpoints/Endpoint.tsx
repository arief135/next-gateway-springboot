import {
    Table,
    TableColumn,
    TableRow,
    TableCell,
    Button,
    DynamicPage,
    DynamicPageHeader,
    DynamicPageTitle,
    FlexBox,
    Label,
    Title,
} from "@ui5/webcomponents-react";
import { useQuery } from "react-query";
import { getEndpoints } from "../../services/Endpoint.service";
import { useNavigate } from "react-router-dom";
import { ListContainer } from "../common/ListContainer";

export function Endpoint() {

    return (
        <ListContainer 
            title="Endpoints"
            subtitle="List of available endpoints"
            content={<EndpointTable />} />
    )
}

function EndpointTable() {
    const query = useQuery({
        queryKey: "endpoint",
        queryFn: getEndpoints,
    });

    if (query.isSuccess) {
        return (
            <Table
                columns={
                    <>
                        <TableColumn style={{ width: "12rem" }}>
                            <span>Name</span>
                        </TableColumn>
                        <TableColumn minWidth={800} popinText="Supplier">
                            <span>Created By</span>
                        </TableColumn>
                        <TableColumn demandPopin minWidth={600} popinText="Dimensions">
                            <span>Created On</span>
                        </TableColumn>
                    </>
                }
                onLoadMore={function _a() { }}
                onPopinChange={function _a() { }}
                onRowClick={function _a() { }}
                onSelectionChange={function _a() { }}
            >
                {query.data.map((e: any) => (
                    <TableRow key={e.name}>
                        <TableCell>
                            <span>{e.name}</span>
                        </TableCell>
                        <TableCell>
                            <span>{e.createdBy}</span>
                        </TableCell>
                        <TableCell>
                            <span>{e.createdOn}</span>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
        );
    }
}
