export function validate(input) {
    const inpuType = input.dataset.type

    if (validators[inpuType]) {
        validators[inpuType](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido')
    } else {
        input.parentElement.classList.add('input-container--invalido')
    }
}

const errorMessages = {
    name : {
        valueMissing: 'O campo nome não pode estar vazio'
    },
    email: {
        valueMissing: 'O campo email não pode estar vazio',
        typeMismatch: 'O email digitado não é valido'
    },
    password: {
        valueMissing: 'O campo senha não pode estar vazio',
        patternMismatch: 'A senha deve conter entre 6 e 12 caracteres, deve conter pelo menos um letra maiúscula, um número e não deve conter símbolos.'
    },
    birthDate: {
        valueMissing: 'O campo data de nascimento não pode estar vazio',
        customError: 'Você deve ser maior e 18 anos para se cadastrar'
    }
}

const validators = {
    birthDate:input => validateBirthDate(input)
}

function validateBirthDate(input) {
    const receivedDate = new Date(input.value)
    let message = ''

    if (!OlderThan18(receivedDate)) {
        message = 'Você deve ser maior e 18 anos para se cadastrar'
    }

    input.setCustomValidity(message)
}

function OlderThan18(date) {
    const currentDate = new Date()
    const dateOlderThan18 = new Date(date.getUTCFullYear() + 18, date.getUTCMonth(), date.getUTCDate())

    return dateOlderThan18 <= currentDate
}