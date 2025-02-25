import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ClickCounts {
    [productId: number]: number;
}

interface ClickTrackingState {
    clickCounts: ClickCounts;
}

const initialState: ClickTrackingState = {
    clickCounts: {}
};

let lastClickTime = 0;
const CLICK_THRESHOLD = 200; // milliseconds

const clickTrackingSlice = createSlice({
    name: 'clickTracking',
    initialState,
    reducers: {
        trackProductClick: (state, action: PayloadAction<number>) => {
            const now = Date.now();
            
            // Prevent multiple clicks within threshold
            if (now - lastClickTime < CLICK_THRESHOLD) {
                return;
            }
            
            lastClickTime = now;
            const productId = action.payload;
            state.clickCounts[productId] = (state.clickCounts[productId] || 0) + 1;
            console.log(`Product ${productId} clicked. Total clicks: ${state.clickCounts[productId]}`);
        }, // let a={1:2,3:4,5:6} ->  2==a[1] == a["1"] 
        resetClickCounts: (state) => {
            state.clickCounts = {};
            lastClickTime = 0;
        }
    }
});

export const { trackProductClick, resetClickCounts } = clickTrackingSlice.actions;
export default clickTrackingSlice.reducer;
