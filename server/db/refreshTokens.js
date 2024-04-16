import client from ".";
export const createRefreshToken = (refreshToken) => {
	return client.refreshToken.create({
		data: refreshToken,
	});
};
