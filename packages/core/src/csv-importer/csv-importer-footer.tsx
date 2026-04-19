import React, { ReactNode, useContext, useMemo } from 'react'
import { Button, Flexer, View } from '../'
import { F_CSV_MAPPER_CACHE } from './csv-importer'
import { CsvImporterContext } from './csv-importer.provider'

export type CsvImporterFooterProps = {
    step: number
    children: ReactNode
    onStepChange: (value) => void
    onComplete: (value) => void
}

export const CsvImporterFooter = (props: CsvImporterFooterProps) => {
    const { step, children, onStepChange, onComplete } = props
    const {
        options: {
            text: { back, next, finish },
        },
        fileData,
        records,
        mapping,
        header,
        schema,
    } = useContext(CsvImporterContext)
    const { nextDisabled, backDisabled } = useMemo(() => {
        let nextDisabled = false
        let backDisabled = false

        switch (step) {
            case 0:
                backDisabled = true
                nextDisabled = !fileData
                break
            case 1:
                backDisabled = false
                nextDisabled = !header
                break
            case 2:
                backDisabled = false
                nextDisabled = Object.keys(mapping).length != schema.length
                break
            case 3:
                backDisabled = false
                nextDisabled = false
                break
            case 4:
                backDisabled = false
                nextDisabled = false
                break
        }

        return {
            nextDisabled,
            backDisabled,
        }
    }, [step, fileData, records, mapping, header])

    const handleBack = () => {
        onStepChange(step - 1)
    }

    const handleNext = () => {
        switch (step) {
            case 0:
                return onStepChange(1)
            case 1:
                return onStepChange(2)
            case 2:
                return onStepChange(3)
            case 3:
                return onStepChange(4)
            case 4:
                return onComplete(window[F_CSV_MAPPER_CACHE].map((record) => record.map((r) => r.value)))
        }
    }

    return (
        <View
            row
            gap={5}
            justifyContent="flex-end"
            width="100%">
            {children}
            <Flexer />
            {step != 0 && step != 4 && (
                <Button
                    disabled={backDisabled}
                    variant="accent"
                    onClick={handleBack}>
                    {back}
                </Button>
            )}
            <Button
                disabled={nextDisabled}
                variant="accent"
                onClick={handleNext}>
                {step == 4 ? finish : next}
            </Button>
        </View>
    )
}
