# jest-containers-setup
*Run Docker containers for jest tests with an async setup function*

### Description
This is a very simple wrapper around `jest-testcontainers` that allows
you to specify a simple async function in the setup property of 
the container config.

#### Something a little like this
```js
const pg = require('pg')

module.exports = {
    postgres: {
        image: 'postgres',
        tag: 'alpine',
        ports: [5432],
        env: {
            POSTGRES_PASSWORD: "coolpassword",
            POSTGRES_USER: "admin",
        },
        wait: {
            type: 'ports',
            timeout: 30000
        },
        async setup() {
            const client = new pg.Client({
                user: 'admin',
                password: 'coolpassword',
                database: 'admin',
                host: process.env.__TESTCONTAINERS_POSTGRES_IP__,
                port: +process.env.__TESTCONTAINERS_POSTGRES_PORT_5432__
            })
            await client.connect();
            await client.query(`
                create table test_table(
                  id serial not null,
                  name varchar not null
                );
            `)
            await client.end();
        }
    }
}
```
