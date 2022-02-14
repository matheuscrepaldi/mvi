const isLogin = () => {
	const session = sessionStorage.getItem("session");
	if (session) {
		return JSON.parse(session);
	}

	return false;
};

const getOwner = () => {
	const loggedUser = isLogin();

	if (loggedUser) {
		const properties = loggedUser.funeraria?.split(", ");
		let obj = {};
		properties.forEach(function (property) {
			const tup = property.split("=");
			obj[tup[0]] = tup[1];
		});

		return obj;
	}

	return false;
};

export { isLogin, getOwner };
