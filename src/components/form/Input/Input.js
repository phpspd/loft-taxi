import { TextField } from "@material-ui/core";
import { Field } from "redux-form";

const InternalInput = ({
    label,
    placeholder,
    input,
    meta: { touched, invalid, error },
    inputProps,
    ...custom
}) => {
    return (
        <TextField
            label={label}
            placeholder={placeholder || label}
            error={touched && invalid}
            helperText={touched && error}
            inputProps={{...inputProps, "data-testid": input.name}}
            {...input}
            {...custom}
        ></TextField>
    );
};

export const Input = (props) => {
    return (
        <Field
            {...props}
            component={InternalInput}
        />
    )
}
