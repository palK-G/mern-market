const create = (params, credentials, store) => {
	return fetch("/api/stores/by/"+ params.userId, {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Authorization": "Bearer " + credentials.t
		},
		body: store
	})
		.then((response) => {
			return response.json();
		}).catch((err) => console.log(err));
};

const list = () => {
	return fetch("/api/stores", {
		method: "GET",
	}).then(response => {
		return response.json();
	}).catch((err) => console.log(err));
};

const listByOwner = (params, credentials) => {
	return fetch("/api/stores/by/"+params.userId, {
		method: "GET",
		headers: {
			"Accept": "application/json",
			"Authorization": "Bearer " + credentials.t
		}
	}).then((response) => {
		return response.json();
	}).catch((err) => {
		console.log(err);
	});
};

const read = (params, credentials) => {
	return fetch("/api/store/" + params.storeId, {
		method: "GET"
	}).then((response) => {
		return response.json();
	}).catch((err) => console.log(err));
};

const update = (params, credentials, store) => {
	return fetch("/api/stores/" + params.storeId, {
		method: "PUT",
		headers: {
			"Accept": "application/json",
			"Authorization": "Bearer " + credentials.t
		},
		body: store
	}).then((response) => {
		return response.json();
	}).catch((err) => {
		console.log(err);
	});
};

const remove = (params, credentials) => {
	return fetch("/api/stores/" + params.storeId, {
		method: "DELETE",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": "Bearer " + credentials.t
		}
	}).then((response) => {
		return response.json();
	}).catch((err) => {
		console.log(err);
	});
};

export {
	create,
	list,
	listByOwner,
	read,
	update,
	remove
};
