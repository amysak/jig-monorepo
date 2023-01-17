import { Typography } from 'antd'
import { ParagraphProps as AntParagraphProps } from 'antd/lib/typography/Paragraph'
import { TextProps as AntTextProps } from 'antd/lib/typography/Text'
import { TitleProps as AntTitleProps } from 'antd/lib/typography/Title'
import * as React from 'react'
import { FC } from 'react'
const { Text: AntText, Title: AntTitle, Paragraph: AntParagraph } = Typography

/* #region  Text */

type TextProps = AntTextProps

export const Text: FC<TextProps> = (props) => <AntText {...props} />
/* #endregion */

/* #region  Title */

type TitleProps = AntTitleProps

export const Title: FC<TitleProps> = (props) => <AntTitle {...props} />
/* #endregion */

/* #region  Paragraph */

type ParagraphProps = AntParagraphProps

export const Paragraph: FC<ParagraphProps> = (props) => (
    <AntParagraph {...props} />
)
/* #endregion */
