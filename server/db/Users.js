import client from ".";
import bcrypt from "bcrypt";

export const createUser = (userData) => {
	const finalUserData = {
		...userData,
		password: bcrypt.hashSync(userData.password, 10),
	};
	return client.user.create({
		data: finalUserData,
	});
};

export const getUserByUsername = (username) => {
	return client.user.findUnique({
		where: {
			username,
		},
	});
};
