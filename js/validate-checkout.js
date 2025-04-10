// validate-checkout.js
function validateLength(input) {
    if (input === '') {
        return 'Fält får inte vara tomt';
    }
    if (input.length < 2) {
        return 'Måste vara minst 2 tecken';
    }
    if (input.length > 50) {
        return 'Måste vara färre än 50 tecken';
    }
    return '';
}

function validateEmail(email) {
    const lengthCheck = validateLength(email);
    if (lengthCheck) return lengthCheck;

    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.match(emailRegex)) return 'Måste vara en giltig epostaddress';
    return '';
}

function validatePhone(phone) {
    const lengthCheck = validateLength(phone);
    if (lengthCheck) return lengthCheck;

    const phoneRegex = /^[0-9()\-]+$/;
    if (!phone.match(phoneRegex)) return 'Måste vara ett giltigt telefonnummer.';
    return '';
}

function validatePostalCode(postalCode) {
    const postalCodeRegex = /^\d{5}$/;
    if (!postalCode.match(postalCodeRegex)) return 'Måste vara exakt fem siffror';
    return '';
}

export function validateCheckoutForm() {
    const email = document.getElementById('emailInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    const firstName = document.getElementById('firstNameInput').value.trim();
    const lastName = document.getElementById('lastNameInput').value.trim();
    const address = document.getElementById('addressInput').value.trim();
    const postalCity = document.getElementById('postalCityInput').value.trim();
    const postalCode = document.getElementById('postalCodeInput').value.trim();

    const validationResults = {
        email: validateEmail(email),
        phone: validatePhone(phone),
        firstName: validateLength(firstName),
        lastName: validateLength(lastName),
        address: validateLength(address),
        postalCity: validateLength(postalCity),
        postalCode: validatePostalCode(postalCode),
    };

    Object.keys(validationResults).forEach((field) => {
        const errorMessage = validationResults[field];
        const errorElement = document.getElementById(`${field}Error`);

        if (!errorElement) {
            console.warn(`Missing error element: #${field}Error`);
            return;
        }

        if (errorMessage) {
            errorElement.classList.remove('d-none');
            errorElement.textContent = errorMessage;
        } else {
            errorElement.classList.add('d-none');
            errorElement.textContent = '';
        }
    });

    return Object.values(validationResults).every((result) => result === '');
}
