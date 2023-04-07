import React from 'react';

export interface SidebarItemType {
    text?: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>
    path: string
    authOnly?: boolean
}
