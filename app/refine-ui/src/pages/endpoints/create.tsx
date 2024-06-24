import { Create, useForm, useSelect } from "@refinedev/antd";
import MDEditor from "@uiw/react-md-editor";
import { Form, Input, Select } from "antd";
import { useState } from "react";
import { EndpointConfigurationTelegram, EndpointType } from "../../types";
import { useConfigTypeSelector } from "./common";

export const EndpointCreate = () => {
    const { formProps, saveButtonProps } = useForm({});

    const {configType, configTypeProps} = useConfigTypeSelector('HTTP')

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
        return (
            <>
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
                    name={["configTelegram","botToken"]}
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
                    name={["configTelegram","chatId"]}
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