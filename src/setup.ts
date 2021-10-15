const containerSetup = require('@trendyol/jest-testcontainers/dist/setup')
import type {
  JestTestcontainersConfig,
  SingleContainerConfig,
  DockerComposeConfig
} from '@trendyol/jest-testcontainers/dist/config'
import { setGlobalsWithJsonString } from '@trendyol/jest-testcontainers/dist/environment'
import { existsSync } from 'fs';
import { resolve, isAbsolute } from 'path';

interface DockerComposeConfigWithSetup extends DockerComposeConfig {
  setup: () => Promise<void>
}

type ContainerConfigWithSetup =
  { [key: string]: SingleContainerConfigWithSetup }
  | { dockerCompose?: DockerComposeConfigWithSetup }

interface SingleContainerConfigWithSetup extends SingleContainerConfig {
  setup: () => Promise<void>
}

async function setup(opts: any) {
  await containerSetup(opts);

  const containerConfig = readConfig(process.env.JEST_TESTCONTAINERS_CONFIG_PATH) as ContainerConfigWithSetup;
  const globals = require('@trendyol/jest-testcontainers/dist/global.vars.json');
  setGlobalsWithJsonString(process.env, JSON.stringify(globals))

  if (containerConfig.dockerCompose) {
    await containerSetup.dockerCompose.setup();
  } else {
    const setups = Object.values(containerConfig).map(container => container.setup?.());
    await Promise.all(setups)
  }
}

function getConfigPath(envValue?: string): string {
  if (!envValue) {
    return resolve(process.cwd(), "jest-testcontainers-config.js");
  }
  if (isAbsolute(envValue)) {
    return envValue;
  }
  return resolve(process.cwd(), envValue);
}

function readConfig(envValue?: string): JestTestcontainersConfig {
  const configPath = getConfigPath(envValue);

  return require(configPath);
}

module.exports = setup;
