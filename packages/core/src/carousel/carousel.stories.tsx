import { Carousel, CarouselItem, CarouselPills, Image, Stack, useCarousel, View } from '@fold-dev/core'
import React from 'react'

export default {
    title: 'Core/Carousel',
    component: Carousel,
    excludeStories: 'docs',
}

export const docs = {
    title: 'Carousel',
    subtitle:
        'The Carousel component is a slideshow that cycles through various elements, including images, videos, and text.',
    description:
        'The Carousel component enables users to sequentially browse through a variety of content, including images, videos, and text. Carousels are useful for presenting related content, such as image galleries or tutorials.',
}

export const Usage = () => {
    const { current, setCurrent } = useCarousel(0)

    return (
        <View
            width="100%"
            style={{ maxWidth: 500 }}>
            <Carousel
                width="100%"
                height={400}
                swipable
                current={current}
                onChange={setCurrent}>
                <CarouselItem>
                    <Image
                        src="/photos/01.jpg"
                        width="100%"
                        height="100%"
                        border="none"
                        radius={0}
                    />
                </CarouselItem>

                <CarouselItem>
                    <Image
                        src="/photos/02.jpg"
                        width="100%"
                        height="100%"
                        border="none"
                        radius={0}
                    />
                </CarouselItem>

                <CarouselItem>
                    <Image
                        src="/photos/03.jpg"
                        width="100%"
                        height="100%"
                        border="none"
                        radius={0}
                    />
                </CarouselItem>

                <CarouselItem>
                    <Image
                        src="/photos/04.jpg"
                        width="100%"
                        height="100%"
                        border="none"
                        radius={0}
                    />
                </CarouselItem>

                <CarouselItem>
                    <Image
                        src="/photos/05.jpg"
                        width="100%"
                        height="100%"
                        border="none"
                        radius={0}
                    />
                </CarouselItem>
            </Carousel>

            <CarouselPills
                current={current}
                pills={5}
                onChange={(index) => setCurrent(index)}
            />
        </View>
    )
}

// --

export const VerticalLayout = () => {
    const { current, setCurrent } = useCarousel(0)

    return (
        <View
            width="100%"
            style={{ maxWidth: 500 }}
            row>
            <Carousel
                width="100%"
                height={400}
                swipable
                current={current}
                onChange={setCurrent}>
                <CarouselItem>
                    <Image
                        src="/photos/06.jpg"
                        width="100%"
                        height="100%"
                        border="none"
                        radius={0}
                    />
                </CarouselItem>

                <CarouselItem>
                    <Image
                        src="/photos/07.jpg"
                        width="100%"
                        height="100%"
                        border="none"
                        radius={0}
                    />
                </CarouselItem>

                <CarouselItem>
                    <Image
                        src="/photos/08.jpg"
                        width="100%"
                        height="100%"
                        border="none"
                        radius={0}
                    />
                </CarouselItem>

                <CarouselItem>
                    <Image
                        src="/photos/09.jpg"
                        width="100%"
                        height="100%"
                        border="none"
                        radius={0}
                    />
                </CarouselItem>

                <CarouselItem>
                    <Image
                        src="/photos/10.jpg"
                        width="100%"
                        height="100%"
                        border="none"
                        radius={0}
                    />
                </CarouselItem>
            </Carousel>

            <CarouselPills
                flex={1}
                current={current}
                pills={5}
                direction="vertical"
                onChange={(index) => setCurrent(index)}
                carouselPillProps={{
                    style: {
                        '--f-carousel-pill-height-inactive': 'var(--f-size-10)',
                        '--f-carousel-pill-height-active': 'var(--f-size-4)',
                        '--f-carousel-pill-width-inactive': 'var(--f-size-3)',
                        '--f-carousel-pill-width-active': 'var(--f-size-3)',
                    },
                }}
            />
        </View>
    )
}

// --

export const ImageGallery = () => {
    const { current, setCurrent } = useCarousel(0)

    return (
        <View
            width="100%"
            style={{ maxWidth: 500 }}>
            <Carousel
                width="100%"
                height={400}
                swipable
                current={current}
                onChange={setCurrent}>
                <CarouselItem>
                    <Image
                        src="/photos/01.jpg"
                        width="100%"
                        height="100%"
                        border="none"
                        radius={0}
                    />
                </CarouselItem>

                <CarouselItem>
                    <Image
                        src="/photos/02.jpg"
                        width="100%"
                        height="100%"
                        border="none"
                        radius={0}
                    />
                </CarouselItem>

                <CarouselItem>
                    <Image
                        src="/photos/03.jpg"
                        width="100%"
                        height="100%"
                        border="none"
                        radius={0}
                    />
                </CarouselItem>

                <CarouselItem>
                    <Image
                        src="/photos/04.jpg"
                        width="100%"
                        height="100%"
                        border="none"
                        radius={0}
                    />
                </CarouselItem>

                <CarouselItem>
                    <Image
                        src="/photos/05.jpg"
                        width="100%"
                        height="100%"
                        border="none"
                        radius={0}
                    />
                </CarouselItem>
            </Carousel>

            <Stack
                spacing={5}
                justifyContent="center"
                p={10}>
                <Image
                    className="f-buttonize"
                    onClick={() => setCurrent(0)}
                    src="/photos/01.jpg"
                    width={50}
                    height={50}
                    style={{ opacity: current == 0 ? 1 : 0.5 }}
                />
                <Image
                    className="f-buttonize"
                    onClick={() => setCurrent(1)}
                    src="/photos/02.jpg"
                    width={50}
                    height={50}
                    style={{ opacity: current == 1 ? 1 : 0.5 }}
                />
                <Image
                    className="f-buttonize"
                    onClick={() => setCurrent(2)}
                    src="/photos/03.jpg"
                    width={50}
                    height={50}
                    style={{ opacity: current == 2 ? 1 : 0.5 }}
                />
                <Image
                    className="f-buttonize"
                    onClick={() => setCurrent(3)}
                    src="/photos/04.jpg"
                    width={50}
                    height={50}
                    style={{ opacity: current == 3 ? 1 : 0.5 }}
                />
                <Image
                    className="f-buttonize"
                    onClick={() => setCurrent(4)}
                    src="/photos/05.jpg"
                    width={50}
                    height={50}
                    style={{ opacity: current == 4 ? 1 : 0.5 }}
                />
            </Stack>
        </View>
    )
}
