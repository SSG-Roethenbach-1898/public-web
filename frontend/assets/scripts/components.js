import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class SimpleGreeting extends LitElement {
    static styles = css`
        p {
            color: #fff;
        }
    `;

    static properties = {
        name: { type: String }
    };

    constructor() {
        super();
        this.name = 'World';
    }

    render() {
        return html`<p>Demotext: ${this.name}!</p>`;
    }
}
customElements.define('simple-greeting', SimpleGreeting);


export class NavigationMenu extends LitElement {
    static styles = css`
        nav {
            opacity: 0.8;
        }

        .nav-link {
            color: #fff;
        }
    `;

    static properties = {
        items: { type: Object }
    };

    constructor() {
        super();
        this.items = [];
    }

    render() {
        return html`
            <script src="https://code.jquery.com/jquery-3.7.1.min.js" 
                integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
                rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
                integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
 
            <nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <a class="navbar-brand" href="#">SSG Röthenbach 1898</a>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            ${this.items.map(item => html`
                                <a class="nav-link" href="${item.url}">${item.label}</a>
                            `)}
                        </ul>
                    </div>

                    <!-- Search form -->
                    <!--form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form-->
                    
                    <!-- Login to moderation -->
                    <!--span class="navbar-text">
                        <a class="nav-link" href="/app/login">Login</a>
                    </span-->
                </div>
            </nav>
        `;
    }
}
customElements.define('navigation-menu', NavigationMenu);

export class ContentCard extends LitElement {
    static styles = css`
        .card {
            margin: 1rem;
        }

        div {
            color: #fff;
        }
    `;

    static properties = {
        title: { type: String },
        date: { type: String },
    };

    constructor() {
        super();
        this.title = 'Title';
        this.date = Date().toLocaleString("de-DE");
    }

    render() {
        return html`
            <script src="https://code.jquery.com/jquery-3.7.1.min.js" 
                integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
                rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
                integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

            <div class="card" data-bs-theme="dark">
                <div class="card-header">
                <h4>
                    ${this.date !== '' ? html`${this.title} - ${this.date}` : html`${this.title}`}
                </h4>
                </div>
                <div class="card-body">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}
customElements.define('content-card', ContentCard);

export class ContactForm extends LitElement {
    static styles = css`
        form {
            margin: 1rem;
            color: #fff;
        }

        input {
            margin: 0.5rem;
        }
    `;
    static properties = {
        name: { type: String },
        email: { type: String },
        message: { type: String }
    };

    constructor() {
        super();
        this.name = '';
        this.email = '';
        this.message = '';
    }

    render() {
        return html`
            <script src="https://code.jquery.com/jquery-3.7.1.min.js" 
                integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
                rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
                integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

            <div id="submitResponse"></div>
            <form class="container" data-bs-theme="dark">
                <div class="mb-2" data-bs-theme="dark">
                    <label for="name" class="form-label">Name:</label>
                    <input type="text" class="form-control" id="name" placeholder="Name" .value="${this.name}" @change="${this.handleInput}">
                </div>
                <div class="mb-2" data-bs-theme="dark">
                    <label for="email" class="form-label">Email-Adresse:</label>
                    <input type="email" class="form-control" id="email" placeholder="Email" .value="${this.email}" @change="${this.handleInput}">
                </div>
                <div class="mb-2" data-bs-theme="dark">
                    <label for="message" class="form-label">Nachricht:</label>
                    <textarea class="form-control" id="message" rows="10" cols="15" .value="${this.message}" @change="${this.handleInput}"></textarea>
                </div>
                <button type="submit" class="btn btn-primary" @click="${this._onsubmit}">Abschicken</button>
            </form
        `;
    }

    /**
     * Update the property value on input change
     * @param {*} evt 
     */
    handleInput( evt ) {
        let { id , value } = evt.target;
        this[ id ] = value;
      }

      /**
       * Submit the form
       * @param {*} e 
       */
    _onsubmit(e) {
        e.preventDefault();

        console.log('Form submitted:', this.name, this.email, this.message);
        if(this.name == "" || this.email == "" || this.message == "") {
            alert("Bitte alle Felder ausfüllen.");
        }

        // Send the form data to the server
        // Show the modal dialog with the response
        /*fetch('/app/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.name,
                email: this.email,
                message: this.message
            })
        });*/

        // TODO fixme, does not work
        const responseEl = $('#submitResponse');
        //.html("<div class='alert alert-success' role='alert'>Nachricht wurde erfolgreich versendet.</div>");
        responseEl.attr({
            'class': 'alert alert-success',
            'role': 'alert'
        });
        responseEl.html('Nachricht wurde erfolgreich versendet.');

        // Reset the form
        this.name = '';
        this.email = '';
        this.message = '';
    }
}

customElements.define('contact-form', ContactForm);
