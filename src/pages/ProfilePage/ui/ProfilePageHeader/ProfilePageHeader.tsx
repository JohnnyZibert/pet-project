import React, { useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import {
    fetchUpdateData, getProfileData, getProfileReadonly, profileActions,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getUserAuthData } from 'entities/User';
import cls from './ProfilePageHeader.module.scss';

export interface ProfilePageHeaderProps {
    className?: string
}

export const ProfilePageHeader = ({ className }:ProfilePageHeaderProps) => {
    const { t } = useTranslation('profile');

    // Юзер может меня только свои данные
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;

    const dispatch = useAppDispatch();

    const readonly = useSelector(getProfileReadonly);

    const onEditBtn = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelBtn = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSaveBtn = useCallback(() => {
        dispatch(fetchUpdateData());
    }, [dispatch]);

    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('Профиль')} />
            {canEdit && (
                <div className={cls.btnsWrapper}>
                    {readonly ? (
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            className="editBtn"
                            onClick={onEditBtn}
                        >
                            {t('Редактировать')}
                        </Button>
                    )
                        : (
                            <div className={cls.buttons}>
                                <Button
                                    theme={ButtonTheme.OUTLINE_RED}
                                    className="cancelBtn"
                                    onClick={onCancelBtn}
                                >
                                    {t('Отменить')}
                                </Button>
                                <Button
                                    theme={ButtonTheme.OUTLINE}
                                    className="saveBtn"
                                    onClick={onSaveBtn}
                                >
                                    {t('Сохранить')}
                                </Button>
                            </div>
                        )}
                </div>
            )}
        </div>

    );
};
