import { useState } from "react";
import { EndpointType } from "../../types";

export const useConfigTypeSelector = (defaultValue: EndpointType) => {

    const [configType, setConfigType] = useState(defaultValue)

    return {
        configType,
        configTypeProps: {
            defaultValue: configType,
            options: [
                { value: "HTTP", label: "HTTP" },
                { value: "TELEGRAM", label: "Telegram" },
            ],
            style: { width: 120 },
            onChange: (e: EndpointType) => setConfigType(e)
        }
    }
}