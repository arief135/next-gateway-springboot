import { createContext, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Layout from './Layout';
import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js';
import '@ui5/webcomponents-react/dist/Assets';

const defaultTheme = "sap_horizon";

export const ThemeContext = createContext(defaultTheme);

const themes = [
    { key: "sap_horizon", name: "Morning Horizon (Light)" },
    { key: "sap_horizon_dark", name: "Evening Horizon (Dark)" },
    { key: "sap_horizon_hcb", name: "Horizon High Contrast Black" },
    { key: "sap_horizon_hcw", name: "Horizon High Contrast White" },
];

function App() {

    const [theme, setThemeState] = useState(defaultTheme);

    // setTheme(theme)

    return (
        <ThemeContext.Provider value={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path='users' element={<Users />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </ThemeContext.Provider>
    );
}

function Users() {
    return (
        <div>users</div>
    )
}

export default App;
