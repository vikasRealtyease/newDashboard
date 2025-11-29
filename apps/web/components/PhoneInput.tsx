"use client";

import React from "react";
import PhoneInputWithCountry from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface PhoneInputProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
}

export function PhoneInput({ label, value, onChange, placeholder, required }: PhoneInputProps) {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <PhoneInputWithCountry
                international
                countryCallingCodeEditable={true}
                defaultCountry="US"
                value={value}
                onChange={(val) => onChange(val || "")}
                placeholder={placeholder}
                className="phone-input-wrapper"
            />
            <style jsx global>{`
                .phone-input-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    border: 1px solid #d1d5db;
                    border-radius: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: white;
                    transition: all 0.2s;
                    height: 2.75rem;
                }

                @media (prefers-color-scheme: dark) {
                    .phone-input-wrapper {
                        border-color: #4b5563;
                        background: #1f2937;
                    }
                }

                .phone-input-wrapper:focus-within {
                    border-color: #1ca2dc;
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(28, 162, 220, 0.1);
                }

                /* Country selector */
                .PhoneInputCountry {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding-right: 0.75rem;
                    border-right: 1px solid #e5e7eb;
                    cursor: pointer;
                    position: relative;
                }

                @media (prefers-color-scheme: dark) {
                    .PhoneInputCountry {
                        border-right-color: #4b5563;
                    }
                }

                .PhoneInputCountrySelect {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    cursor: pointer;
                    z-index: 1;
                    font-size: 0.875rem;
                    color: #111827 !important;
                    background: white !important;
                }

                @media (prefers-color-scheme: dark) {
                    .PhoneInputCountrySelect {
                        color: #f3f4f6 !important;
                        background: #1f2937 !important;
                    }
                }

                .PhoneInputCountrySelect option {
                    color: #111827 !important;
                    background: white !important;
                    padding: 0.5rem;
                }

                @media (prefers-color-scheme: dark) {
                    .PhoneInputCountrySelect option {
                        color: #f3f4f6 !important;
                        background: #1f2937 !important;
                    }
                }

                .PhoneInputCountryIcon {
                    width: 1.5rem;
                    height: 1.125rem;
                    border-radius: 0.125rem;
                    overflow: hidden;
                    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
                }

                .PhoneInputCountryIconImg {
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                /* Hide the default arrow */
                .PhoneInputCountrySelectArrow {
                    display: none;
                }

                /* Country code display */
                .PhoneInputCountry .PhoneInputCountrySelect + * {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    pointer-events: none;
                }

                /* Phone number input */
                .PhoneInputInput {
                    flex: 1;
                    border: none;
                    outline: none;
                    font-size: 0.875rem;
                    background: transparent;
                    color: #111827 !important;
                    min-width: 0;
                }

                @media (prefers-color-scheme: dark) {
                    .PhoneInputInput {
                        color: #f3f4f6 !important;
                    }
                }

                .PhoneInputInput::placeholder {
                    color: #9ca3af !important;
                }

                .PhoneInputInput:focus {
                    outline: none;
                }
            `}</style>
        </div>
    );
}
