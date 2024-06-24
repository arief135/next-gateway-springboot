import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import { Endpoint, EndpointConfigurationTelegram, EndpointType } from "../../types";
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

                {queryResult?.isSuccess ? <EndpointEditConfig type={endpointData.type} /> : null}

            </Form>
        </Edit>
    );
};

const EndpointEditConfig = ({ type }: { type: EndpointType }) => {
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
