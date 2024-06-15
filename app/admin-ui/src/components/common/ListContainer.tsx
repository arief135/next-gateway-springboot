import {
    DynamicPage, DynamicPageHeader, FlexBox,
    DynamicPageTitle, Button, Title, Label
} from "@ui5/webcomponents-react";

import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface PropType {
    title: string;
    subtitle: string;
    content: ReactElement
}

export function ListContainer(props: PropType) {
    const navigate = useNavigate();

    return (
        <DynamicPage
            headerContent={
                <DynamicPageHeader>
                    <FlexBox wrap="Wrap"></FlexBox>
                </DynamicPageHeader>
            }
            headerTitle={
                <DynamicPageTitle
                    actions={
                        <>
                            <Button design="Emphasized" onClick={() => navigate("create")}>
                                Create
                            </Button>
                        </>
                    }
                    header={<Title>{props.title}</Title>}
                    subHeader={<Label>{props.subtitle}</Label>}
                ></DynamicPageTitle>
            }
            headerContentPinnable={false}
            showHideHeaderButton={false}
            onPinnedStateChange={function _a() { }}
            onToggleHeaderContent={function _a() { }}
            style={{
                maxHeight: "700px",
            }}
        >
            {props.content}
        </DynamicPage>

    )
}