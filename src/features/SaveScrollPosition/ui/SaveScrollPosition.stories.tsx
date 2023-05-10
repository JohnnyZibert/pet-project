import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SaveScrollPosition } from './SaveScrollPosition';

export default {
    title: 'features/SaveScrollPosition',
    component: SaveScrollPosition,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SaveScrollPosition>;

const Template: ComponentStory<typeof SaveScrollPosition> = (args) => <SaveScrollPosition {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
