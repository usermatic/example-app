Welcome to the usermatic example application.

To configure the app:

1. Add the following line to `/etc/hosts`

     127.0.0.1       example-app.usermatic.local

1. Create an application on [https://usermatic.io], and give it the hostname `example-app.usermatic.local:4000`

1. `$ cp .env.example .env`

1. Edit `.env` and replace UM_SITE_ID and UM_SITE_SECRET with the values from your usermatic application. (Get them from [https://usermatic.io/dashboard])

1. `$ yarn dev`

1. Open [http://example-app.usermatic.local:4000/] in your browser.
