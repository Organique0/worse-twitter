import { useFetchApi } from "./useFetchApi";
import { jwtDecode } from "jwt-decode";
export default () => {
	const useAuthToken = () => useState("auth_token");
	const useAuthUser = () => useState("auth_user");
	const useAuthLoading = () => useState("isAuthLoading", () => true);

	const setToken = (newToken) => {
		const AuthToken = useAuthToken();
		AuthToken.value = newToken;
	};

	const setUser = (newUser) => {
		const AuthUser = useAuthUser();
		AuthUser.value = newUser;
	};

	const setIsAuthLoading = (value) => {
		const AuthLoading = useAuthLoading();
		AuthLoading.value = value;
	};

	const login = ({ username, password }) => {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await $fetch("/api/auth/login", {
					method: "POST",
					body: {
						username,
						password,
					},
				});

				setToken(data.access_token);
				setUser(data.user);

				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	};

	const refreshToken = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await $fetch("/api/auth/refresh");
				setToken(data.access_token);
				setUser(data.user);
				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	};

	const getUser = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await useFetchApi("/api/auth/user");

				setUser(data.user);
				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	};

	const reRefreshAccessToken = () => {
		const authToken = useAuthToken();

		if (!authToken.value) {
			return;
		}

		const jwt = jwtDecode(authToken.value);

		const newRefreshTime = jwt.exp - 60000;

		setTimeout(async () => {
			await refreshToken();
			reRefreshAccessToken();
		}, newRefreshTime);
	};

	const initAuth = () => {
		return new Promise(async (resolve, reject) => {
			setIsAuthLoading(true);
			try {
				await refreshToken();
				await getUser();

				reRefreshAccessToken();

				resolve(true);
			} catch (error) {
				reject(error);
			} finally {
				setIsAuthLoading(false);
			}
		});
	};

	const logout = () => {
		return new Promise(async (resolve, reject) => {
			try {
				await useFetchApi("/api/auth/logout", {
					method: "POST",
				});
				setToken(null);
				setUser(null);
				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	};

	return {
		login,
		useAuthUser,
		useAuthToken,
		initAuth,
		useAuthLoading,
		logout,
	};
};
