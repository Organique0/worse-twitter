import type { User } from "@prisma/client";
import jwt from "jsonwebtoken";

const generateAccessToken = (user: User) => {
	const config = useRuntimeConfig();

	return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
		expiresIn: "10m",
	});
};

const generateRefreshToken = (user: User) => {
	const config = useRuntimeConfig();

	return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
		expiresIn: "4h",
	});
};

export const generateTokens = (user: User) => {
	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user);
	return {
		accessToken,
		refreshToken,
	};
};

export const sendRefreshToken = (event: any, token: string) => {
	setCookie(event, "refresh_token", token, {
		httpOnly: true,
		sameSite: true,
	});
};