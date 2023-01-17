export const filterAccessoriesByCategory = (

    acessories: number | any[],

    category: string,

    surfaceApplication: string
) => {

    // @ts-expect-error TS(2339): Property 'filter' does not exist on type 'number |... Remove this comment to see the full error message
    return acessories.filter((accessory: { category: string; surface_application: string }) => {
        if (surfaceApplication) {
            return (
                accessory.category?.toLowerCase() === category &&
                accessory.surface_application?.toLowerCase() ===
                    surfaceApplication
            )
        }

        return accessory.category?.toLowerCase() === category
    })
}
