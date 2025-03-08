import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { NavigationController, ContactController } from './controller.js';

export class NavigationMenu extends LitElement {
    _navigationController = new NavigationController(this);
    static styles = css`

    `;

    static properties = {
        items: { type: Object }
    };

    createRenderRoot() {
        return this;
    }

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
 
            <nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <a class="navbar-brand" href="#">SSG Röthenbach 1898
                        <img src="/static/img/ssgr-transparent.png" alt="SSG Röthenbach 1898" width="50" height="50">
                    </a>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            ${this._navigationController.items.map(item => html`
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
                        <a class="nav-link" href="/app/login" target="_blank">Login</a>
                    </span-->
                </div>
            </nav>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
                integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
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

            <div class="card">
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
    #controller = new ContactController(this);

    constructor() {
        super();
    }

    render() {
        return html`
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
                rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

            <form class="container-fluid p-2 m-3 w-auto bg-body-secondary">
                <h2>Kontaktformular</h2>
                <div class="row w-auto p-2">
                    <div class="col-md-4">
                        <label for="name" class="form-label">Ihr Name 
                            <i>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                                class="bi bi-file-earmark-person" viewBox="0 0 16 16">
                                    <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5z"/>
                                </svg>
                            </i>
                        </label>
                        <select class="form-select form-control" id="anrede" 
                        .value="${this.#controller.getFormValues('anrede')}" 
                        @change="${this._setValues}">
                            <option value="" disabled selected>Anrede</option>
                            <option value="Sehr geehrte Frau" selected>Frau</option>
                            <option value="Sehr geehrter Herr">Herr</option>
                            <option value="Sehr geehrt*">Divers</option>
                        </select>
                        <input type="text" class="form-control" name="name" id="name" 
                            placeholder="Max Mustermann"
                            .value="${this.#controller.getFormValues('name')}" 
                            @change="${this._setValues}" required/>
                    </div>
                    <div class="col-md-4">
                        <label for="email" class="form-label">Email-Adresse 
                            <i>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                                class="bi bi-envelope" viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                            </svg>
                            </i>
                        </label>
                        <input type="email" class="form-control m-0" id="email" 
                        placeholder="max.mustermann@mail.de" 
                        .value="${this.#controller.getFormValues('email')}" 
                        @change="${this._setValues}" required=""/>
                    </div>
                    <div class="col-md-4">
                        <label for="phone" class="form-label">Telefonnummer 
                            <i>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                                class="bi bi-telephone-inbound" viewBox="0 0 16 16">
                                    <path d="M15.854.146a.5.5 0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0m-12.2 1.182a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                            </svg>
                            </i>
                        </label>
                        <input type="tel" class="form-control m-0" 
                        id="phone" placeholder="(Optional) 0123/444555" 
                        .value="${this.#controller.getFormValues('phone')}" 
                        @change="${this._setValues}"/>
                    </div>
                </div>
                <div class="mb-4">
                    <label for="message" class="form-label">Ihre Nachricht an uns</label>
                    <textarea class="form-control" 
                        minlength="${this.#controller.getMinLength("message")}"
                        maxlength="${this.#controller.getMaxLength("message")}"
                        id="message" rows="6" 
                        .value="${this.#controller.getFormValues('message')}" 
                        @change="${this._setValues}" required></textarea>
                </div>
                <div class="mb-4" style="font-style: italic;">
                    <p>Wir werden Ihre Daten nur zur Beantwortung Ihrer Anfrage verwenden. 
                    Detaillierte Informationen zum Umgang mit Nutzerdaten finden Sie in unserer <a href="/app/impressum-datenschutz" target="_blank">Datenschutz -/ und Geschäftserklärung</a>.</p>
                </div>
                <div class="form-check">
                    <label class="form-check-label" for="toc">Akzeptieren Sie die Geschäftsbedingungen</label>
                    <input class="form-check-input" type="checkbox" id="toc" 
                    .value="${this.#controller.getFormValues('toc')}" 
                    ?checked="${this.#controller.getFormValues('toc')}" 
                    @click="${this._setValues}" required>
                </div>
            </div>
                <input id="submitBtn" type="submit" class="btn btn-primary" 
                @click="${this._onsubmit}" disabled></button>
            </form

            <div class="container">
                ${this.#controller.showAlert ? html`
                    <div id="submitResponse" 
                    class="alert alert-${this.#controller.alertType} m-3" 
                    role="alert">${this.#controller.alertMessage}</div>
                ` : html``}
            </div>

            <script src="https://code.jquery.com/jquery-3.7.1.min.js" 
                integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
                integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            `
    }

    _setValues(e) {
        this.#controller.formOnChange(e);
    }

    /**
     * Submit the form
     * @param {*} e 
     */
    async _onsubmit(e) {
        e.preventDefault();

        // Send the form data to the server
        // Show the modal dialog with the response
        this.#controller.submit();
        
        //$("html, body").animate({ scrollTop: $(document).height() }, 1000);
    }
}

customElements.define('contact-form', ContactForm);

class FooterContent extends LitElement {

    static styles = css`
        footer {
            text-align: center;
            padding: 1rem;
        }

        @media (prefers-color-scheme: light) {
            footer {
                color: var(--textcolor);
                background:var(--bs-body-bg);
            }

            a:link, a:visited, a:hover, a:active {
                color: var(--textcolor);
            }
        }

        @media (prefers-color-scheme: dark) {
            footer {
                color: var(--textcolor);
                background:rgb(48, 52, 54);
            }
            a:link, a:visited, a:hover, a:active {
                color: var(--textcolor);
            }
        }
    `;

    render() {        
        return html`
            <script src="https://code.jquery.com/jquery-3.7.1.min.js" 
                integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
                rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
                integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

            <footer class="footer sticky-bottom text-center">
                <div class="container-sm">
                    <div class="row h-auto">
                        <div class="col-md-4">
                            <br>Trainingszeiten:
                            <br>Luftgewehrschützen: Freitag, 18.00 - 20.00 Uhr
                            <br>Bogenschützen: Samstag, 14.00 - 16.00 Uhr
                        </div>
                        <div class="col-md-4">
                            <br>Anschrift:
                            <br>SSG Röthenbach 1898
                            <br>Pegnitzgrund 2
                            <br>90552 Röthenbach an der Pegnitz
                        </div>
                        <div class="col-md-3">
                            <br>Links:
                            <br><a href="https://www.bssb.de" target="_blank">BSSB</a>
                            <a href="https://www.dsb.de" target="_blank">DSB</a>
                            <br><a href="https://schuetzengau-nuernberg.de" target="_blank">Schützengau-Nürnberg</a>
                            <br><a href="https://bgv.bssb.de/msb" target="_blank">Mittelfränkischer Schützenbund</a>
                        </div>
                        <div class="col-md-1">
                            <br>Social:
                            <div class="row">
                                <a href="FIXME" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                                        class="bi bi-facebook" viewBox="0 0 16 16">
                                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                                    </svg>
                                </a>
                                <a href="FIXME" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                                        class="bi bi-instagram" viewBox="0 0 16 16">
                                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-center p-1">
                    <p>&copy; ${new Date().getFullYear()} SSG Röthenbach 1898</p>
                </div>
            </footer>
        `;
    }
}
customElements.define('footer-content', FooterContent);