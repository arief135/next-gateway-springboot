import { Table, TableColumn, TableRow, TableCell } from "@ui5/webcomponents-react";
import { useQuery } from "react-query";
import { getUsers } from "../../services/User.service";
import { ListContainer } from "../common/ListContainer";

function UserTable() {

    const query = useQuery({
        queryKey: 'user',
        queryFn: getUsers
    })

    if (query.isSuccess) {
        return (
            <Table
                columns={
                    <>
                        <TableColumn style={{ width: '12rem' }}><span>Username</span></TableColumn>
                        <TableColumn minWidth={800} popinText="Supplier"><span>Last Logged In</span></TableColumn>
                        <TableColumn demandPopin minWidth={600} popinText="Dimensions"><span>Status</span></TableColumn>
                    </>}
                onLoadMore={function _a() { }}
                onPopinChange={function _a() { }}
                onRowClick={function _a() { }}
                onSelectionChange={function _a() { }}
            >
                {query.data.map((e: any) =>
                    <TableRow key={e.username}>
                        <TableCell>
                            <span>
                                {e.username}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span>
                                {e.lastLoggedIn}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span>
                                {e.active}
                            </span>
                        </TableCell>
                    </TableRow>
                )}
            </Table>
        )
    }
}

export function User() {
    return (
        <ListContainer
            title="Users"
            subtitle="List of all users"
            content={<UserTable />}
        />
    )
}