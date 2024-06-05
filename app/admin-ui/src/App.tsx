import { createContext, useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import Layout from './Layout';
import '@ui5/webcomponents-react/dist/Assets';
import { User } from './components/User';
import { isAuthenticated } from './services/Auth.service';

const defaultTheme = "sap_horizon";

export const ThemeContext = createContext(defaultTheme);

const themes = [
    { key: "sap_horizon", name: "Morning Horizon (Light)" },
    { key: "sap_horizon_dark", name: "Evening Horizon (Dark)" },
    { key: "sap_horizon_hcb", name: "Horizon High Contrast Black" },
    { key: "sap_horizon_hcw", name: "Horizon High Contrast White" },
];

export default function App() {

    const [theme, setThemeState] = useState(defaultTheme);

    // setTheme(theme)

    return (
        <ThemeContext.Provider value={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path='users' element={<User />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </ThemeContext.Provider>
    );
}
