import React from 'react';

interface MySelectProps {
    options: { value: string, label: string }[]
    defaultValue: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const MySelect = ({options, defaultValue, value, onChange}: MySelectProps) => {
    return (
        <select
            value={value}
            onChange={onChange}
        >
            <option value={defaultValue} disabled>{defaultValue}</option>
            {options.map((option, index) => {
                return (
                    <option
                        key={index}
                        value={option.value}>{option.label}
                    </option>
                );
            })}
        </select>
    );
};

export default MySelect;