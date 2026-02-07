import React, { useMemo } from 'react'
import { Size } from '../types'

export type LogoProps = {
    color?: string
    style?: any
    customSize?: number
    size?: Size
}

export const Logo = (props: LogoProps) => {
    const { color = 'var(--f-color-accent)', size, customSize = 40, style = {} } = props
    const { width, height } = useMemo(() => {
        let width,
            height = customSize

        switch (size) {
            case 'xs':
                width = 15
                height = 15
                break
            case 'sm':
                width = 22
                height = 22
                break
            case 'md':
                width = 35
                height = 35
                break
            case 'lg':
                width = 65
                height = 65
                break
            case 'xl':
                width = 90
                height = 90
                break
        }

        return { width, height }
    }, [size, customSize])

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 344 344"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlSpace="preserve"
            style={{
                ...style,
                fillRule: 'evenodd',
                clipRule: 'evenodd',
                strokeLinejoin: 'round',
                strokeMiterlimit: 2,
                flexShrink: 0,
            }}>
            <g transform="matrix(1,0,0,1,-78,-78)">
                <g transform="matrix(1,0,0,1,46,41)">
                    <path
                        d="M288.633,62.397C306.149,57.306 325.047,62.156 337.945,75.055C350.844,87.953 355.694,106.851 350.603,124.367C344.619,144.95 338.666,165.429 334.115,181.086C328.815,199.318 328.815,218.682 334.115,236.914C338.666,252.571 344.619,273.05 350.603,293.633C355.694,311.149 350.844,330.047 337.945,342.945C325.047,355.844 306.149,360.694 288.633,355.603C268.05,349.619 247.571,343.666 231.914,339.115C213.682,333.815 194.318,333.815 176.086,339.115C160.429,343.666 139.95,349.619 119.367,355.603C101.851,360.694 82.953,355.844 70.055,342.945C57.156,330.047 52.306,311.149 57.397,293.633C63.381,273.05 69.334,252.571 73.885,236.914C79.185,218.682 79.185,199.318 73.885,181.086C69.334,165.429 63.381,144.95 57.397,124.367C52.306,106.851 57.156,87.953 70.055,75.055C82.953,62.156 101.851,57.306 119.367,62.397C139.95,68.381 160.429,74.334 176.086,78.885C194.318,84.185 213.682,84.185 231.914,78.885C247.571,74.334 268.05,68.381 288.633,62.397Z"
                        style={{ fill: color }}
                    />
                </g>
            </g>
        </svg>
    )
}

export const LogoOld = (props: LogoProps) => {
    const { color = 'var(--f-color-accent)', size, customSize = 40, style = {} } = props
    const { width, height } = useMemo(() => {
        let width,
            height = customSize
        const widthMultipler = 306 / 357
        const heightMultipler = 357 / 306

        switch (size) {
            case 'xs':
                width = 15 * widthMultipler
                height = 15 * heightMultipler
                break
            case 'sm':
                width = 22 * widthMultipler
                height = 22 * heightMultipler
                break
            case 'md':
                width = 35 * widthMultipler
                height = 35 * heightMultipler
                break
            case 'lg':
                width = 65 * widthMultipler
                height = 65 * heightMultipler
                break
            case 'xl':
                width = 90 * widthMultipler
                height = 90 * heightMultipler
                break
        }

        return { width, height }
    }, [size, customSize])

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 306 357"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlSpace="preserve"
            style={{
                ...style,
                fillRule: 'evenodd',
                clipRule: 'evenodd',
                strokeLinejoin: 'round',
                strokeMiterlimit: 2,
                flexShrink: 0,
            }}>
            <g transform="matrix(1,0,0,1,5.37228,9.55255)">
                <g transform="matrix(1,0,0,1,5.62772,-34.4572)">
                    <path
                        style={{ fill: color }}
                        d="M52.928,186.356L-5.5,220.09C-7.57,221.285 -9.105,223.053 -10.019,225.079L-10.056,225.162C-10.615,226.418 -10.945,227.797 -10.994,229.247L-11,229.667L-11,314.179C-11,318.111 -8.901,321.745 -5.494,323.709L91.842,379.828C95.246,381.791 99.438,381.789 102.84,379.823C106.241,377.858 108.337,374.228 108.337,370.299L108.337,292.164L288.872,187.932C292.278,185.966 294.375,182.33 294.372,178.398C294.369,174.465 292.267,170.833 288.858,168.871L230.444,135.264L288.872,101.53C292.278,99.564 294.375,95.929 294.372,91.996C294.369,88.063 292.267,84.431 288.858,82.469L191.351,26.37C187.95,24.413 183.764,24.416 180.366,26.378L-5.5,133.688C-8.906,135.654 -11.003,139.29 -11,143.223C-10.997,147.155 -8.895,150.787 -5.486,152.749L52.928,186.356ZM11,239.989L11,307.824C11,307.824 86.337,351.259 86.337,351.259L86.337,285.742C86.337,284.963 86.418,284.202 86.573,283.469L11,239.989ZM208.425,147.976L103.007,208.84C99.608,210.802 95.422,210.805 92.021,208.848L74.967,199.036L14.517,233.937L90.126,277.438C90.949,276.723 91.878,276.128 92.887,275.681L261.343,178.423L208.425,147.976ZM186.105,48.401L21.743,143.295L97.715,187.005L262.076,92.111L186.105,48.401Z"
                    />
                </g>
            </g>
        </svg>
    )
}

export const LogoSolid = (props: LogoProps) => {
    const { color = 'var(--f-color-accent)', size, customSize = 40, style = {} } = props
    const { width, height } = useMemo(() => {
        let width,
            height = customSize
        const widthMultipler = 229 / 285
        const heightMultipler = 285 / 229

        switch (size) {
            case 'xs':
                width = 15 * widthMultipler
                height = 15 * heightMultipler
                break
            case 'sm':
                width = 22 * widthMultipler
                height = 22 * heightMultipler
                break
            case 'md':
                width = 35 * widthMultipler
                height = 35 * heightMultipler
                break
            case 'lg':
                width = 65 * widthMultipler
                height = 65 * heightMultipler
                break
            case 'xl':
                width = 90 * widthMultipler
                height = 90 * heightMultipler
                break
        }

        return { width, height }
    }, [size, customSize])

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 229 285"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlSpace="preserve"
            style={{
                ...style,
                fillRule: 'evenodd',
                clipRule: 'evenodd',
                strokeLinejoin: 'round',
                strokeMiterlimit: 2,
                flexShrink: 0,
            }}>
            <g transform="matrix(1,0,0,1,-448.49,-1075.78)">
                <g transform="matrix(1.02502,0,0,1.02502,37.6886,693.189)">
                    <g transform="matrix(1.05146e-17,-0.232093,0.783096,0.451495,273.487,554.131)">
                        <path
                            d="M419.906,162.542L118.49,162.542L118.49,274.913L419.906,274.913"
                            style={{ fill: color }}
                        />
                    </g>
                    <g transform="matrix(0.523761,-0.302393,0.747409,0.430013,197.824,430.33)">
                        <rect
                            x="172.138"
                            y="162.542"
                            width="247.768"
                            height="112.371"
                            style={{ fill: color }}
                        />
                    </g>
                    <g transform="matrix(1,0,0,1,389.119,358.608)">
                        <path
                            d="M181.552,109.51L104.329,153.558L73.11,135.923L16.694,168.495L100.652,216.799L234.108,139.748L181.552,109.51Z"
                            style={{ fill: color }}
                        />
                    </g>
                </g>
            </g>
        </svg>
    )
}
