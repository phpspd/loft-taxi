const loginFormValidator = values => {
    const errors = {};

    if (!(values.email || "").trim()) {
        errors.email = "required";
    }

    if (!values.password) {
        errors.password = "required";
    }

    return errors;
};

export default loginFormValidator;
