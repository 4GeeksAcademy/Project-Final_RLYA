import axios from "axios";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: {},
			statusLogin: false,
			messageError: undefined
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			//Función de login
			login: async (email, password) => {
				setStore({ ...getStore(), messageError: undefined })
				try {
					let data = await axios.post("https://potential-waddle-945gvq99v7f76r7-3001.app.github.dev/api/login", {
						"email": email,
						"password": password
					})
					console.log(data);
					localStorage.setItem("token", data.data.dataUser.token);
					setStore({ statusLogin: true, user: data.data.dataUser })
					return true;
				} catch (error) {
					console.log(error);
					console.log(error.response.data.msg)
					if (error.response.status > 399) {
						setStore({ ...getStore(), messageError: error.response.data.msg })
					}
					return false;

				}
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			ValidToken: async () => {
				try {
					const token = localStorage.getItem("token")
					const response = await axios.get(`https://potential-waddle-945gvq99v7f76r7-3001.app.github.dev/api/validToken`, {
						headers: { "Authorization": "Bearer " + token }
					})
					if (response.status == 200) {
						setStore({ ...getStore(), statusLogin: true })
					}
				} catch (error) {
					if (error.response.status > 400) {
						console.log(error)
						getActions().Logout()
					}
				}

			},
			Logout: () => {
				localStorage.removeItem("token")
				setStore({ statusLogin: false, user: {} })
			}
		}
	};
};

export default getState;
