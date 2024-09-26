import { ICity } from "../components/City/city-list";

interface CityState {
  cities: ICity[];
  isLoadingCities: boolean;
  currentCity: ICity | null;
  error: string
}

type CityAction = { type: 'loading' } 
  | { type: 'cities/loaded', payload: ICity[] } 
  | { type: 'cities/created', payload: ICity } 
  | { type: 'city/loaded', payload: ICity }
  | { type: 'cities/deleted', payload: number }
  | { type: 'rejected', payload: string };
                


export const INITIAL_STATE = {
  cities: [],
  isLoadingCities: false,
  currentCity: null,
  error: ''
}

export function reducerCities(state: CityState, action: CityAction) {
  switch(action.type) {
    case 'loading':
      return { ...state, isLoadingCities: true };
      
    case 'cities/loaded':
      return { ...state, cities: action.payload, isLoadingCities: false };

    case 'city/loaded':
      return { ...state, currentCity: action.payload, isLoadingCities: false };

    case 'cities/created':
      return { ...state, cities: [...state.cities, action.payload], isLoadingCities: false };

    case 'cities/deleted':
      return { ...state, cities: state.cities.filter(city => city.id !== action.payload), isLoadingCities: false };

    case 'rejected':
      return { ...state, error: action.payload, isLoadingCities: false };
    
    default:
      throw new Error(`Unhandled action type`);
  }
}