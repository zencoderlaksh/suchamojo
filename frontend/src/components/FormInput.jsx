import React from "react";

/**
 * Reusable Form Input Component
 * Use this component for consistent styling across all forms
 *
 * @param {string} label - Field label text
 * @param {string} id - Input id and htmlFor attribute
 * @param {string} type - Input type (text, email, password, tel, number, etc.)
 * @param {string} placeholder - Placeholder text
 * @param {object} register - React Hook Form register function
 * @param {object} error - Error object from form state
 * @param {string} helperText - Optional helper text below input
 * @param {boolean} required - Show asterisk (*) for required fields
 * @param {string} className - Additional custom classes
 */
const FormInput = ({
  label,
  id,
  type = "text",
  placeholder,
  register,
  error,
  helperText,
  required = false,
  className = "",
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-200 mb-2"
        >
          {label} {required && <span className="text-orange-400">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        className={`w-full rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none transition duration-300 focus:-translate-y-0.5 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)] ${
          error ?
            "border-red-500/50 focus:border-red-500/50"
          : "border-white/15 focus:border-white/40 focus:bg-white/10"
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error.message}</p>}
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-gray-400">{helperText}</p>
      )}
    </div>
  );
};

export default FormInput;
