# Risky EMU Backend

Make and share toy programs for the RISC-V instruction set!(Backend Edition)

## Local Installation

1. Fork the current repository and clone it to your local machine.
2. Once cloned, open in a code editor of your choice (this application was created in VSCode).
3. Open a terminal within your code editor and used the command 'npm i' to install the required packages and dependencies.
4. Create a .env file and fill in the enviroment variables for the program. The environment variables for the backend are:
  - **PORT:** Port for the server to run on. Anything above 1024 should be fine. Ensure that this port is available and that it matches the port used in the **REACT_APP_SERVER_URL** environment variable on the frontend.
  - **ORIGIN:** URL for the frontend. This will most likely be `http://localhost:[PORT]` where `PORT` is the port that the *frontend* is running on. Note that this should *not* be the same port that is specified for the backend.
  - **LOCAL:** Tells the server whether to use settings specific to local use. For local installation set to 1.
  - **POSTGRES_\*:** There are 5 environment variables for connecting to a remote database. If using Vercel, these should match the database environment variables that are assigned to the backend deployment when the backend is linked to a postgresql database. The essential environment variables that need to be added are:
    - **POSTGRES_DATABASE**
    - **POSTGRES_HOST** 
    - **POSTGRES_PASSWORD** 
    - **POSTGRES_URL** 
    - **POSTGRES_USER** 
5. Once all steps have been completed you can run the start script (`npm start`) to begin running locally on your machine.

## Technologies Used

#### **Express** - 
> This application is using Express as its backend framework to create this API.
#### **cors** - 
> [Cross-Origin Resource Sharing, or CORS, is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).
#### **dotenv** - 
> This application is using dotenv for environment variable declaration and security.
#### **nodemon** - 
> This application is using nodemon to monitor the devlopment of our express based Node.js app.
#### **bcrypt** -
> This application is using bcrypt to support proper password hashing and ensure user security.
#### **pg** -
> This application is using pg to be able to facilitate a connection to our local, soon to be cloud based, PGAdmin database.
#### **pg-hstore** -
> This application is using pg-hstore for more complex database storage.
#### **sequelize** -
> This application is using Sequelize to connect to a database and perform necessary operations without writing in raw SQL queries.

## Project Usage

Alice fill this in please

## Project Roadmap

Alice fill this in as well please

## Authors and Acknowledgment

#### Primary Lead and Scrum Master - [Aloeminium108](https://github.com/Aloeminium108)
---
#### Secondary Lead - [BLDubroff](https://github.com/BLDubroff)
---

## Contributing

For major changes, please open an issue first to discuss what you would like to change.

## License

If applicable

## Project Status

Actively in development