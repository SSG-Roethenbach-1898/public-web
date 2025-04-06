export class NavigationController {
    host;
    items = [];

    constructor(host) {
        this.host = host;
        host.addController(this);
    }

    hostConnected() {
        fetch('/api/navigation', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                this.items = data;
                this.host.requestUpdate();
            });
    }
}

export class ContactController {
    host;
    validationForm = new ValidationForm();

    formValues = {
        anrede: {
            label: 'Anrede',
            fromType: 'select',
            type: 'string',
            value: ''
        },
        name: {
            label: 'Name',
            fromType: 'text',
            placeholder: 'Max Mustermann',
            type: 'string',
            value: ''
        },
        email: {
            label: 'E-Mail',
            fromType: 'email',
            placeholder: 'max.mustermann@mail.de',
            type: 'string',
            value: ''
        },
        phone: {
            label: 'Telefon',
            fromType: 'tel',
            placeholder: '+49 123 45678910',
            type: 'string',
            value: ''
        }, 
        message: {
            label: 'Nachricht',
            fromType: 'textarea',
            placeholder: 'Ihre Nachricht an uns',
            type: 'string',
            value: ''
        },
        toc: {
            label: 'Datenschutz',
            fromType: 'checkbox',
            placeholder: 'Ich habe die Datenschutzerklärung gelesen und akzeptiere sie.',
            type: 'boolean',
            value: false
        }
    };

    showAlert = false;
    alertType = '';
    alertMessage = '';

    constructor(host) {
        this.host = host;
        host.addController(this);

        this.validationForm.addField('anrede', { 
            required: true, 
            minLength: 4, 
            maxLength: 20, 
            validator: function(value) { 
                return value !== '';
            }
        });
        this.validationForm.addField('name', {
            required: true,
            minLength: 8,
            maxLength: 24,
            validator: function(value) {
                return validateFullName(value);
            }
        });
        this.validationForm.addField('email', {
            required: true,
            minLength: 8,
            maxLength: 64,
            validator: function(value) {
                return validateEmail(value);
            }
        });
        this.validationForm.addField('phone', {
            required: false,
            minLength: 8,
            // https://www.helpster.de/wie-lang-sind-handynummern-so-sind-diese-aufgebaut_166600
            maxLength: 15,
            validator: function(value) {
                return validatePhone(value);
            }
        });
        this.validationForm.addField('message', {
            required: true,
            minLength: 8,
            maxLength: 512,
            validator: function(value) {
                return value !== '';
            }
        });
        this.validationForm.addField('toc', {
            required: true,
            minLength: null, // Not applicable
            maxLength: null, // Not applicable
            validator: function(value) {
                return value === true;
            }
        });
    }

    hostConnected() {
        console.debug('ContactController connected');
        // Add shadow root to highlight the form fields
        this.validationForm.addShadowRoot(this.host.shadowRoot);
    }

    hostDisconnected() {
        // Clear the timer when the host is disconnected
        console.debug('ContactController disconnected');
    }

    /**
     * Validate and submit the contact form
     */
    async submit() {
        console.debug('Submitting the form:', this.formValues);
        const formObject = {
            anrede: this.formValues.anrede.value,
            name: this.formValues.name.value,
            email: this.formValues.email.value,
            phone: this.formValues.phone.value,
            message: this.formValues.message.value
        };
        const payload = JSON.stringify(formObject);

        try {
            JSON.parse(payload);
        } catch (error) {
            this.showAlert = true;
            this.alertType = 'danger';
            this.alertMessage = 'Ihre Nachricht konnte nicht versendet werden. Bitte überprüfen Sie Ihre Eingaben.';
        }

        await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        })
            .then(response => {
                if(response.status == 200) {
                    this.showAlert = true;
                    this.alertType = 'success';
                    console.debug('Message sent successfully:', response);
                    this.alertMessage = 'Ihre Nachricht wurde erfolgreich versendet.';

                    this.clearForm();

                    let promise = response.json();
                    promise.then(data => {                        
                        this.alertMessage = 'Ihre Nachricht wurde erfolgreich versendet. ' + data.message;
                    });
                } else {
                    let promise = response.json();
                    promise.then(data => {
                        console.error('Failed to send the message:', data);
                        
                        this.showAlert = true;
                        this.alertType = 'danger';
                        this.alertMessage = 'Ihre Nachricht konnte nicht versendet werden. Bitte versuchen Sie es später erneut. Technisch: ' + data.message;
                        this.host.requestUpdate();
                    });
                }
            }).catch(error => {
                console.log('Failed to send the message:', error);
                this.showAlert = true;
                this.alertType = 'danger';
                this.alertMessage = 'Ihre Nachricht konnte nicht versendet werden. Bitte versuchen Sie es später erneut. Technisch: ' + error;
                this.host.requestUpdate();
            });
    }

    getMinLength(field) {
        return this.validationForm.validationFields[field].minLength;
    }

    getMaxLength(field) {
        return this.validationForm.validationFields[field].maxLength;
    }

    getFormValues(field) {
        return this.formValues[field].value;
    }

    formOnChange(event) {
        // Set the form values
        console.debug('Event id/value', event.target.id, event.target.value);
        // Set the form values
        let field = event.target.id;
        let value = event.target.value;

        // Form values
        let obj = this.formValues[field];
        if(obj.type === 'boolean') {
            obj.value = event.target.checked;
        } else if(obj.type === 'string') {
            obj.value = value;
        }

        // Validate input
        this.validationForm.validate(this.formValues);
        this.host.requestUpdate();
    }

    clearForm() {
        this.formValues.anrede.value = '';
        this.formValues.email.value = '';
        this.formValues.name.value = '';
        this.formValues.phone.value = '';
        this.formValues.message.value = '';
        this.formValues.toc.value = false;
        // Needs programmatically be unchecked
        this.host.shadowRoot.getElementById('toc').checked = false;

        this.validationForm.resetValidation();
        this.host.requestUpdate();
    }
}

