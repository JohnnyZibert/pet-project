import React, { ChangeEvent, memo, useMemo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOptions<T extends string>{
    value: T
    content: string
}

export interface SelectProps<T extends string>{
    className?: string
    label?: string
    options?:SelectOptions<T>[]
    value?: T
    onChange?: (value: T) => void
    readonly?: boolean
}

export const Select = <T extends string>(props:SelectProps<T>) => {
    const {
        className, label, options, value, onChange, readonly,
    } = props;

    const onChangeHandle = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
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
};
