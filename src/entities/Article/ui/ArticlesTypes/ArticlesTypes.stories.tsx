import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticlesTypes } from './ArticlesTypes';

export default {
    title: 'shared/ArticlesTypes',
    component: ArticlesTypes,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesTypes>;

const Template: ComponentStory<typeof ArticlesTypes> = (args) => <ArticlesTypes {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
