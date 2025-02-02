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