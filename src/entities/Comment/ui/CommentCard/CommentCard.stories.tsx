import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentCard } from './CommentCard';

export default {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    comment: {
        id: '1',
        text: 'Привет',
        user: {
            id: '1',
            username: 'Eugen',
            avatar: 'https://sun1.megafon-nn.userapi.com/impg/1eGfLnaRFxojl0j6lfFZOmKm5WSDco0t3a-SQg/ZzugGbmbhfY.jpg?size=1765x2160&quality=95&sign=ba27a494e7186c14868a34ede45adc82&type=album',
        },
    },
};

export const isLoading = Template.bind({});
isLoading.args = {
    isLoading: true,
    comment: {
        id: '1',
        text: 'Привет',
        user: {
            id: '1',
            username: 'Eugen',
            avatar: 'https://sun1.megafon-nn.userapi.com/impg/1eGfLnaRFxojl0j6lfFZOmKm5WSDco0t3a-SQg/ZzugGbmbhfY.jpg?size=1765x2160&quality=95&sign=ba27a494e7186c14868a34ede45adc82&type=album',
        },
    },
};
