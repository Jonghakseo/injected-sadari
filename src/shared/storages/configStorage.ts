import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

type Config = {
  isActivated: boolean;
  victim: string;
  target: string;
};

type ConfigStorage = BaseStorage<Config> & {};

const storage = createStorage<Config>(
  'config-storage-key',
  {
    isActivated: true,
    victim: 'VICTIM',
    target: 'TARGET KEYWORD',
  },
  {
    storageType: StorageType.Local,
    liveUpdate: true,
  },
);

const configStorage: ConfigStorage = {
  ...storage,
};

export default configStorage;
