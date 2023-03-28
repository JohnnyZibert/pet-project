import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { classNames } from 'shared/lib/classNames/classNames';
import { Country } from '../../model/types/country';

export interface CountySelectProps {
    className?: string
    value?: Country
    onChange?: (value: Country) => void
    readonly?: boolean
}

const options = [
    { value: Country.ARMENIA, content: Country.ARMENIA },
    { value: Country.BELORUS, content: Country.BELORUS },
    { value: Country.GEORGIA, content: Country.GEORGIA },
    { value: Country.RUSSIA, content: Country.RUSSIA },
    { value: Country.KAZAHSTAN, content: Country.KAZAHSTAN },
];

export const CountrySelect = memo((props:CountySelectProps) => {
    const {
        className,
        value,
        onChange,
        readonly,
    } = props;
    const { t } = useTranslation('profile');
    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);
    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('Укажите страну')}
            options={options}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
});
