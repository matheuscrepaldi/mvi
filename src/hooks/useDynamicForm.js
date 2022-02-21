import { useState } from "react";

export default function useDynamicForm(initialState = {}) {
	const [fields, setFields] = useState(initialState);

	const handleInputChange = (e) => {
		e.preventDefault();

		const id = e.target.id;
		let value = e.target.value;

		setFields({ ...fields, [`${id}`]: value });
	};

	return {
		fields,
		setFields,
		handleInputChange,
	};
}
