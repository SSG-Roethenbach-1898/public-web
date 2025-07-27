# SSG Röthenbach 1898

This is the repository for the public website of SSG Röthenbach 1898

Right now, the backend expose the assets/js/html.
In future, it will be server side rendered, to make it possible to provide the content via a moderation site.

## Technical Information

### Frontend

* Lit
* jQuery3
* Bootstrap 5

### Backend

* Python3 (We all love it.)
* FastAPI (Webframework)
* (More to continue in future,
    e.g. DB like MySQL, SSR with templating Jinja2)

## Setup Backend

* Create a file `.env.yaml` here next to the README
* Enter your SMTP configuration in this format:

```yaml
smtp:
    server: "your.mail.server"
    port: 465
    address: "your.receivition@your.mail.server"
    password: "your account password"

```

## License

This project is licensed under the GNU Affero General Public License v3 (AGPLv3). Key points:

* **Free Usage:** You can use, copy, and distribute this software freely
* **Source Code Access:** Source code must remain available
* **Modifications Allowed:** You may modify and improve the software
* **Network Copyleft:** If you run this software on a server accessible over a network, you must make your source code (including modifications) available to users
* **Same License:** All derivative works must use the AGPLv3 license

For the complete license text, see the LICENSE file in this repository.

![SSG Röthenbach 1898](./public-frontend/assets/img/ssgr-transparent.png)
