import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import StorageProvider from '@shared/container/providers/StorageProvider/models/StorageProvider';

interface Request {
	user_id: string;
	avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('StorageProvider')
		private storageProvider: StorageProvider,
	) {}


	public async execute({ user_id, avatarFilename }: Request): Promise<User> {

		const user = await this.usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('Only authenticated users can change avatar.', 401);
		}

		if (user.avatar) {
			await this.storageProvider.deleteFile(user.avatar)
		}

		const fileName = await this.storageProvider.saveFile(avatarFilename);

		user.avatar = avatarFilename;

		await this.usersRepository.save(user);

		return user;
	}
}

export default UpdateUserAvatarService;
