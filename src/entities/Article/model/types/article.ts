export enum ArticleBlockType {
    TEXT='TEXT',
    IMAGE='IMAGE',
    CODE='CODE',
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
    IT = 'IT',
    SCIENCE = 'SCIENCE',
    ECONOMICS = 'ECONOMICS',
}

export interface Articles {
    id: string
    title: string
    subtitle: string
    img: string
    views: number
    createdAt: string
    type: ArticleTypes[]
    blocks: ArticleBlock[]
}
