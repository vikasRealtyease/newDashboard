"use client";

import React from "react";
import PhoneInputWithCountry from "react-phone-number-input";

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
        </div>
    );
}
