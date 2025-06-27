
import { useState, useCallback, useMemo } from 'react';

export interface FormState<T> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  loading: boolean;
  submitted: boolean;
}

export function useOptimizedForm<T extends Record<string, any>>(
  initialData: T,
  validationRules?: Partial<Record<keyof T, (value: any) => string | null>>
) {
  const [state, setState] = useState<FormState<T>>({
    data: initialData,
    errors: {},
    loading: false,
    submitted: false
  });

  const updateField = useCallback(<K extends keyof T>(
    field: K,
    value: T[K]
  ) => {
    setState(prev => {
      const newErrors = { ...prev.errors };
      
      // Validation en temps réel si des règles sont définies
      if (validationRules?.[field]) {
        const error = validationRules[field]!(value);
        if (error) {
          newErrors[field] = error;
        } else {
          delete newErrors[field];
        }
      }

      return {
        ...prev,
        data: { ...prev.data, [field]: value },
        errors: newErrors,
        submitted: false
      };
    });
  }, [validationRules]);

  const validateForm = useCallback(() => {
    if (!validationRules) return true;

    const errors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    for (const [field, validator] of Object.entries(validationRules)) {
      const error = validator(state.data[field as keyof T]);
      if (error) {
        errors[field as keyof T] = error;
        isValid = false;
      }
    }

    setState(prev => ({ ...prev, errors }));
    return isValid;
  }, [state.data, validationRules]);

  const resetForm = useCallback(() => {
    setState({
      data: initialData,
      errors: {},
      loading: false,
      submitted: false
    });
  }, [initialData]);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setSubmitted = useCallback((submitted: boolean) => {
    setState(prev => ({ ...prev, submitted }));
  }, []);

  const isValid = useMemo(() => {
    return Object.keys(state.errors).length === 0;
  }, [state.errors]);

  return {
    ...state,
    updateField,
    validateForm,
    resetForm,
    setLoading,
    setSubmitted,
    isValid
  };
}
