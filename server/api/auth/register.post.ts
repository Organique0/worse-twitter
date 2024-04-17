import type { User } from "@prisma/client";
import { createUser } from "~/server/db/Users";
import { userTransformer } from "~/server/transformers/users";

export interface UserData {
	username: string,
	email: string,
	password: string,
	name: string,
	profileImage: string,
}

export default defineEventHandler(async (event) => {
	const { body } = await readBody(event);

	const { username, email, password, repeatPassword, name } = body;

	if (!username || !email || !password || !repeatPassword || !name) {
		return sendError(
			event,
			createError({ statusCode: 400, statusMessage: "Invalid params" })
		);
	}

	if (password !== repeatPassword) {
		return sendError(
			event,
			createError({ statusCode: 400, statusMessage: "Passwords do not match" })
		);
	}

	const userData: UserData = {
		username,
		email,
		password,
		name,
		profileImage: "https://picsum.photos/200/200",
	};

	const user: User = await createUser(userData);

	return {
		body: userTransformer(user),
	};
});
