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

It's important to know, the code is under AGPL2. All you change, must be play back to the original code.

![SSG Röthenbach 1898](./public-frontend/assets/img/ssgr-transparent.png)
