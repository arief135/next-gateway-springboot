import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { Endpoint, EndpointConfigurationHTTP, EndpointConfigurationTelegram, EndpointType } from "../../types";
import { useState } from "react";
import { useConfigTypeSelector } from "./common";

export const EndpointEdit = () => {
    const { formProps, saveButtonProps, queryResult, formLoading } = useForm({});

    const endpointData = queryResult?.data?.data as Endpoint;

    return (
        <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label={"Name"}
                    name={["name"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input disabled={true} />
                </Form.Item>
                <Form.Item
                    label={"Type"}
                    name="type"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input disabled={true} />
                </Form.Item>

                {queryResult?.isSuccess ? <EndpointEditConfig data={endpointData} /> : null}

            </Form>
        </Edit>
    );
};

const EndpointEditConfig = ({ data }: { data: Endpoint }) => {
    if (data.type == 'HTTP') {

        const [authType, setAuthType] = useState(data.configHTTP.authType)

        return (
            <>
                <Form.Item
                    label={"Destination"}
                    name={["configHTTP", "destination"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{ width: 600 }}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={"Authentication"}
                    name={["configHTTP", "authType"]}
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                    style={{ width: 240 }}
                >
                    <Select
                        options={[
                            { title: 'No Auth', value: 'NONE' },
                            { title: 'Basic Auth', value: 'BASIC' },
                        ]}
                        onChange={(e) => setAuthType(e)}
                    />
                </Form.Item>

                {authType == 'BASIC' ?
                    <>
                        <Form.Item
                            label={"User"}
                            name={["configHTTP", "authBasicUser"]}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ width: 240 }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={"Password"}
                            name={["configHTTP", "authBasicPasswod"]}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{ width: 240 }}
                        >
                            <Input type="Password" />
                        </Form.Item>
                    </>
                    :
                    <></>
                }
            </>
        )
    }

    if (data.type == 'TELEGRAM') {

        return (
            <>
                <Form.Item
                    label={"Bot ID"}
                    name={["configTelegram", "botId"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={"Bot Token"}
                    name={["configTelegram", "botToken"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={"Chat ID"}
                    name={["configTelegram", "chatId"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </>
        )
    }
}
