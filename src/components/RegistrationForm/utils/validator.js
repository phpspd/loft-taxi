const registrationFormValidator = values => {
    const errors = {};

    if (!(values.email || "").trim()) {
        errors.email = "required";
    }

    if (!values.password) {
        errors.password = "required";
    }

    if (!values.firstName) {
        errors.firstName = "required";
    }

    if (!values.lastName) {
        errors.lastName = "required";
    }

    return errors;
};

export default registrationFormValidator;
