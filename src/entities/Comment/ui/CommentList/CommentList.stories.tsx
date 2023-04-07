import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentList } from './CommentList';

export default {
    title: 'entities/Comment/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    comments: [{
        id: '1',
        text: 'helo world',
        user: { id: '1', username: 'Sanya' },
    },
    {
        id: '2',
        text: 'Ага, привет',
        user: { id: '2', username: 'Sanya' },
    }],
};
export const isLoading = Template.bind({});
isLoading.args = {
    comments: [],
    isLoading: true,
};
