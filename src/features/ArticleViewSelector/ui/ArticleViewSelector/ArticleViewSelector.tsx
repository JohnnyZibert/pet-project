import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleView } from 'entities/Article';
import { Icon } from 'shared/ui/Icon/Icon';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './ArticleViewSelector.module.scss';
import ListIcon from '../../../../shared/assets/icons/bi_list.svg';
import TiledIcon from '../../../../shared/assets/icons/fe_tiled.svg';

export interface ArticleViewSelectorProps {
    className?: string
    view: ArticleView
    onViewClick?:(view: ArticleView)=> void
}

const viewTypes = [
    {
        view: ArticleView.BIG,
        icon: ListIcon,
    }, {
        view: ArticleView.SMALL,
        icon: TiledIcon,
    },

];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => (
                <Button
                    theme={ButtonTheme.CLEAR}
                    onClick={onClick(viewType.view)}
                >
                    <Icon
                        Svg={viewType.icon}
                        className={classNames(
                            '',
                            {},
                            [className, viewType.view === view ? cls.selected : cls.noSelected],
                        )}

                    />
                </Button>
            ))}

        </div>
    );
});
