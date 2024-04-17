import client from ".";
export const createRefreshToken = (userId: string, refreshToken: string) => {
	return client.refreshToken.create({
		data: {
			token: refreshToken,
			User: { connect: { id: userId } }
		},
	});
};

