
import { useState, useCallback, useMemo } from 'react';

export interface FormState<T> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  loading: boolean;
  submitted: boolean;
}

export interface ValidationRule<T> {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: T) => string | null;
}

export type ValidationRules<T> = Partial<Record<keyof T, ValidationRule<any>>>;

export function useForm<T extends Record<string, any>>(
  initialData: T,
  validationRules?: ValidationRules<T>
) {
  const [state, setState] = useState<FormState<T>>({
    data: initialData,
    errors: {},
    touched: {},
    loading: false,
    submitted: false
  });

  const validateField = useCallback(<K extends keyof T>(
    field: K,
    value: T[K]
  ): string | null => {
    const rules = validationRules?.[field];
    if (!rules) return null;

    if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return 'Ce champ est requis';
    }

    if (typeof value === 'string') {
      if (rules.minLength && value.length < rules.minLength) {
        return `Minimum ${rules.minLength} caractères requis`;
      }
      if (rules.maxLength && value.length > rules.maxLength) {
        return `Maximum ${rules.maxLength} caractères autorisés`;
      }
      if (rules.pattern && !rules.pattern.test(value)) {
        return 'Format invalide';
      }
    }

    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  }, [validationRules]);

  const updateField = useCallback(<K extends keyof T>(
    field: K,
    value: T[K]
  ) => {
    setState(prev => {
      const error = validateField(field, value);
      const newErrors = { ...prev.errors };
      const newTouched = { ...prev.touched, [field]: true };
      
      if (error) {
        newErrors[field] = error;
      } else {
        delete newErrors[field];
      }

      return {
        ...prev,
        data: { ...prev.data, [field]: value },
        errors: newErrors,
        touched: newTouched,
        submitted: false
      };
    });
  }, [validateField]);

  const validateAll = useCallback(() => {
    const errors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    if (validationRules) {
      for (const field in validationRules) {
        const error = validateField(field, state.data[field]);
        if (error) {
          errors[field] = error;
          isValid = false;
        }
      }
    }

    setState(prev => ({ 
      ...prev, 
      errors,
      touched: Object.keys(prev.data).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    }));
    
    return isValid;
  }, [state.data, validationRules, validateField]);

  const reset = useCallback(() => {
    setState({
      data: initialData,
      errors: {},
      touched: {},
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

  const hasErrors = useMemo(() => {
    return Object.keys(state.errors).length > 0;
  }, [state.errors]);

  return {
    ...state,
    updateField,
    validateAll,
    reset,
    setLoading,
    setSubmitted,
    isValid,
    hasErrors
  };
}
