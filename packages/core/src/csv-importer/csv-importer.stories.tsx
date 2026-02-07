import { CsvImporter, Link, View } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/CsvImporter',
    component: CsvImporter,
    excludeStories: 'docs',
}

export const docs = {
    title: 'CSV Importer',
    subtitle: 'Make sense of imported data by correctly mapping columns with the CSV Importer.',
    description:
        'The CSV Importer component offers a streamlined way of onboarding complex data - ideal for customer success, onboarding & data teams.',
    experimental: true,
}

export const Usage = () => {
    return (
        <CsvImporter
            step={0}
            separator=","
            onComplete={(data) => console.log('data', data)}
            // defaultCsvData={data.csv}
            // defaultRecords={data.records}
            // defaultHeader={data.headers}
            // defaultMapping={data.mapping}
            schema={[
                { key: 'year', label: 'Year', type: 'string' },
                { key: 'variable', label: 'Variable', type: 'string' },
                // { key: 'customer-id', label: 'Customer ID', type: 'string' },
                // { key: 'first-name', label: 'First Name', type: 'string' },
                // { key: 'last-name', label: 'Last Name', type: 'string' },
                // { key: 'company', label: 'Company', type: 'string' },
                // { key: 'website', label: 'Website', type: 'string' },
                // {
                //     key: 'email',
                //     label: 'Email',
                //     type: 'string',
                //     validate: ({ value }) => {
                //         const valid = String(value)
                //             .toLowerCase()
                //             .match(
                //                 /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                //             )

                //         if (valid) {
                //             return []
                //         } else {
                //             return ['Not a valid email address']
                //         }
                //     },
                // },
                // {
                //     key: 'subscription-date',
                //     label: 'Subscription Date',
                //     type: 'date',
                //     transform: ({ value }) => {
                //         return new Date(value).toLocaleDateString('en-US', {
                //             weekday: 'short',
                //             year: 'numeric',
                //             month: 'long',
                //             day: 'numeric',
                //         })
                //     },
                // },
            ]}
            toolbar={
                <View
                    row
                    gap={5}
                    justifyContent="flex-start">
                    <Link
                        href="https://drive.google.com/uc?id=1x2IdSNcHGLmot9i1h90gwMJr5lULC2QV&export=download"
                        target="_blank">
                        Download CSV file ↗
                    </Link>
                </View>
            }
        />
    )
}
