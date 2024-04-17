import { getUserByUsername } from "~/server/db/Users";
import bcrypt from "bcrypt";
import { generateTokens, sendRefreshToken } from "~/server/utils/jwt";
import { userTransformer } from "~/server/transformers/users";
import { createRefreshToken } from "~/server/db/refreshTokens";

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const { username, password } = body;

	if (!username || !password) {
		return sendError(
			event,
			createError({ statusCode: 400, statusMessage: "Invalid params" })
		);
	}

	const user = await getUserByUsername(username);

	if (!user) {
		return sendError(
			event,
			createError({ statusCode: 400, statusMessage: "Invalid credentials" })
		);
	}

	const passwordMatch = await bcrypt.compare(password, user.password);

	if (!passwordMatch) {
		return sendError(
			event,
			createError({ statusCode: 400, statusMessage: "Passwords do not match" })
		);
	}

	const { accessToken, refreshToken } = generateTokens(user);

	await createRefreshToken(user.id, refreshToken);

	sendRefreshToken(event, refreshToken);

	return {
		access_token: accessToken,
		user: userTransformer(user),
	};
});
