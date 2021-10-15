import {Client} from 'pg'

describe('Verify Setup', () => {
  const client = new Client({
    user: 'admin',
    password: 'coolpassword',
    database: 'admin',
    host: process.env.__TESTCONTAINERS_POSTGRES_IP__,
    port: +process.env.__TESTCONTAINERS_POSTGRES_PORT_5432__
  })

  beforeAll(async () => {
    await client.connect();
  })

  afterAll(async () => {
    await client.end();
  })

  test("Check that table was setup", async () => {
    await client.query(`
      insert into test_table (id, name)
      values (0, 'test');
    `)
  })
})
