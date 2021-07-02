import { container } from 'tsyringe';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import StorageProvider from './models/StorageProvider';

container.registerSingleton<StorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
)