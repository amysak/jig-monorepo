import { Popover as AntPopover, PopoverProps as AntPopoverProps } from 'antd'
import React, { FC } from 'react'

type PopoverProps = AntPopoverProps

export const Popover: FC<PopoverProps> = (props) => {
    return <AntPopover {...props} />
}
