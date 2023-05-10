import { User } from 'entities/User';

export enum ArticleSortField {
    VIEWS = 'views',
    TITLE = 'title',
    CREATED = 'createAt',
}

export enum ArticleBlockType {
    TEXT='TEXT',
    IMAGE='IMAGE',
    CODE='CODE',
}

export enum ArticleView {
    BIG='BIG',
    SMALL='SMALL',
}

export interface ArticleBlockBase {
    id: string,
    type: ArticleBlockType,
}

export interface ArticleCodeBlock extends ArticleBlockBase{
    type: ArticleBlockType.CODE
    code: string
}
export interface ArticleImageBlock extends ArticleBlockBase{
    type: ArticleBlockType.IMAGE
    src: string
    title: string
}
export interface ArticleTextBlock extends ArticleBlockBase{
    type: ArticleBlockType.TEXT
    title?: string
    paragraphs: string[]
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock

export enum ArticleTypes {
    ALL = 'ALL',
    IT = 'IT',
    SCIENCE = 'SCIENCE',
    ECONOMICS = 'ECONOMICS',
}

export interface Article {
    id: string
    user: User
    title: string
    subtitle: string
    img: string
    views: number
    createdAt: string
    type: ArticleTypes[]
    blocks: ArticleBlock[]
}
