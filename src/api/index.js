export const serverAuth = (email, password) => {
    return fetch("https://loft-taxi.glitch.me/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(response => response.json());
};

export const serverRegister = (email, password, surname, name) => {
    return fetch("https://loft-taxi.glitch.me/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            password,
            surname,
            name
        })
    })
        .then(response => response.json());
};

export const serverGetCard = token => {
    return fetch("https://loft-taxi.glitch.me/card?token=" + token)
        .then(response => response.json());
}

export const serverSaveCard = (cardName, cardNumber, expiryDate, cvc, token) => {
    return fetch("https://loft-taxi.glitch.me/card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            cardName,
            cardNumber,
            expiryDate,
            cvc,
            token
        })
    })
        .then(response => response.json());
}
