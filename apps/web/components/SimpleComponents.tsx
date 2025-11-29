// Simple component replacements to avoid Subframe dependencies

export function Badge({ children, variant = "default", icon, className = "" }: {
    children: React.ReactNode;
    variant?: string;
    icon?: React.ReactNode;
    className?: string;
}) {
    const variantClasses = {
        brand: "bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-400 border-brand-primary/20 dark:border-brand-primary/30",
        default: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700"
    };

    return (
        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.default} ${className}`}>
            {icon}
            {children}
        </span>
    );
}

export function Button({ children, variant = "default", size = "default", iconRight, icon, className = "", onClick, disabled, type }: {
    children: React.ReactNode;
    variant?: string;
    size?: string;
    iconRight?: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}) {
    const variantClasses = {
        "brand-primary": "bg-brand-primary text-white hover:bg-brand-600 disabled:bg-gray-400 disabled:cursor-not-allowed",
        "brand-tertiary": "bg-brand-100 text-brand-700 hover:bg-brand-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
        "neutral-secondary": "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
        default: "bg-[#1CA2DC] text-white hover:bg-[#1891c3] disabled:bg-gray-400 disabled:cursor-not-allowed"
    };

    const sizeClasses = {
        large: "px-6 py-3 text-lg",
        default: "px-4 py-2 text-base"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.default} ${sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.default} ${className}`}
        >
            {icon}
            {children}
            {iconRight}
        </button>
    );
}

export function TextField({ label, type = "text", placeholder, value, onChange, error, required, className = "" }: {
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    className?: string;
}) {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className={`rounded-lg border px-4 py-2 text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-800 placeholder:text-neutral-400 transition-colors ${error ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-700'} focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20`}
            />
            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    );
}


export function LinkButton({ children, href, className = "" }: {
    children: React.ReactNode;
    href: string;
    className?: string;
}) {
    return (
        <a href={href} className={`inline-flex items-center gap-2 text-brand-primary hover:text-brand-600 font-medium transition-colors ${className}`}>
            {children}
        </a>
    );
}

export function Progress({ value, max = 100, className = "" }: {
    value: number;
    max?: number;
    className?: string;
}) {
    const percentage = (value / max) * 100;
    return (
        <div className={`w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden ${className}`}>
            <div
                className="bg-brand-primary h-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
}

export function CheckboxCard({ children, checked, onChange, className = "" }: {
    children: React.ReactNode;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    className?: string;
}) {
    return (
        <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${checked ? 'border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10' : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'} ${className}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange?.(e.target.checked)}
                className="w-5 h-5 rounded border-neutral-300 text-brand-primary focus:ring-brand-primary"
            />
            <div className="flex-1">{children}</div>
        </label>
    );
}

export function IconWithBackground({ icon, size = "default", className = "" }: {
    icon: React.ReactNode;
    size?: string;
    className?: string;
}) {
    const sizeClasses = {
        large: "h-16 w-16",
        default: "h-12 w-12"
    };

    return (
        <div className={`flex items-center justify-center rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-400 ${sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.default} ${className}`}>
            {icon}
        </div>
    );
}

export function OAuthSocialButton({ provider, onClick, className = "" }: {
    provider: string;
    onClick?: () => void;
    className?: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors ${className}`}
        >
            Continue with {provider}
        </button>
    );
}
