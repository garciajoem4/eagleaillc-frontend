import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Custom typed hooks for Redux usage throughout the application
// These hooks provide proper TypeScript inference and autocompletion

/**
 * Typed version of useDispatch hook
 * Use this instead of the plain useDispatch hook
 * @returns Dispatch function with proper typing
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed version of useSelector hook  
 * Use this instead of the plain useSelector hook
 * @param selector - Function to select state from the store
 * @returns Selected state with proper typing
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Alternative hook names for consistency with existing codebase patterns
export const useReduxDispatch = useAppDispatch;
export const useReduxSelector = useAppSelector;