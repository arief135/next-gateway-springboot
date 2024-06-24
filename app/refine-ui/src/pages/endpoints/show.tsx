import { DateField, Show, TextField } from "@refinedev/antd";
import { useApiUrl, useCustom, useCustomMutation, useForm, useShow } from "@refinedev/core";
import { Button, Typography } from "antd";
import { Endpoint } from "../../types";

const { Title } = Typography;

export const EndpointShow = () => {
    const { queryResult } = useShow({});

    const { data, isLoading } = queryResult;

    const apiUrl = useApiUrl()

    const activation = useCustomMutation()
    const activate = (e: Endpoint) => {
        activation.mutate(
            {
                url: `${apiUrl}/endpoints/${e.name}/activate`,
                method: "post",
                values: {},
            },
            {
                onSuccess: () => {
                    queryResult.refetch()
                }
            })
    }

    const deactivate = (e: Endpoint) => {
        activation.mutate(
            {
                url: `${apiUrl}/endpoints/${e.name}/deactivate`,
                method: "post",
                values: {}
            },
            {
                onSuccess: () => {
                    queryResult.refetch()
                }
            })
    }

    const record = data?.data as Endpoint;

    let configElement = null
    let activateButton = null

    if (queryResult.isSuccess) {
        if (record.active) {
            activateButton = <Button onClick={() => deactivate(record)}>Deactivate</Button>
        } else {
            activateButton = <Button onClick={() => activate(record)}>Activate</Button>
        }

        if (record.type == 'HTTP') {
            configElement = <>
                <Title level={5}>{"Destination"}</Title>
                <TextField value={record.configHTTP.destination} />
                <Title level={5}>{"Authentication"}</Title>
                <TextField value={record.configHTTP.authType} />

                {record.configHTTP.authType == 'BASIC' ?
                    <>
                        <Title level={5}>{"User"}</Title>
                        <TextField value={record.configHTTP.authBasicUser} />
                        <Title level={5}>{"Password"}</Title>
                        <TextField value={'*****'} />
                    </> :
                    <></>
                }
            </>
        }


        if (record.type == 'TELEGRAM') {
            configElement = <>
                <Title level={5}>{"Bot ID"}</Title>
                <TextField value={record?.configTelegram.botId} />
                <Title level={5}>{"Bot Token"}</Title>
                <TextField value={record?.configTelegram.botToken} />
                <Title level={5}>{"Chat ID"}</Title>
                <TextField value={record?.configTelegram.chatId} />
            </>

        }
    }

    return (
        <Show isLoading={isLoading}
            headerButtons={({ defaultButtons }) => [defaultButtons, activateButton]}
        >

            <Title level={5}>{"Name"}</Title>
            <TextField value={record?.name} />
            <Title level={5}>{"Type"}</Title>
            <TextField value={record?.type} />
            <Title level={5}>{"Active"}</Title>
            <TextField value={record?.active ? 'Active' : 'Not active'} />
            <Title level={5}>{"CreatedAt"}</Title>
            <DateField value={record?.createdAt} />

            {configElement}
        </Show>
    );
};
