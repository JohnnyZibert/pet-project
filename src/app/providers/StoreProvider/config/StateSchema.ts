import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { ProfileSchema } from 'entities/Profile';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entities/Article';
import {
    ArticleDetailsCommentsSchema,
    ArticleDetailsRecommendationSchema,
    ArticlesDetailsPageSchema,
} from 'pages/AcrticleDetailsPage';
import { AddCommentFormSchema } from 'features/AddCommentForm/model/types/addCommentFormSchema';
import { ArticlePageSchema } from 'pages/ArticlesPage';
import { SaveScrollSchema } from 'features/SaveScrollPosition/model/types/SaveScrollSchema';

export interface StateSchema {
    user: UserSchema;
    scrollPosition: SaveScrollSchema

    // Асинхронные редюсеры
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema
    addCommentForm?: AddCommentFormSchema
    articlePage?: ArticlePageSchema
    articlesDetailsPage?: ArticlesDetailsPageSchema
}

export type StateSchemaKey = keyof StateSchema;

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;

    // монтирование редьюсора
    getMountedReducers: ()=>MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StateSchema
}
