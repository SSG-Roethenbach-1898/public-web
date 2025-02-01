import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class SimpleGreeting extends LitElement {
    //static styles = css``;

    static properties = {
        name: { type: String }
    };

    constructor() {
        super();
        this.name = 'World';
    }

    render() {
        return html`<p>Hello, ${this.name}!</p>`;
    }
}
customElements.define('simple-greeting', SimpleGreeting);


export class NavigationMenu extends LitElement {
    /*static styles = css`

    `;*/

    static properties = {
        items: { type: Object }
    };

    constructor() {
        super();
        this.items = [];
    }

    render() {
        return html`
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
        rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
                </div>
            </nav>
        `;
    }
}
customElements.define('navigation-menu', NavigationMenu);