import { Edit, useForm } from "@refinedev/antd";
import { Endpoint } from "../../types";
import { EndpointForm } from "./form";

export const EndpointEdit = () => {
    const { formProps, saveButtonProps, queryResult, formLoading, onFinish } = useForm({});

    const endpointData = queryResult?.data?.data as Endpoint;

    return (
        <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
            <EndpointForm formProps={formProps} onFinish={onFinish} />
        </Edit>
    );
};
