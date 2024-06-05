import { Button, FlexBox, FlexBoxDirection, Icon, Input, Title, Toast } from "@ui5/webcomponents-react";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useRef } from "react";
import { login } from "./services/Auth.service";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js"
import "@ui5/webcomponents-icons/dist/account.js"
import "@ui5/webcomponents-icons/dist/key.js"
import axios from "axios";

export default function Login() {

    const navigate = useNavigate()

    const toast = useRef(null)

    const onLogin = async (e: SyntheticEvent) => {
        e.preventDefault()

        const username = (document.getElementById('username') as any).value
        const password = (document.getElementById('password') as any).value

        const loginResult = await login(username, password)

        if (loginResult.status == 200) {
            axios.defaults.auth = {
                username: username,
                password: password
            }
            navigate('/')
        }
    }

    return (
        <form onSubmit={onLogin}>
            <FlexBox
                direction={FlexBoxDirection.Column}
                alignItems="Center"
                justifyContent="Center"
                style={{ height: '600px' }}
            >

                <Title style={{ marginBottom: '30px' }}>Sign In</Title>
                <Input
                    id='username'
                    style={{ marginBottom: '10px' }}
                    icon={<Icon name="account" />}
                    placeholder="Username"
                />
                <Input
                    id='password'
                    style={{ marginBottom: '10px' }}
                    icon={<Icon name="key" />}
                    placeholder="Password"
                    type="Password"
                />

                <Button type="Submit" design="Emphasized" style={{ width: '210px' }}>Login</Button>
                <Toast ref={toast}></Toast>
            </FlexBox>
        </form>
    )
}