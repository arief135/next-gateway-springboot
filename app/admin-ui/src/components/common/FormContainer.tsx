import { Form } from "@ui5/webcomponents-react";
import { ReactNode } from "react";

interface PropType {
    content: ReactNode;
    
}

export function FormContainer(props: PropType) {
    return (
        <Form
            columnsL={1}
            columnsM={1}
            columnsS={1}
            columnsXL={2}
            labelSpanL={4}
            labelSpanM={2}
            labelSpanS={12}
            labelSpanXL={4}
            style={{
                alignItems: "center",
            }}
            onSubmit={e => e.preventDefault()}
        >
            {props.content}
        </Form>
    )
}