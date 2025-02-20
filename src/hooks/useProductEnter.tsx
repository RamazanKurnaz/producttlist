import { useCallback } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { trackProductClick } from '../store/clickTrackingSlice';

export const useProductEnter = () => {
    const dispatch = useAppDispatch();
    
    const handleProductClick = useCallback((productId: number) => {
        dispatch(trackProductClick(productId));
    }, [dispatch]);

    return handleProductClick;
};
