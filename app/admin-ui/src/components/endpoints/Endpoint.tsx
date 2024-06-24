import {
    Table,
    TableColumn,
    TableRow,
    TableCell,
} from "@ui5/webcomponents-react";
import { useQuery } from "react-query";
import { getEndpoints } from "../../services/Endpoint.service";
import { ListContainer } from "../common/ListContainer";
import { Endpoint } from "../../types";

export function Endpoints() {

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
                        <TableColumn style={{ width: "12rem" }}>
                            <span>Type</span>
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
                {query.data.map((e: Endpoint) => (
                    <TableRow key={e.name}>
                        <TableCell>
                            <span>{e.name}</span>
                        </TableCell>
                        <TableCell>
                            <span>{e.type}</span>
                        </TableCell>
                        <TableCell>
                            <span>{e.createdBy}</span>
                        </TableCell>
                        <TableCell>
                            <span>{e.createAt.toString()}</span>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
        );
    }
}
