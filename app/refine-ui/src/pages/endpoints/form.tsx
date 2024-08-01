import { Divider, Form, Input, Checkbox, Select } from "antd"
import { EndpointConfigurationHTTP, EndpointConfigurationTelegram, EndpointType } from "../../types";
import { useConfigTypeSelector } from "./common";
import { useState } from "react";

export const EndpointForm = ({ formProps, onFinish }: any) => {

    const { configType, configTypeProps } = useConfigTypeSelector('HTTP')

    const handleOnFinish = (values: any) => {
        const allowedMethodValues = values['allowedMethod'] as number[]
        let allowedMethod = ''

        for (let i = 0; i < 5; i++) {
            if (allowedMethodValues.indexOf(i) >= 0) {
                allowedMethod += '1'
            } else {
                allowedMethod += '0'
            }
        }

        onFinish({ ...values, allowedMethod });
    }


    return (
        <>
            <Divider orientation="left" orientationMargin={0}>From</Divider>
            <Form {...formProps} layout="vertical" onFinish={handleOnFinish}>
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
                    label='Allowed Method'
                    name='allowedMethod'
                    rules={[{ required: true }]}
                    initialValue={[0, 1]}
                >
                    <Checkbox.Group
                        options={
                            [
                                { label: 'GET', value: 0 },
                                { label: 'POST', value: 1 },
                                { label: 'PUT', value: 2 },
                                { label: 'PATCH', value: 3 },
                                { label: 'DELETE', value: 4 },
                            ]
                        }
                    />

                </Form.Item>

                <Divider orientation="left" orientationMargin={0}>To</Divider>

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

                <EndpointConfigForm type={configType} />
            </Form>
        </>
    )
}

const EndpointConfigForm = ({ type }: { type: EndpointType }) => {
    if (type == 'HTTP') {

        const [httpConfig, setHttpConfig] = useState<EndpointConfigurationHTTP>({ authType: 'NONE' } as EndpointConfigurationHTTP);
        const [methodFromAttribute, setMethodFromAttribute] = useState(false)

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
                    label={"HTTP Method"}
                    name={["configHTTP", "httpMethod"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{ width: 240 }}
                    initialValue={'auto'}
                >
                    <Select
                        options={[
                            { value: "auto", label: "[AUTO]" },
                            { value: "get", label: "GET" },
                            { value: "post", label: "POST" },
                            { value: "put", label: "PUT" },
                            { value: "patch", label: "PATCH" },
                            { value: "delete", label: "DELETE" },
                            { value: "attr", label: "[From Attribute]" },
                        ]}
                        onChange={e => setMethodFromAttribute(e === 'attr')}
                    />
                </Form.Item>

                <Form.Item
                    label={"Attribute Name"}
                    hidden={!methodFromAttribute}
                    rules={[
                        {
                            required: methodFromAttribute,
                        },
                    ]}
                    name={["configHTTP", "httpMethodVariable"]}
                    style={{ width: 240 }}
                    initialValue={'{from.httpMethod}'}
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
                    style={{ width: 240 }}
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
                    style={{ width: 240 }}
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
                    style={{ width: 240 }}
                >
                    <Input value={telegramConfig.chatId} />
                </Form.Item>
            </>
        )
    }
}