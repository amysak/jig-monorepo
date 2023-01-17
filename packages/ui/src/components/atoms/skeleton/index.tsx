import {
    Skeleton as AntSkeleton,
    SkeletonProps as AntSkeletonProps,
} from 'antd'
import { SkeletonButtonProps as AntSkeletonButtonProps } from 'antd/lib/skeleton/Button'
import { SkeletonInputProps as AntSkeletonInputProps } from 'antd/lib/skeleton/Input'

import React, { FC } from 'react'

/* #region  Skeleton */
type SkeletonProps = AntSkeletonProps

export const Skeleton: FC<SkeletonProps> = (props) => {
    return <AntSkeleton {...props} />
}
/* #endregion */

/* #region  SkeletonButton */
const AntSkeletonButton = AntSkeleton.Button

type SkeletonButtonProps = AntSkeletonButtonProps

export const SkeletonButton: FC<SkeletonButtonProps> = (props) => {
    return <AntSkeletonButton {...props} />
}
/* #endregion */

/* #region  SkeletonInput */
const AntSkeletonInput = AntSkeleton.Input

type SkeletonInputProps = AntSkeletonInputProps

export const SkeletonInput: FC<SkeletonInputProps> = (props) => {
    return <AntSkeletonInput {...props} />
}
/* #endregion */
