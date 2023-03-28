import React, { ChangeEvent, memo, useMemo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

interface SelectOptions{
    value: string
    content: string
}

export interface SelectProps {
    className?: string
    label?: string
    options?:SelectOptions[]
    value?: string
    onChange?: (value: string) => void
    readonly?: boolean
}

export const Select = memo((props:SelectProps) => {
    const {
        className, label, options, value, onChange, readonly,
    } = props;

    const onChangeHandle = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

    const optionList = useMemo(() => options?.map((opt) => (
        <option
            value={opt.value}
            className={cls.options}
            key={opt.value}
        >
            {opt.content}
        </option>
    )), [options]);

    const mods: Mods = {};
    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && <span className={cls.label}>{`${label}>`}</span>}
            <select
                name=""
                id=""
                disabled={readonly}
                className={cls.select}
                value={value}
                onChange={onChangeHandle}
            >
                {optionList}
            </select>
        </div>
    );
});
