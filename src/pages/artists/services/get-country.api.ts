export const GetCountries = async (): Promise<ICountry[]> => {
  const res = await fetch('https://restcountries.com/v2/all?fields=name,alpha3Code');
  const data = await res.json();
  return data.map((x: { name: string; alpha3Code: string }) => ({ key: x.alpha3Code, name: x.name }));
};

export interface ICountry {
  key: string;
  name: string;
}
