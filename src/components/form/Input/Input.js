import { TextField } from "@material-ui/core";

export const Input = ({
    label,
    input,
    meta: { touched, invalid, error },
    inputProps,
    ...custom
}) => {
    return (
        <TextField
            label={label}
            placeholder={label}
            error={touched && invalid}
            helperText={touched && error}
            inputProps={{...inputProps, "data-testid": input.name}}
            {...input}
            {...custom}
        ></TextField>
    );
};
