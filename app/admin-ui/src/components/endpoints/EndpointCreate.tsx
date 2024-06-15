import {
    Toast, Button, Breadcrumbs,
    BreadcrumbsItem,
    FormGroup, FormItem, Input, Select, Option
} from "@ui5/webcomponents-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEndpoint } from "../../services/Endpoint.service";
import { Endpoint, EndpointConfigurationTelegram, EndpointType, EndpointConfiguration } from 'next-gateway'
import { ObjectContainer } from "../common/ObjectContainer";
import { FormContainer } from "../common/FormContainer";

export function EndpointCreate() {

    const toast = useRef(null);
    const navigate = useNavigate();
    const [endpoint, setEndpoint] = useState<Endpoint>({name:'',type:'FIREBASE'} as Endpoint)
    const [endpointConfig, setEndpointConfig] = useState<EndpointConfiguration>({} as EndpointConfiguration)
    const [toastMessage, setToastMessage] = useState("")

    const createNewEndpoint = () => {
        if (endpoint.name.trim() == "") {
            setToastMessage("Name cannot be empty")
            if (toast.current != null) {
                (toast.current as any).show()
            }
            return
        }
        createEndpoint(endpoint).then(() => {
            navigate('/endpoints')
        })
    }

    return (
        <>
            <Toast ref={toast}>{toastMessage}</Toast>
            <ObjectContainer
                content={<EndpointCreateForm
                    endpoint={endpoint}
                    endpointConfig={endpointConfig}
                    onChangeEndpoint={(e) => setEndpoint(e)}
                    onChangeEndpointConfig={(e) => setEndpointConfig(e)}
                />}
                breadcrumbs={<Breadcrumbs>
                    <BreadcrumbsItem>Endpoint</BreadcrumbsItem>
                    <BreadcrumbsItem>create</BreadcrumbsItem>
                </Breadcrumbs>}
                title="<New Endpoint>"
                buttons={<>
                    <Button design="Positive" onClick={() => createNewEndpoint()}>Save</Button>
                    <Button design="Negative" onClick={() => navigate("/endpoints")}>Cancel</Button>
                </>}
            />
        </>
    );
}

type EndpointCreateFormPropType = {
    endpoint: Endpoint
    endpointConfig: EndpointConfiguration
    onChangeEndpoint: (e: Endpoint) => void
    onChangeEndpointConfig: (e: EndpointConfiguration) => void
}

function EndpointCreateForm(props: EndpointCreateFormPropType) {

    // const [endpointType, setEndpointType] = useState<EndpointType>('HTTP')
    const endpointTypes = ['FIREBASE', 'HTTP', 'SAP_ODATA', 'TELEGRAM']
    const endpointElements = endpointTypes.map(t =>
        <Option
            value={t}
            selected={props.endpoint.type == t ? true : false}
            key={t}
        >
            {t}
        </Option>)

    let endpointConfigElement = null
    switch (props.endpoint.type) {
        case 'FIREBASE':

            break;
        case 'HTTP':

            break;
        case 'SAP_ODATA':

            break;
        case 'TELEGRAM':
            endpointConfigElement =
                <EndpointConfigurationFormTelegram
                    config={props.endpointConfig as EndpointConfigurationTelegram}
                    onChange={e => props.onChangeEndpointConfig(e)} />
            break;

        default:
            break;
    }

    return (
        <FormContainer
            content={
                <>
                    <FormGroup titleText="Basic">
                        <FormItem label="Name">
                            <Input type="Text"
                                value={props.endpoint.name}
                                onChange={e => props.onChangeEndpoint({ ...props.endpoint, name: e.target.value })} />
                        </FormItem>
                        <FormItem label="Type">
                            <Select
                                onChange={e => {
                                        // setEndpointType(e.target.value as EndpointType)
                                        props.onChangeEndpoint({...props.endpoint, type: e.target.value as EndpointType})
                                    }
                                }>
                                {endpointElements}
                            </Select>
                        </FormItem>
                    </FormGroup>

                    {endpointConfigElement}
                </>
            }
        />
    )
}

type EndpointConfigurationFormTelegramPropType = {
    config: EndpointConfigurationTelegram,
    onChange: (e: EndpointConfigurationTelegram) => void
}

function EndpointConfigurationFormTelegram(props: EndpointConfigurationFormTelegramPropType) {
    return (
        <FormGroup titleText="Telegram Configuration">
            <FormItem label="Bot Id">
                <Input type="Text" placeholder="@myBot"
                    value={props.config.botId}
                    onChange={e => props.onChange({ ...props.config, botId: e.target.value })} />
            </FormItem>
            <FormItem label="Chat Id">
                <Input type="Text" placeholder="-1234567"
                    value={props.config.chatId}
                    onChange={e => props.onChange({ ...props.config, chatId: e.target.value })} />
            </FormItem>
            <FormItem label="Auth Token">
                <Input type="Password" placeholder="Bot Token"
                    value={props.config.botToken}
                    onChange={e => props.onChange({ ...props.config, botToken: e.target.value })} />
            </FormItem>
        </FormGroup>
    )
}