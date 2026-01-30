import { Table, TBody, Td, Th, THead, Tr } from '@fold-ui/core'
import React from 'react'

export default {
    title: 'Core/Table',
    component: Table,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Table',
    subtitle: 'The Table component serves as thin wrapper of the underlying native HTML <table> elements.',
    description:
        'The Table component is a representation of tabular data, which consists of information arranged in a two-dimensional table with rows and columns containing data.',
}

export const Usage = () => (
    <Table
        captionPosition="top"
        caption="Most Populated Countries">
        <THead>
            <Tr>
                <Th>#</Th>
                <Th>Country</Th>
                <Th align="right">Population</Th>
            </Tr>
        </THead>
        <TBody>
            <Tr>
                <Td>1</Td>
                <Td>India</Td>
                <Td align="right">1,428,627,663</Td>
            </Tr>
            <Tr>
                <Td>2</Td>
                <Td>China</Td>
                <Td align="right">1,425,671,352</Td>
            </Tr>
            <Tr>
                <Td>3</Td>
                <Td>United States</Td>
                <Td align="right">339,996,563</Td>
            </Tr>
            <Tr>
                <Td>4</Td>
                <Td>Indonesia</Td>
                <Td align="right">277,534,122</Td>
            </Tr>
            <Tr>
                <Td>5</Td>
                <Td>Pakistan</Td>
                <Td align="right">240,485,658</Td>
            </Tr>
        </TBody>
    </Table>
)

// --

export const Lined = () => (
    <Table
        lined
        striped={false}
        captionPosition="top"
        caption="Most Populated Countries">
        <THead>
            <Tr>
                <Th>#</Th>
                <Th>Country</Th>
                <Th align="right">Population</Th>
            </Tr>
        </THead>
        <TBody>
            <Tr>
                <Td>1</Td>
                <Td>India</Td>
                <Td align="right">1,428,627,663</Td>
            </Tr>
            <Tr>
                <Td>2</Td>
                <Td>China</Td>
                <Td align="right">1,425,671,352</Td>
            </Tr>
            <Tr>
                <Td>3</Td>
                <Td>United States</Td>
                <Td align="right">339,996,563</Td>
            </Tr>
            <Tr>
                <Td>4</Td>
                <Td>Indonesia</Td>
                <Td align="right">277,534,122</Td>
            </Tr>
            <Tr>
                <Td>5</Td>
                <Td>Pakistan</Td>
                <Td align="right">240,485,658</Td>
            </Tr>
        </TBody>
    </Table>
)

// --

export const StickyHeaderAndColumn = () => (
    <Table
        stickyHeader
        stickyColumn
        captionPosition="bottom"
        caption="Most Populated Countries">
        <THead>
            <Tr>
                <Th>#</Th>
                <Th>Country</Th>
                <Th align="right">Population</Th>
            </Tr>
        </THead>
        <TBody>
            <Tr>
                <Td>1</Td>
                <Td>India</Td>
                <Td align="right">1,428,627,663</Td>
            </Tr>
            <Tr>
                <Td>2</Td>
                <Td>China</Td>
                <Td align="right">1,425,671,352</Td>
            </Tr>
            <Tr>
                <Td>3</Td>
                <Td>United States</Td>
                <Td align="right">339,996,563</Td>
            </Tr>
            <Tr>
                <Td>4</Td>
                <Td>Indonesia</Td>
                <Td align="right">277,534,122</Td>
            </Tr>
            <Tr>
                <Td>5</Td>
                <Td>Pakistan</Td>
                <Td align="right">240,485,658</Td>
            </Tr>
        </TBody>
    </Table>
)
