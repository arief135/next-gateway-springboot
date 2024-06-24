import { Create, useForm, useSelect } from "@refinedev/antd";
import MDEditor from "@uiw/react-md-editor";
import { Form, Input, Select } from "antd";
import { useState } from "react";
import { EndpointConfigurationHTTP, EndpointConfigurationTelegram, EndpointType } from "../../types";
import { useConfigTypeSelector } from "./common";

export const EndpointCreate = () => {
    const { formProps, saveButtonProps } = useForm({});

    const { configType, configTypeProps } = useConfigTypeSelector('HTTP')

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label={"Name"}
                    name={["name"]}
                    rules={[
                        {
                            required: true,
                            min: 3
                        },
                    ]}
                    style={{ width: 240 }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={"Type"}
                    name="type"
                    initialValue={configType}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        {...configTypeProps}
                    />
                </Form.Item>

                <EndpointCreateConfig type={configType} />
            </Form>
        </Create>
    );
};

const EndpointCreateConfig = ({ type }: { type: EndpointType }) => {
    if (type == 'HTTP') {
        const [httpConfig, setHttpConfig] = useState<EndpointConfigurationHTTP>({ authType: 'NONE' } as EndpointConfigurationHTTP);
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
                    <Input value={httpConfig.destination} />
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
                    initialValue={httpConfig.authType}
                >
                    <Select
                        options={[
                            { title: 'No Auth', value: 'NONE' },
                            { title: 'Basic Auth', value: 'BASIC' },
                        ]}
                        onChange={(e) => setHttpConfig({ ...httpConfig, authType: e })}
                    />
                </Form.Item>

                {httpConfig.authType == 'BASIC' ?
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
                            <Input value={httpConfig.authBasicUser} />
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
                            <Input value={httpConfig.authBasicPasswod} type="Password" />
                        </Form.Item>
                    </>
                    :
                    <></>
                }
            </>
        )
    }

    if (type == 'TELEGRAM') {
        const [telegramConfig, setTelegramConfig] = useState<EndpointConfigurationTelegram>({} as EndpointConfigurationTelegram);

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
                    <Input value={telegramConfig.botId} />
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
                    <Input value={telegramConfig.botToken} />
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
                    <Input value={telegramConfig.chatId} />
                </Form.Item>
            </>
        )
    }
}