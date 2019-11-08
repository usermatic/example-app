Welcome to the usermatic example application.

To configure the app:

1. Clone the example app:

      `$ git clone https://github.com/usermatic/example-app`
      
      `$ yarn install`

1. Create an application at https://usermatic.io, and give it the hostname `localhost:4000`

1. `$ cp .env.example .env`

1. Edit `.env` and replace `UM_APP_ID` and `UM_APP_SECRET` with the values from your usermatic application. (Get them from https://usermatic.io/dashboard)

1. `$ yarn dev -p 4000`

1. Open http://localhost:4000/ in your browser.

1. You should see two forms, one for login and one for authentication.
