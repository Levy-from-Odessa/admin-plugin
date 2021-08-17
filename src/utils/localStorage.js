

export const setLocalStorage = (name, value) => {
	localStorage.setItem(name,  JSON.stringify(value));
}
export const getLocalStorage = (name) => {
	const value  = localStorage.getItem(name); 
	return value ? JSON.parse(value) : ''
}
