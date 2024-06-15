import {
    ObjectPage, Bar, Button, DynamicPageTitle,
    Breadcrumbs, BreadcrumbsItem, ObjectPageSection
} from "@ui5/webcomponents-react";
import { ReactElement, ReactNode } from "react";

interface PropType {
    content: ReactElement;
    buttons?: ReactNode;
    breadcrumbs?: ReactNode;
    title: string;
}

export function ObjectContainer(props: PropType) {

    const footerToolbar = props.buttons ? <Bar design="FloatingFooter" endContent={<>{props.buttons}</>} /> : undefined

    return (
        <ObjectPage
            footer={footerToolbar}
            headerContentPinnable
            headerTitle={
                <DynamicPageTitle
                    breadcrumbs={props.breadcrumbs}
                    header={props.title}
                >
                </DynamicPageTitle>
            }
            selectedSectionId="goals"
            showHideHeaderButton
        >
            {props.content}
        </ObjectPage>
    )
}