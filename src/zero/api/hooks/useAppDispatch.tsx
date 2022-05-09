import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/configureStore';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()