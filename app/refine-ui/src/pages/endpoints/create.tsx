import { Create, useForm } from "@refinedev/antd";
import { EndpointForm } from "./form";

export const EndpointCreate = () => {

    const { formProps, saveButtonProps, onFinish } = useForm({});

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
        <Create saveButtonProps={saveButtonProps}>
            <EndpointForm formProps={formProps} onFinish={onFinish} />
        </Create>
    );
};
