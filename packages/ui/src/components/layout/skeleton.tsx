import {
  Skeleton as AntSkeleton,
  SkeletonProps as AntSkeletonProps,
} from "antd";
import { SkeletonButtonProps as AntSkeletonButtonProps } from "antd/lib/skeleton/Button";
import { SkeletonInputProps as AntSkeletonInputProps } from "antd/lib/skeleton/Input";
import { FC } from "react";

type SkeletonProps = AntSkeletonProps;

export const PageSkeleton: FC<SkeletonProps> = (props) => {
  return <AntSkeleton active {...props} />;
};

const AntSkeletonButton = AntSkeleton.Button;

type SkeletonButtonProps = AntSkeletonButtonProps;

export const SkeletonButton: FC<SkeletonButtonProps> = (props) => {
  return <AntSkeletonButton active {...props} />;
};

const AntSkeletonInput = AntSkeleton.Input;

type SkeletonInputProps = AntSkeletonInputProps;

export const SkeletonInput: FC<SkeletonInputProps> = (props) => {
  return <AntSkeletonInput active {...props} />;
};
