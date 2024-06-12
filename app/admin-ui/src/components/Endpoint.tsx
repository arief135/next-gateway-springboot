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
    FormGroup,
    FormItem,
    Input,
    Form,
    Bar,
    Breadcrumbs,
    BreadcrumbsItem,
    ObjectPage,
    ObjectPageSection,
    Ui5CustomEvent,
    InputDomRef,
} from "@ui5/webcomponents-react";
import { useQuery } from "react-query";
import { createEndpoint, getEndpoints } from "../services/Endpoint.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EndpointType } from "../types";

export function Endpoint() {
    const navigate = useNavigate();

    return (
        <DynamicPage
            headerContent={
                <DynamicPageHeader>
                    <FlexBox wrap="Wrap"></FlexBox>
                </DynamicPageHeader>
            }
            headerTitle={
                <DynamicPageTitle
                    actions={
                        <>
                            <Button design="Emphasized" onClick={() => navigate("create")}>
                                Create
                            </Button>
                        </>
                    }
                    header={<Title>Endpoints</Title>}
                    subHeader={<Label>List of available endpoints</Label>}
                ></DynamicPageTitle>
            }
            headerContentPinnable={false}
            showHideHeaderButton={false}
            onPinnedStateChange={function _a() { }}
            onToggleHeaderContent={function _a() { }}
            style={{
                maxHeight: "700px",
            }}
        >
            <EndpointTable />
        </DynamicPage>
    );
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

export function EndpointCreate() {

    const navigate = useNavigate();
    const [endpoint, setEndpoint] = useState<EndpointType>({ name: '' })
    const createNewEndpoint = () => {
        createEndpoint(endpoint).then(() => {
            navigate('/endpoints')
        })
    }

    return (
        <ObjectPage
            footer={
                <Bar
                    design="FloatingFooter"
                    endContent={
                        <>
                            <Button design="Positive" onClick={() => createNewEndpoint()}>Save</Button>
                            <Button design="Negative" onClick={() => navigate("/endpoints")}>Cancel</Button>
                        </>
                    }
                />
            }
            headerContentPinnable
            headerTitle={
                <DynamicPageTitle
                    breadcrumbs={
                        <Breadcrumbs>
                            <BreadcrumbsItem>Endpoints</BreadcrumbsItem>
                            <BreadcrumbsItem>Create</BreadcrumbsItem>
                        </Breadcrumbs>
                    }
                    header="<New Endpoint>"
                >
                </DynamicPageTitle>
            }
            selectedSectionId="goals"
            showHideHeaderButton
        >
            <ObjectPageSection aria-label="Goals" id="goals" titleText="Data">
                <EndpointCreateForm endpoint={endpoint} onChange={(e) => setEndpoint(e)} />
            </ObjectPageSection>
        </ObjectPage>
    );
}

function EndpointCreateForm({ endpoint, onChange }: { endpoint: EndpointType, onChange: (v: EndpointType) => void }) {

    const onChangeForm = (e: Ui5CustomEvent<InputDomRef, never>) => {
        endpoint.name = e.target.value
        onChange(endpoint)
    }

    return (
        <>
            <Form
                columnsL={1}
                columnsM={1}
                columnsS={1}
                columnsXL={2}
                labelSpanL={4}
                labelSpanM={2}
                labelSpanS={12}
                labelSpanXL={4}
                style={{
                    alignItems: "center",
                }}
            >
                <FormGroup titleText="">
                    <FormItem label="Name">
                        <Input type="Text" value={endpoint.name} onChange={onChangeForm} />
                    </FormItem>
                </FormGroup>
            </Form>
        </>
    );
}
