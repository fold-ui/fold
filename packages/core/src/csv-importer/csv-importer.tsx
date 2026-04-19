import React, { ReactNode, useState } from 'react'
import { CoreViewProps, View } from '../'
import { CsvImporterColumnMap } from './csv-importer-column-map'
import { CsvImporterDataClean } from './csv-importer-data-clean'
import { CsvImporterDone } from './csv-importer-done'
import { CsvImporterFooter } from './csv-importer-footer'
import { CsvImporterHeaderSelect } from './csv-importer-header-select'
import { CsvImporterSteps } from './csv-importer-steps'
import { CsvImporterUpload } from './csv-importer-upload'
import { CsvImporterProvider } from './csv-importer.provider'
import { CsvImporterHeaderCell, CsvImporterMapping, CsvImporterSchema } from './csv-importer.types'

export let F_CSV_MAPPER_CACHE = 'F_CSV_MAPPER_CACHE'

export type CsvImporterProps = {
    toolbar?: ReactNode
    schema?: CsvImporterSchema[]
    step?: number
    separator?: ',' | ';'
    defaultCsvData?: string
    defaultMapping: CsvImporterMapping
    defaultRecords: any[][]
    defaultHeader: CsvImporterHeaderCell[]
    onComplete: (data) => void
} & CoreViewProps &
    any

export const CsvImporter = (props: CsvImporterProps) => {
    const {
        toolbar,
        schema,
        separator = ',',
        defaultCsvData,
        defaultMapping,
        defaultRecords,
        defaultHeader,
        onComplete,
    } = props
    const [step, setStep] = useState(props.step || 0)

    return (
        <CsvImporterProvider
            schema={schema}
            separator={separator}
            defaultCsvData={defaultCsvData}
            defaultMapping={defaultMapping}
            defaultRecords={defaultRecords}
            defaultHeader={defaultHeader}>
            <View
                column
                className="f-csv-importer"
                alignItems="flex-start">
                <CsvImporterSteps step={step} />
                {step == 0 && <CsvImporterUpload />}
                {step == 1 && <CsvImporterHeaderSelect />}
                {step == 2 && <CsvImporterColumnMap />}
                {step == 3 && <CsvImporterDataClean />}
                {step == 4 && <CsvImporterDone />}
                <CsvImporterFooter
                    step={step}
                    onStepChange={setStep}
                    onComplete={onComplete}>
                    {toolbar}
                </CsvImporterFooter>
            </View>
        </CsvImporterProvider>
    )
}
