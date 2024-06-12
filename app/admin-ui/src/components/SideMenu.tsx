import { SideNavigation, SideNavigationItem, SideNavigationSubItem } from "@ui5/webcomponents-react";
import { useNavigate } from "react-router-dom";

export function SideMenu() {

    const navigate = useNavigate()

    const onSelectionChange = (e: CustomEvent) => {
        let path  =e.detail.item.attributes['data-href'].value
        navigate(path)
    }

    return (
        <SideNavigation
            fixedItems={<><SideNavigationItem href="https://www.sap.com/index.html" icon="chain-link" target="_blank" text="External Link" /><SideNavigationItem icon="history" text="History" /></>}
            onSelectionChange={onSelectionChange}
            collapsed={true}
            style={{ borderRadius: 0, border: 0, boxShadow: 'none' }}
        >
            <SideNavigationItem
                icon="home"
                text="Home"
                id="users"
                data-href="/"
            />
            <SideNavigationItem
                expanded
                icon="group"
                text="Endpoints"
                id="endpoints"
                data-href="/endpoints"
            />
            <SideNavigationItem
                expanded
                icon="group"
                text="Users"
                id="users"
                data-href="/users"
            />
        </SideNavigation>

    )
}