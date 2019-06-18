const CEP_BASE_URL = 'https://viacep.com.br';
const MAPS_BASE_URL = 'https://maps.googleapis.com/maps/api';
export const MAPS_API_KEY = process.env.MAPS_API_KEY;

const requestGet = async URL => {
	try {
		const res = await fetch(URL);

		if(!res.ok) throw new Error(res.statusText);

		const data = await res.json();

		if(data.error_message || data.erro) throw new Error();

		return data;
	} catch(err) {
		console.error(err);
		throw new Error(err);
	}
}

export const getAddressByZip = async zipCode => await requestGet(`${CEP_BASE_URL}/ws/${zipCode}/json`);
export const getGeolocation = async query => await requestGet(`${MAPS_BASE_URL}/geocode/json?address=${encodeURI(query)}&key=${MAPS_API_KEY}`);