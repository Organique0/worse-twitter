import type { User } from "@prisma/client";

interface UserWithoutPass extends Omit<User, 'password' | 'createdAt' | 'updatedAt'> {
	handle: string,
}

export const userTransformer = (user: User): UserWithoutPass => {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		username: user.username,
		profileImage: user.profileImage,
		handle: "@" + user.username,
	};
};
