import { Tag as AntTag, TagProps as AntTagProps } from 'antd'
import React, { FC } from 'react'

type TagProps = AntTagProps

export const Tag: FC<TagProps> = (props) => {
    return <AntTag {...props} />
}
