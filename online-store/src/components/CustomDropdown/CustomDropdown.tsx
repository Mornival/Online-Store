import { useState, useRef, useEffect } from 'react';
import './CustomDropdown.scss';

interface Option {
    value: string;
    label: string;
}

interface Props {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const ChevronIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"/>
    </svg>
);

const CustomDropdown = ({ options, value, onChange, placeholder }: Props) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selected = options.find(o => o.value === value);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`dd ${open ? 'dd--open' : ''}`} ref={ref}>
            <button className="dd__trigger" onClick={() => setOpen(!open)}>
                <span className="dd__trigger-text">
                    {selected?.label || placeholder || 'Выберите'}
                </span>
                <span className={`dd__trigger-arrow ${open ? 'dd__trigger-arrow--open' : ''}`}>
                    <ChevronIcon />
                </span>
            </button>
            {open && (
                <div className="dd__menu">
                    {options.map(opt => (
                        <button
                            key={opt.value}
                            className={`dd__option ${opt.value === value ? 'dd__option--active' : ''}`}
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
