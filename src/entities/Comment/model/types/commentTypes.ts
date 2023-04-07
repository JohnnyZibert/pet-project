import { User } from 'entities/User';

export interface CommentTypes {
    id: string
    user: User
    text: string
}
