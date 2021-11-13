import { Select as MUISelect, SvgIcon, InputLabel, FormHelperText, FormControl } from "@material-ui/core";
import { Field } from "redux-form";

function ArrowIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
        </SvgIcon>
    )
}

const Helper = ({ touched, error }) => {
    if (!(touched && error) || typeof error !== "string") {
        return;
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
}

const InternalSelect = ({
    id,
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
}) => {
    return (
    <FormControl error={!!(touched && error)}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <MUISelect
            {...input}
            id={id}
            {...custom}
        >
            {children}
        </MUISelect>
        {Helper({ touched, error })}
    </FormControl>
)};

export const Select = ({ children, id, name, ...props }) => {
    return (
        <Field
            IconComponent={ArrowIcon}
            component={InternalSelect}
            id={id}
            name={name}
            {...props}
        >
            {children}
        </Field>
    )
};
