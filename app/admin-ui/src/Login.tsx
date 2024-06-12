import { Button, FlexBox, FlexBoxDirection, Icon, Input, Title, Toast } from "@ui5/webcomponents-react";
import { useNavigate } from "react-router-dom";
import { BaseSyntheticEvent, SyntheticEvent, useRef, useState } from "react";
import { login } from "./services/Auth.service";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js"
import "@ui5/webcomponents-icons/dist/account.js"
import "@ui5/webcomponents-icons/dist/key.js"
import axios from "axios";

export default function Login() {

    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({ username: '', password: '' })

    const onLogin = async (e: SyntheticEvent) => {
        e.preventDefault()

        const loginResult = await login(loginData.username, loginData.password)

        if (loginResult.status == 200) {
            axios.defaults.auth = {
                username: loginData.username,
                password: loginData.password
            }
            navigate('/')
        }
    }

    const onKeyUp = (e: BaseSyntheticEvent) => {
        const newData = { ...loginData }
        if (e.target.id == 'username') {
            newData.username = e.target.value
        } else {
            newData.password = e.target.value
        }
        setLoginData(newData)
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
                    value={loginData.username}
                    onKeyUp={onKeyUp}
                />
                <Input
                    id='password'
                    style={{ marginBottom: '10px' }}
                    icon={<Icon name="key" />}
                    placeholder="Password"
                    type="Password"
                    value={loginData.password}
                    onKeyUp={onKeyUp}
                />

                <Button type="Submit" design="Emphasized" style={{ width: '210px' }}>Login</Button>
            </FlexBox>
        </form>
    )
}