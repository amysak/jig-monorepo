export const FORM_NAME = 'estimate-proposal'

export const FORM_FIELDS = {
    report_type: 'report_type' as const,
    report_include: 'report_include' as const,
    include_prices: 'include_prices' as const,
    include_prices_other: 'include_prices_other' as const,
    items_listing: 'items_listing' as const,
    selected_on_reports: 'selected_on_reports' as const,
    contact_terms_other: 'contact_terms_other' as const,
    include_second_copy: 'include_second_copy' as const,
    job_notes: 'job_notes' as const,
    printing_options: 'printing_options' as const,
    show_print_dialog: 'show_print_dialog' as const,
}

type FORM_VALUES_TYPE = {
    [key in keyof Partial<FormValues>]: {
        label?: string
        value?: string | number | (string | number)[]
        [key: string]: any
    }
}

export const FORM_VALUES: FORM_VALUES_TYPE = {
    printing_options: {
        label: 'Select Printing Options',
        value: [
            'preview/print',
            'preview/prompt for printing',
            'preview/do not print',
            'no preview/print (fastest)',
        ],
    },
}

export const FORM_FIELDS_VALUES = {
    [FORM_FIELDS.report_type]: { estimate: 'estimate', proposal: 'proposal' },
}

export interface FormValues {
    [FORM_FIELDS.report_type]: string
    [FORM_FIELDS.report_include]: string
    [FORM_FIELDS.include_prices]: string
    [FORM_FIELDS.include_prices_other]: string
    [FORM_FIELDS.items_listing]: (string | number)[]
    [FORM_FIELDS.selected_on_reports]: string
    [FORM_FIELDS.contact_terms_other]: boolean
    [FORM_FIELDS.include_second_copy]: boolean
    [FORM_FIELDS.job_notes]: boolean
    [FORM_FIELDS.printing_options]: (string | number)[]
    [FORM_FIELDS.show_print_dialog]: boolean
}

export const defaultValues: Partial<FormValues> = {
    [FORM_FIELDS.report_type]: '',
    [FORM_FIELDS.report_include]: '',
    [FORM_FIELDS.include_prices]: '',
    [FORM_FIELDS.items_listing]: [],
    [FORM_FIELDS.selected_on_reports]: '',
    [FORM_FIELDS.contact_terms_other]: false,
    [FORM_FIELDS.include_second_copy]: false,
    [FORM_FIELDS.job_notes]: false,
    [FORM_FIELDS.printing_options]: [],
    [FORM_FIELDS.show_print_dialog]: false,
}
