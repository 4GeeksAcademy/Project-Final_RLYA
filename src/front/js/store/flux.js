import axios from "axios";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: {},
			statusLogin: false,
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			//Función de login
			 login: async (email, password) => {
				console.log(password, email);
			 	try {
			 		let data = await axios.post("https://psychic-pancake-4j77gvj7q5vpfqjpj-3001.app.github.dev/api/login", { 
			 			"email": email,
			 			"password": password
			 		})
			 		console.log(data);     
			 		 localStorage.setItem("token", data.data.dataUser.token);
			 		 setStore({ statusLogin: true, user:data.data.dataUser})
			 		return true;
			 	} catch (error) {
			 		console.log(error);
			 		// if (error.response.status === 404) {
			 		// 	alert(error.response.data.msg)
			 		// }
			 		return false;

			 	}
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
