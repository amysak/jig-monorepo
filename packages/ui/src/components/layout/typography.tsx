import { Typography } from "antd";
import { ParagraphProps } from "antd/es/typography/Paragraph";
import { TextProps } from "antd/es/typography/Text";
import { TitleProps } from "antd/es/typography/Title";
import { FC } from "react";

// export type TypographyProps = AntTypographyProps;

const { Text: AntText, Title: AntTitle, Paragraph: AntParagraph } = Typography;

export const Text: FC<TextProps> = (props) => {
  return <AntText {...props} />;
};

export const Title: FC<TitleProps> = (props) => {
  return <AntTitle {...props} />;
};

export const Paragraph: FC<ParagraphProps> = (props) => {
  return <AntParagraph {...props} />;
};
