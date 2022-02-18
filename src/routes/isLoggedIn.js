const isLogin = () => {
	const session = sessionStorage.getItem("session");
	if (session) {
		return JSON.parse(session);
	}

	return false;
};

const getUser = () => {
	const loggedUser = isLogin();

	if (loggedUser) {
		const user = loggedUser?.id;
		return user;
	}

	return false;
};

export { isLogin, getUser };
