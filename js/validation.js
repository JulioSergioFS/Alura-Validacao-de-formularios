export function validate(input) {
    const typeOfInput = input.dataset.type

    if (validators[typeOfInput]) {
        validators[typeOfInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = showErrorMessages(typeOfInput, input)
    }
}

const typesOfError = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

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
        customError: 'Você deve ser maior de 18 anos para se cadastrar'
    }
}

const validators = {
    birthDate:input => validateBirthDate(input)
}

function showErrorMessages(typeOfInput, input) {
    let message = ''

    typesOfError.forEach(error => {
        if (input.validity[error]) {
            if (typeOfInput == 'name'){
                message = errorMessages.name[error]
            }

            if (typeOfInput == 'email'){
                message = errorMessages.email[error]
            }

            if (typeOfInput == 'password'){
                message = errorMessages.password[error]
            }

            if (typeOfInput == 'birthDate'){
                message = errorMessages.birthDate[error]
            }
        }
    })

    return message
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