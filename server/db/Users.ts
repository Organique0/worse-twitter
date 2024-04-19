import client from ".";
import bcrypt from "bcrypt";
import type { UserData } from "../api/auth/register.post";

export const createUser = (userData: UserData) => {
	const finalUserData = {
		...userData,
		password: bcrypt.hashSync(userData.password, 10),
	};
	return client.user.create({
		data: finalUserData,
	});
};

export const getUserByUsername = (username: string) => {
	return client.user.findUnique({
		where: {
			username,
		},
	});
};

export const getUserById = (UserId: string) => {
	return client.user.findUnique({
		where: {
			id: UserId,
		},
	});
};