export class GalleryController {
    host;
    images = [];

    constructor(host) {
        this.host = host;
        host.addController(this);
    }

    hostConnected() {
        fetch('/api/gallery', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                this.images = data;
                this.host.requestUpdate();
            });
    }
}

class ValidationForm {
    shadowRoot;

    /**
     * The fields to and how to validate them
     */
    validationFields = {}

    /**
     * The validation status of the form
     */
    valid = {};

    constructor() { }

    addShadowRoot(shadowRoot) {
        this.shadowRoot = shadowRoot;
    }

    /**
     * Add a new field to be validated. The value is another object with the following structure:
     * {
     *      required: true|false,
     *      minLength: 0,
     *      maxLength: 0,
     *      validator: function(value) {
     *          return true|false;
     *      }
     * }
     * 
     * @param {*} field 
     * @param {*} value 
     */
    addField(field, value) {
        console.debug('Adding field:', field, value);
        this.validationFields[field] = value;
        this.valid[field] = false;
    }

    /**
     * Validate the form against validation fields
     * 
     * @param {*} form 
     */
    validate(form) {
        console.debug('Validating form:', form);
        for(let field in this.validationFields) {
            let validField = true;

            let value = form[field].value;
            let fieldValidation = this.validationFields[field];

            if(fieldValidation.minLength !== null && value.length < fieldValidation.minLength) {
                validField = false;
            }

            if(fieldValidation.maxLength !== null && value.length > fieldValidation.maxLength) {
                validField = false;
            }

            if(fieldValidation.validator !== null && !fieldValidation.validator(value)) {
                validField = false;
            }

            if(!fieldValidation.required && value === '') {
                validField = true;
            }

            if(!validField) {
                console.error('Validation failed:', field, value);
                this.shadowRoot.getElementById('submitBtn').removeAttribute('disabled');
                this.shadowRoot.getElementById(field).classList.add('is-invalid');
                this.shadowRoot.getElementById(field).classList.remove('is-valid');
            } else {
                this.shadowRoot.getElementById(field).classList.remove('is-invalid');
                this.shadowRoot.getElementById(field).classList.add('is-valid');
                this.shadowRoot.getElementById('submitBtn').setAttribute('disabled', 'true');
            }
            this.valid[field] = validField
        }

        // Check if all fields are valid
        let allValid = allFieldsAreValid(this.valid);

        console.debug('All valid:', allValid, this.valid);
        if(allValid) {
            this.shadowRoot.getElementById('submitBtn').removeAttribute('disabled');
        } else {
            this.shadowRoot.getElementById('submitBtn').setAttribute('disabled', 'true');
        }
    }

    resetValidation() {
        for(let field in this.validationFields) {
            this.valid[field] = false;
            this.shadowRoot.getElementById(field).classList.remove('is-invalid');
            this.shadowRoot.getElementById(field).classList.remove('is-valid');
        }
        this.shadowRoot.getElementById('submitBtn').setAttribute('disabled', 'true');
    }
}

function allFieldsAreValid(validationResults) {
    for (let field in validationResults) {
        if (validationResults[field] === false) {
            return false;
        }
    }
    return true;
}

function validateEmail(email) {
    // Source: https://stackoverflow.com/a/46181
    const re = /\S+@\S+\.\S+/;
    let validated = re.test(email);
    return validated;
}

function validatePhone(phone) {
    // Source: https://stackoverflow.com/a/53854183
    const re = /(\(?([\d \-\)\–\+\/\(]+){6,}\)?([ .\-–\/]?)([\d]+))/;
    return re.test(phone);
}

function validateFullName(name) {
    return name.length > 8 && name.includes(' ');
}