import type { User } from "@prisma/client";
import { UserWithoutPass } from "../api/user/tweets/index.post";



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
