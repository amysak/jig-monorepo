import { Dispatch, SetStateAction, useState } from 'react'

import { Ranges } from '../utils'

export const useRange = (
    defaultRange: Ranges = Ranges.week
): [Ranges, Dispatch<SetStateAction<Ranges>>] => {
    const [_range, _setRange] = useState<Ranges>(defaultRange)

    return [_range, _setRange]
}
