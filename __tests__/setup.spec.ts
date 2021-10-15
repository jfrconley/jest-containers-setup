import {Client} from 'pg'

describe('Verify Setup', () => {
  const client = new Client({
    user: 'admin',
    password: 'coolpassword',
    database: 'admin',
    host: (global as any).__TESTCONTAINERS_POSTGRES_IP__,
    port: +(global as any).__TESTCONTAINERS_POSTGRES_PORT_5432__
  })

  beforeAll(async () => {
    await client.connect();
  })

  test("Check that table was setup", async () => {
    await client.query(`
      insert into test_table (id, name)
      values (0, 'test');
    `)
  })
})
