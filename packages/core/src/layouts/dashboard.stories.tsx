import {
    App,
    Avatar,
    AvatarGroup,
    Badge,
    BarChart,
    Button,
    ButtonGroup,
    Card,
    Content,
    Divider,
    Flexer,
    Footer,
    Header,
    Heading,
    IconButton,
    IconLib,
    Input,
    InputControl,
    InputPrefix,
    LineChart,
    Main,
    Menu,
    MenuDivider,
    MenuHeading,
    MenuItem,
    Navigation,
    NavigationDivider,
    NavigationHeading,
    NavigationItem,
    Notification,
    NotificationContent,
    NotificationIcon,
    PieChart,
    Pill,
    Popover,
    Progress,
    ProgressCircle,
    Select,
    Sidebar,
    Skeleton,
    SkeletonCircle,
    Sparkline,
    Stat,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Table,
    Tabs,
    TBody,
    Td,
    Text,
    Textarea,
    Th,
    THead,
    Toggle,
    Tooltip,
    Tr,
    useVisibility,
    View,
} from '@fold-ui/core'
import * as Token from '@fold-ui/design/tokens'
import React, { useMemo, useState } from 'react'

export default {
    title: 'Layouts/Dashboard',
    component: App,
    excludeStories: 'docs',
    parameters: {
        layout: 'fullscreen',
    },
}

export const docs = {
    title: 'Dashboard',
    subtitle: 'A complete application shell that stitches the core components together into a working dashboard.',
    description:
        'This layout is a reference "app" built entirely from core components — navigation, headers, stats, charts, tables, cards, forms and overlays — so you can see how the pieces compose into a real product surface. Use the sidebar to move between pages.',
}

/* -------------------------------------------------------------------------- */
/*  Tokens & mock data                                                        */
/* -------------------------------------------------------------------------- */

// Pill takes a raw colour value (not a variant), so map our tones to tokens.
const TONE: Record<string, string> = {
    accent: Token.ColorAccent500,
    success: Token.ColorGreen500,
    danger: Token.ColorRed500,
    warning: Token.ColorOrange500,
    highlight: Token.ColorPurple500,
    neutral: Token.ColorGray500,
    default: Token.ColorGray500,
}

const spark = (n: number, seed = 1) =>
    new Array(n).fill(null).map((_, i) => Math.abs(Math.sin(i * 0.6 + seed) * 0.6 + Math.random() * 0.4))

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

const trafficSeries = [
    {
        legend: 'Visitors',
        color: Token.ColorAccent500,
        points: months.map((m, i) => [m, 12 + Math.round(Math.sin(i) * 6 + i * 3)]) as [string, number][],
    },
    {
        legend: 'Signups',
        color: Token.ColorPurple500,
        points: months.map((m, i) => [m, 4 + Math.round(Math.cos(i) * 3 + i * 1.5)]) as [string, number][],
    },
]

const deviceBars = [
    {
        legend: 'Desktop',
        color: Token.ColorAccent500,
        values: months.map((m, i) => ({ label: m, count: 40 + Math.round(Math.sin(i) * 12 + i * 4) })),
    },
    {
        legend: 'Mobile',
        color: Token.ColorPurple500,
        values: months.map((m, i) => ({ label: m, count: 25 + Math.round(Math.cos(i) * 10 + i * 3) })),
    },
]

const sources = [
    { legend: 'Direct', color: Token.ColorAccent500, value: 42 },
    { legend: 'Referral', color: Token.ColorBlue500, value: 26 },
    { legend: 'Organic', color: Token.ColorGreen500, value: 20 },
    { legend: 'Social', color: Token.ColorPurple500, value: 12 },
]

const team = [
    {
        name: 'Charlene Singh',
        role: 'Product Lead',
        src: '/women/01.jpg',
        presence: 'online',
        tag: 'Owner',
        tone: 'accent',
    },
    {
        name: 'Craig Pather',
        role: 'Frontend Engineer',
        src: '/men/01.jpg',
        presence: 'online',
        tag: 'Admin',
        tone: 'highlight',
    },
    { name: 'Etienne Dreyer', role: 'Designer', src: '/men/09.jpg', presence: 'away', tag: 'Member', tone: 'default' },
    {
        name: 'Aubrey Moagi',
        role: 'Backend Engineer',
        src: '/men/02.jpg',
        presence: 'busy',
        tag: 'Member',
        tone: 'default',
    },
    {
        name: 'Patrick Anthony',
        role: 'QA Engineer',
        src: '/men/03.jpg',
        presence: 'online',
        tag: 'Member',
        tone: 'default',
    },
    {
        name: 'Lerato Khumalo',
        role: 'Data Analyst',
        src: '/women/04.jpg',
        presence: 'away',
        tag: 'Member',
        tone: 'default',
    },
]

const activity = [
    {
        who: 'Charlene Singh',
        src: '/women/01.jpg',
        action: 'merged',
        target: 'feat/billing-v2',
        when: '2m ago',
        tone: 'success',
    },
    {
        who: 'Craig Pather',
        src: '/men/01.jpg',
        action: 'opened',
        target: 'fix/login-redirect',
        when: '24m ago',
        tone: 'accent',
    },
    {
        who: 'Aubrey Moagi',
        src: '/men/02.jpg',
        action: 'commented on',
        target: 'API rate limits',
        when: '1h ago',
        tone: 'default',
    },
    {
        who: 'Etienne Dreyer',
        src: '/men/09.jpg',
        action: 'closed',
        target: 'design/tokens',
        when: '3h ago',
        tone: 'danger',
    },
    {
        who: 'Patrick Anthony',
        src: '/men/03.jpg',
        action: 'deployed',
        target: 'production',
        when: '5h ago',
        tone: 'warning',
    },
]

const projects = [
    {
        name: 'Atlas Platform',
        desc: 'Core billing & subscriptions service.',
        progress: 82,
        tag: 'Engineering',
        tone: 'accent',
        members: ['/men/01.jpg', '/women/01.jpg', '/men/09.jpg'],
    },
    {
        name: 'Northwind App',
        desc: 'Customer-facing mobile experience.',
        progress: 47,
        tag: 'Product',
        tone: 'success',
        members: ['/men/02.jpg', '/women/04.jpg'],
    },
    {
        name: 'Design System',
        desc: 'Shared component & token library.',
        progress: 95,
        tag: 'Design',
        tone: 'highlight',
        members: ['/men/09.jpg', '/women/01.jpg', '/men/03.jpg'],
    },
    {
        name: 'Data Pipeline',
        desc: 'Event ingestion and warehousing.',
        progress: 31,
        tag: 'Data',
        tone: 'warning',
        members: ['/men/02.jpg', '/women/04.jpg', '/men/01.jpg'],
    },
]

/* -------------------------------------------------------------------------- */
/*  Shared chrome                                                             */
/* -------------------------------------------------------------------------- */

const PageHeader = ({ title, subtitle, children }: any) => (
    <Header
        p="0 2rem"
        height={60}
        gap={15}
        bgToken="surface"
        style={{ borderBottom: '0.1rem solid var(--f-color-border)' }}>
        <View
            column
            gap={2}
            alignItems="flex-start">
            <Heading as="h3">{title}</Heading>
            {subtitle && (
                <Text
                    size="sm"
                    colorToken="text-weaker">
                    {subtitle}
                </Text>
            )}
        </View>
        <Flexer />
        {children}
    </Header>
)

const SectionTitle = ({ children, tool }: any) => (
    <View
        row
        width="100%"
        gap={10}>
        <Heading
            as="h5"
            fontWeight="bold">
            {children}
        </Heading>
        <Flexer />
        {tool}
    </View>
)

const Panel = ({ children, ...rest }: any) => (
    <View
        column
        bgToken="surface"
        radius="var(--f-radius)"
        p={20}
        gap={15}
        alignItems="stretch"
        style={{ border: '0.1rem solid var(--f-color-border)' }}
        {...rest}>
        {children}
    </View>
)

const TonePill = ({ tone = 'default', children, ...rest }: any) => (
    <Pill
        subtle
        color={TONE[tone]}
        {...rest}>
        {children}
    </Pill>
)

const ProfileMenu = () => {
    const { visible, show, hide } = useVisibility(false)

    return (
        <Popover
            border="none"
            width="fit-content"
            anchor="bottom-right"
            isVisible={visible}
            onDismiss={hide}
            content={
                <Menu width={220}>
                    <MenuHeading>jo@joduplessis.com</MenuHeading>
                    <MenuItem prefix={<IconLib icon="user" />}>Profile</MenuItem>
                    <MenuItem prefix={<IconLib icon="cog" />}>Preferences</MenuItem>
                    <MenuItem prefix={<IconLib icon="star" />}>Upgrade plan</MenuItem>
                    <MenuDivider />
                    <MenuItem prefix={<IconLib icon="lock-closed" />}>Sign out</MenuItem>
                </Menu>
            }>
            <View
                onClick={show}
                className="f-buttonize"
                row
                gap={8}>
                <Avatar
                    size="sm"
                    name="Jo du Plessis"
                    src="/men/05.jpg"
                    presence="online"
                />
                <IconLib
                    icon="chevron-down"
                    size="sm"
                />
            </View>
        </Popover>
    )
}

const NotificationsMenu = () => {
    const { visible, show, hide } = useVisibility(false)

    return (
        <Popover
            border="none"
            width="fit-content"
            anchor="bottom-right"
            isVisible={visible}
            onDismiss={hide}
            content={
                <Menu width={280}>
                    <MenuHeading>Notifications</MenuHeading>
                    <MenuItem prefix={<IconLib icon="check-circle" />}>Build #1423 passed</MenuItem>
                    <MenuItem prefix={<IconLib icon="user" />}>Lerato joined the team</MenuItem>
                    <MenuItem prefix={<IconLib icon="warning" />}>Usage at 80% of quota</MenuItem>
                </Menu>
            }>
            <View
                onClick={show}
                position="relative">
                <IconButton
                    icon="flag"
                    subtle
                    size="sm"
                />
                <Badge
                    variant="danger"
                    anchor="top-right"
                    width={8}
                    height={8}
                />
            </View>
        </Popover>
    )
}

const RowMenu = () => {
    const { visible, show, hide } = useVisibility(false)

    return (
        <Popover
            border="none"
            width="fit-content"
            anchor="bottom-right"
            isVisible={visible}
            onDismiss={hide}
            content={
                <Menu width={180}>
                    <MenuItem prefix={<IconLib icon="pen" />}>Edit role</MenuItem>
                    <MenuItem prefix={<IconLib icon="copy" />}>Copy invite</MenuItem>
                    <MenuDivider />
                    <MenuItem prefix={<IconLib icon="bin" />}>Remove</MenuItem>
                </Menu>
            }>
            <IconButton
                icon="more-v"
                subtle
                size="sm"
                onClick={show}
            />
        </Popover>
    )
}

const TopBarTools = () => (
    <>
        <InputControl width={240}>
            <InputPrefix>
                <IconLib
                    icon="search"
                    size="sm"
                />
            </InputPrefix>
            <Input
                size="sm"
                placeholder="Search…"
            />
        </InputControl>
        <Tooltip text="What's new">
            <IconButton
                icon="gift"
                subtle
                size="sm"
            />
        </Tooltip>
        <NotificationsMenu />
        <View
            width={1}
            height={28}
            bgToken="border"
        />
        <ProfileMenu />
    </>
)

/* -------------------------------------------------------------------------- */
/*  Pages                                                                      */
/* -------------------------------------------------------------------------- */

const OverviewPage = () => {
    const visitors = useMemo(() => spark(24, 1), [])
    const revenue = useMemo(() => spark(24, 4), [])
    const churn = useMemo(() => spark(24, 9), [])

    const kpis = [
        { icon: 'user', label: 'Active users', number: '41,841', data: visitors, delta: '+12.4%', tone: 'success' },
        { icon: 'star', label: 'Revenue', number: '$ 89,210', data: revenue, delta: '+4.1%', tone: 'success' },
        { icon: 'arrow-down', label: 'Churn', number: '1,291', data: churn, delta: '-0.8%', tone: 'danger' },
    ]

    return (
        <View
            column
            gap={20}
            p={24}
            width="100%"
            alignItems="stretch">
            <Notification variant="accent">
                <NotificationIcon>
                    <IconLib icon="gift" />
                </NotificationIcon>
                <NotificationContent>
                    <Text>
                        <strong>You're on the Pro trial.</strong> 9 days remaining — upgrade any time to keep your
                        team's seats.
                    </Text>
                </NotificationContent>
                <Button
                    size="sm"
                    variant="accent">
                    Upgrade
                </Button>
                <NotificationIcon>
                    <IconLib icon="x" />
                </NotificationIcon>
            </Notification>

            {/* KPI row */}
            <View
                row
                gap={20}
                wrap="wrap"
                alignItems="stretch"
                width="100%">
                {kpis.map((s) => (
                    <Panel
                        key={s.label}
                        flex={1}
                        style={{ minWidth: 240 }}>
                        <View
                            row
                            width="100%"
                            gap={10}
                            alignItems="flex-start">
                            <Stat
                                icon={s.icon}
                                label={s.label}
                                number={s.number}
                                description="vs. last 30 days"
                            />
                            <Flexer />
                            <TonePill
                                size="sm"
                                tone={s.tone}>
                                {s.delta}
                            </TonePill>
                        </View>
                        <View
                            width="100%"
                            height={48}>
                            <Sparkline
                                data={s.data}
                                variant="bar"
                                width="100%"
                                height={48}
                            />
                        </View>
                    </Panel>
                ))}
            </View>

            {/* Charts + goals */}
            <View
                row
                gap={20}
                wrap="wrap"
                alignItems="stretch"
                width="100%">
                <Panel
                    flex={2}
                    style={{ minWidth: 360 }}>
                    <SectionTitle
                        tool={
                            <ButtonGroup>
                                <Button
                                    size="xs"
                                    active>
                                    Day
                                </Button>
                                <Button size="xs">Week</Button>
                                <Button size="xs">Month</Button>
                            </ButtonGroup>
                        }>
                        Traffic overview
                    </SectionTitle>
                    <LineChart
                        data={trafficSeries}
                        area
                        height={180}
                    />
                </Panel>

                <Panel
                    flex={1}
                    style={{ minWidth: 260 }}>
                    <SectionTitle>Quarterly goal</SectionTitle>
                    <View
                        row
                        width="100%"
                        justifyContent="center"
                        p="10px 0">
                        <ProgressCircle
                            value={68}
                            size={120}
                            thickness={12}>
                            <Heading as="h3">68%</Heading>
                        </ProgressCircle>
                    </View>
                    <Stack
                        direction="vertical"
                        spacing={10}>
                        <View
                            column
                            gap={4}
                            width="100%"
                            alignItems="stretch">
                            <View
                                row
                                width="100%">
                                <Text size="sm">New signups</Text>
                                <Flexer />
                                <Text
                                    size="sm"
                                    colorToken="text-weaker">
                                    820 / 1,000
                                </Text>
                            </View>
                            <Progress
                                value={82}
                                variant="success"
                                thickness={6}
                            />
                        </View>
                        <View
                            column
                            gap={4}
                            width="100%"
                            alignItems="stretch">
                            <View
                                row
                                width="100%">
                                <Text size="sm">Expansion MRR</Text>
                                <Flexer />
                                <Text
                                    size="sm"
                                    colorToken="text-weaker">
                                    $ 21k / $ 50k
                                </Text>
                            </View>
                            <Progress
                                value={42}
                                variant="accent"
                                thickness={6}
                            />
                        </View>
                    </Stack>
                </Panel>
            </View>

            {/* Activity feed */}
            <Panel>
                <SectionTitle
                    tool={
                        <Button
                            size="xs"
                            subtle
                            suffix={
                                <IconLib
                                    icon="chevron-right"
                                    size="sm"
                                />
                            }>
                            View all
                        </Button>
                    }>
                    Recent activity
                </SectionTitle>
                <Table
                    striped={false}
                    lined>
                    <TBody>
                        {activity.map((a, i) => (
                            <Tr key={i}>
                                <Td style={{ width: 40 }}>
                                    <Avatar
                                        size="sm"
                                        name={a.who}
                                        src={a.src}
                                    />
                                </Td>
                                <Td>
                                    <Text>
                                        <strong>{a.who}</strong> {a.action}{' '}
                                    </Text>
                                    <TonePill
                                        size="xs"
                                        tone={a.tone}>
                                        {a.target}
                                    </TonePill>
                                </Td>
                                <Td align="right">
                                    <Text
                                        size="sm"
                                        colorToken="text-weaker">
                                        {a.when}
                                    </Text>
                                </Td>
                            </Tr>
                        ))}
                    </TBody>
                </Table>
            </Panel>
        </View>
    )
}

const AnalyticsPage = () => {
    return (
        <View
            column
            gap={20}
            p={24}
            width="100%"
            alignItems="stretch">
            <View
                row
                gap={20}
                wrap="wrap"
                width="100%">
                <Stat
                    style={{ minWidth: 150 }}
                    icon="eye"
                    label="Page views"
                    number="2.4M"
                    description="Last 7 days"
                />
                <Stat
                    style={{ minWidth: 150 }}
                    icon="time"
                    label="Avg. session"
                    number="3m 41s"
                    description="Last 7 days"
                />
                <Stat
                    style={{ minWidth: 150 }}
                    icon="check"
                    label="Conversion"
                    number="4.8%"
                    description="Last 7 days"
                />
                <Stat
                    style={{ minWidth: 150 }}
                    icon="user"
                    label="New users"
                    number="18,204"
                    description="Last 7 days"
                />
            </View>

            <View
                row
                gap={20}
                wrap="wrap"
                alignItems="stretch"
                width="100%">
                <Panel
                    flex={2}
                    style={{ minWidth: 320 }}>
                    <SectionTitle>Sessions by device</SectionTitle>
                    <BarChart
                        data={deviceBars}
                        height={260}
                    />
                </Panel>
                <Panel
                    flex={1}
                    style={{ minWidth: 260 }}>
                    <SectionTitle>Traffic sources</SectionTitle>
                    <View
                        row
                        width="100%"
                        justifyContent="center"
                        p="10px 0">
                        <PieChart
                            data={sources}
                            radius={150}
                            innerRadius={52}
                        />
                    </View>
                </Panel>
            </View>

            <Panel>
                <SectionTitle>Revenue trend</SectionTitle>
                <LineChart
                    data={trafficSeries}
                    area
                    height={200}
                />
            </Panel>

            <Panel>
                <SectionTitle>Top pages</SectionTitle>
                <Table>
                    <THead>
                        <Tr>
                            <Th>Path</Th>
                            <Th align="right">Views</Th>
                            <Th align="right">Unique</Th>
                            <Th align="right">Bounce</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {[
                            ['/', '482,193', '301,442', '32%'],
                            ['/pricing', '210,938', '188,201', '41%'],
                            ['/blog/launch', '98,442', '90,118', '58%'],
                            ['/docs/getting-started', '76,201', '61,883', '22%'],
                            ['/changelog', '41,002', '38,772', '47%'],
                        ].map((r) => (
                            <Tr key={r[0]}>
                                <Td>
                                    <Text font="var(--f-font-mono)">{r[0]}</Text>
                                </Td>
                                <Td align="right">{r[1]}</Td>
                                <Td align="right">{r[2]}</Td>
                                <Td align="right">{r[3]}</Td>
                            </Tr>
                        ))}
                    </TBody>
                </Table>
            </Panel>
        </View>
    )
}

const ProjectsPage = () => (
    <View
        column
        gap={20}
        p={24}
        width="100%"
        alignItems="stretch">
        <View
            row
            gap={20}
            wrap="wrap"
            alignItems="stretch"
            width="100%">
            {projects.map((p) => (
                <Card
                    key={p.name}
                    flex={1}
                    style={{ minWidth: 260 }}
                    footer={
                        <View
                            row
                            width="100%"
                            p="12px 16px"
                            alignItems="center">
                            <AvatarGroup>
                                {p.members.map((m, i) => (
                                    <Avatar
                                        key={i}
                                        size="sm"
                                        name="Member"
                                        src={m}
                                        style={{ border: '0.2rem solid var(--f-color-surface)' }}
                                    />
                                ))}
                            </AvatarGroup>
                            <Flexer />
                            <IconButton
                                icon="more-h"
                                subtle
                                size="sm"
                            />
                        </View>
                    }>
                    <View
                        column
                        gap={12}
                        p={20}
                        alignItems="flex-start"
                        width="100%">
                        <View
                            row
                            width="100%">
                            <TonePill
                                size="sm"
                                tone={p.tone}>
                                {p.tag}
                            </TonePill>
                            <Flexer />
                            {p.progress >= 90 && (
                                <TonePill
                                    size="sm"
                                    tone="success"
                                    prefix={
                                        <IconLib
                                            icon="check"
                                            size="sm"
                                        />
                                    }>
                                    Ready
                                </TonePill>
                            )}
                        </View>
                        <Heading as="h4">{p.name}</Heading>
                        <Text
                            size="sm"
                            colorToken="text-weaker">
                            {p.desc}
                        </Text>
                        <View
                            column
                            gap={4}
                            width="100%"
                            alignItems="stretch">
                            <View
                                row
                                width="100%">
                                <Text size="sm">Progress</Text>
                                <Flexer />
                                <Text
                                    size="sm"
                                    colorToken="text-weaker">
                                    {p.progress}%
                                </Text>
                            </View>
                            <Progress
                                value={p.progress}
                                variant={p.tone as any}
                                thickness={6}
                            />
                        </View>
                    </View>
                </Card>
            ))}
        </View>
    </View>
)

const TeamPage = () => (
    <View
        column
        gap={20}
        p={24}
        width="100%"
        alignItems="stretch">
        <Panel>
            <SectionTitle
                tool={
                    <Button
                        size="sm"
                        variant="accent"
                        prefix={
                            <IconLib
                                icon="plus"
                                size="sm"
                            />
                        }>
                        Invite
                    </Button>
                }>
                Members
            </SectionTitle>
            <Table
                striped={false}
                lined
                width="100%">
                <THead>
                    <Tr>
                        <Th>Member</Th>
                        <Th>Role</Th>
                        <Th>Access</Th>
                        <Th align="right">Actions</Th>
                    </Tr>
                </THead>
                <TBody>
                    {team.map((m) => (
                        <Tr key={m.name}>
                            <Td align="left">
                                <View
                                    row
                                    gap={10}
                                    justifyContent="flex-start">
                                    <Avatar
                                        size="sm"
                                        name={m.name}
                                        src={m.src}
                                        presence={m.presence as any}
                                    />
                                    <Text>{m.name}</Text>
                                </View>
                            </Td>
                            <Td>
                                <Text colorToken="text-weaker">{m.role}</Text>
                            </Td>
                            <Td>
                                <TonePill
                                    size="sm"
                                    tone={m.tone}>
                                    {m.tag}
                                </TonePill>
                            </Td>
                            <Td align="right">
                                <RowMenu />
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </Panel>

        <Panel>
            <SectionTitle>Pending invites</SectionTitle>
            <View
                column
                gap={10}
                width="100%"
                alignItems="stretch">
                {[1, 2].map((i) => (
                    <View
                        key={i}
                        row
                        gap={12}
                        width="100%">
                        <SkeletonCircle size={36} />
                        <View
                            column
                            gap={6}
                            flex={1}
                            alignItems="flex-start">
                            <Skeleton
                                width="40%"
                                height={10}
                            />
                            <Skeleton
                                width="25%"
                                height={8}
                            />
                        </View>
                        <TonePill
                            size="sm"
                            tone="warning">
                            Pending
                        </TonePill>
                    </View>
                ))}
            </View>
        </Panel>
    </View>
)

const SettingsPage = () => {
    const [selected, setSelected] = useState(0)
    const [emailNotif, setEmailNotif] = useState(true)
    const [weekly, setWeekly] = useState(false)
    const [plan, setPlan] = useState<any>(['pro'])
    const [bio, setBio] = useState('Building design systems and developer tools.')

    return (
        <View
            column
            gap={20}
            p={24}
            width="100%"
            alignItems="stretch">
            <Panel>
                <Tabs
                    selected={selected}
                    onSelect={setSelected}>
                    <TabList>
                        <Tab prefix={<IconLib icon="user" />}>Profile</Tab>
                        <Tab prefix={<IconLib icon="flag" />}>Notifications</Tab>
                        <Tab prefix={<IconLib icon="star" />}>Billing</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <View
                                column
                                gap={16}
                                p="20px 4px"
                                width="100%"
                                alignItems="stretch"
                                style={{ maxWidth: 520 }}>
                                <View
                                    row
                                    gap={16}>
                                    <Avatar
                                        size="xl"
                                        name="Jo du Plessis"
                                        src="/men/05.jpg"
                                    />
                                    <View
                                        column
                                        gap={8}
                                        alignItems="flex-start"
                                        justifyContent="center">
                                        <Button
                                            size="sm"
                                            outline
                                            prefix={
                                                <IconLib
                                                    icon="upload"
                                                    size="sm"
                                                />
                                            }>
                                            Upload photo
                                        </Button>
                                        <Text
                                            size="sm"
                                            colorToken="text-weaker">
                                            JPG or PNG, up to 2MB.
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    column
                                    gap={4}
                                    width="100%"
                                    alignItems="stretch">
                                    <Text
                                        size="sm"
                                        fontWeight="bold">
                                        Display name
                                    </Text>
                                    <Input defaultValue="Jo du Plessis" />
                                </View>
                                <View
                                    column
                                    gap={4}
                                    width="100%"
                                    alignItems="stretch">
                                    <Text
                                        size="sm"
                                        fontWeight="bold">
                                        Email
                                    </Text>
                                    <InputControl width="100%">
                                        <InputPrefix>
                                            <IconLib
                                                icon="user"
                                                size="sm"
                                            />
                                        </InputPrefix>
                                        <Input defaultValue="jo@joduplessis.com" />
                                    </InputControl>
                                </View>
                                <View
                                    column
                                    gap={4}
                                    width="100%"
                                    alignItems="stretch">
                                    <Text
                                        size="sm"
                                        fontWeight="bold">
                                        Bio
                                    </Text>
                                    <Textarea
                                        value={bio}
                                        onChange={(e: any) => setBio(e.target.value)}
                                        minHeight={90}
                                    />
                                </View>
                                <View
                                    row
                                    gap={10}>
                                    <Button variant="accent">Save changes</Button>
                                    <Button subtle>Cancel</Button>
                                </View>
                            </View>
                        </TabPanel>

                        <TabPanel>
                            <View
                                column
                                gap={16}
                                p="20px 4px"
                                width="100%"
                                alignItems="stretch"
                                style={{ maxWidth: 520 }}>
                                <View
                                    row
                                    width="100%"
                                    gap={10}>
                                    <View
                                        column
                                        gap={2}
                                        alignItems="flex-start">
                                        <Text fontWeight="bold">Email notifications</Text>
                                        <Text
                                            size="sm"
                                            colorToken="text-weaker">
                                            Get notified about activity in your projects.
                                        </Text>
                                    </View>
                                    <Flexer />
                                    <Toggle
                                        on={emailNotif}
                                        onChange={() => setEmailNotif(!emailNotif)}
                                    />
                                </View>
                                <Divider />
                                <View
                                    row
                                    width="100%"
                                    gap={10}>
                                    <View
                                        column
                                        gap={2}
                                        alignItems="flex-start">
                                        <Text fontWeight="bold">Weekly digest</Text>
                                        <Text
                                            size="sm"
                                            colorToken="text-weaker">
                                            A summary of your week, every Monday.
                                        </Text>
                                    </View>
                                    <Flexer />
                                    <Toggle
                                        on={weekly}
                                        onChange={() => setWeekly(!weekly)}
                                    />
                                </View>
                            </View>
                        </TabPanel>

                        <TabPanel>
                            <View
                                column
                                gap={16}
                                p="20px 4px"
                                width="100%"
                                alignItems="stretch"
                                style={{ maxWidth: 520 }}>
                                <View
                                    column
                                    gap={4}
                                    width="100%"
                                    alignItems="stretch">
                                    <Text
                                        size="sm"
                                        fontWeight="bold">
                                        Plan
                                    </Text>
                                    <Select
                                        width="100%"
                                        placeholder="Select a plan"
                                        selected={plan}
                                        onSelect={(option: any) => setPlan([option.key])}
                                        options={[
                                            { key: 'free', label: 'Free' },
                                            { key: 'pro', label: 'Pro — $20/mo' },
                                            { key: 'enterprise', label: 'Enterprise' },
                                        ]}
                                    />
                                </View>
                                <Notification>
                                    <NotificationIcon>
                                        <IconLib icon="check-circle" />
                                    </NotificationIcon>
                                    <NotificationContent>
                                        <Text>Your card ending in •••• 4242 will be charged on 1 Jul 2026.</Text>
                                    </NotificationContent>
                                </Notification>
                                <View
                                    row
                                    gap={10}>
                                    <Button variant="accent">Update plan</Button>
                                    <Button
                                        subtle
                                        variant="danger">
                                        Cancel subscription
                                    </Button>
                                </View>
                            </View>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Panel>
        </View>
    )
}

/* -------------------------------------------------------------------------- */
/*  Shell                                                                      */
/* -------------------------------------------------------------------------- */

const PAGES: Record<string, { label: string; icon: string; subtitle: string; render: () => JSX.Element }> = {
    overview: {
        label: 'Overview',
        icon: 'description',
        subtitle: 'Your workspace at a glance',
        render: () => <OverviewPage />,
    },
    analytics: {
        label: 'Analytics',
        icon: 'eye',
        subtitle: 'Traffic, engagement & revenue',
        render: () => <AnalyticsPage />,
    },
    projects: { label: 'Projects', icon: 'clipboard', subtitle: '4 active projects', render: () => <ProjectsPage /> },
    team: { label: 'Team', icon: 'user', subtitle: '6 members · 2 pending', render: () => <TeamPage /> },
    settings: { label: 'Settings', icon: 'cog', subtitle: 'Manage your account', render: () => <SettingsPage /> },
}

export const Usage = () => {
    const [page, setPage] = useState<keyof typeof PAGES>('overview')
    const current = PAGES[page]

    return (
        <App
            width="100%"
            height={760}
            row
            radius="var(--f-radius)"
            style={{ overflow: 'hidden', border: '0.1rem solid var(--f-color-border)' }}>
            {/* Sidebar */}
            <Sidebar
                left
                bgToken="surface-strong"
                justifyContent="flex-start"
                style={{ borderRight: '0.1rem solid var(--f-color-border)' }}>
                <Header
                    p="0 1.25rem"
                    height={60}
                    gap={10}>
                    <Avatar color={Token.ColorAccent500}>F</Avatar>
                    <Heading as="h3">Foldworks</Heading>
                </Header>

                <Navigation width={250}>
                    {Object.entries(PAGES)
                        .slice(0, 3)
                        .map(([key, p]) => (
                            <NavigationItem
                                key={key}
                                active={page === key}
                                onClick={() => setPage(key as keyof typeof PAGES)}
                                prefix={<IconLib icon={p.icon} />}
                                suffix={key === 'projects' ? <Badge variant="danger" /> : undefined}>
                                {p.label}
                            </NavigationItem>
                        ))}
                    <NavigationDivider />
                    <NavigationHeading>Workspace</NavigationHeading>
                    {Object.entries(PAGES)
                        .slice(3)
                        .map(([key, p]) => (
                            <NavigationItem
                                key={key}
                                active={page === key}
                                onClick={() => setPage(key as keyof typeof PAGES)}
                                prefix={<IconLib icon={p.icon} />}>
                                {p.label}
                            </NavigationItem>
                        ))}
                </Navigation>

                <Flexer />

                <View
                    p="0.75rem"
                    width="100%">
                    <View
                        column
                        gap={10}
                        p={16}
                        width="100%"
                        radius="var(--f-radius)"
                        bgToken="surface"
                        alignItems="stretch"
                        style={{ border: '0.1rem solid var(--f-color-border)' }}>
                        <View
                            row
                            width="100%">
                            <Text size="sm">Storage</Text>
                            <Flexer />
                            <Text
                                size="sm"
                                colorToken="text-weaker">
                                7.2 / 10GB
                            </Text>
                        </View>
                        <Progress
                            value={72}
                            variant="accent"
                            thickness={6}
                        />
                        <Button
                            size="sm"
                            width="100%">
                            Upgrade storage
                        </Button>
                    </View>
                </View>

                <Footer
                    p="0.75rem"
                    width="100%"
                    gap="0.5rem">
                    <Avatar
                        name="Jo du Plessis"
                        size="sm"
                        src="/men/05.jpg"
                        presence="online"
                    />
                    <Text flex={1}>Jo du Plessis</Text>
                    <IconLib
                        icon="more-h"
                        size="sm"
                    />
                </Footer>
            </Sidebar>

            {/* Main */}
            <Content bgToken="background">
                <Main column>
                    <PageHeader
                        title={current.label}
                        subtitle={current.subtitle}>
                        <TopBarTools />
                    </PageHeader>
                    <View
                        flex={1}
                        width="100%"
                        alignItems="flex-start"
                        style={{ overflowY: 'auto' }}>
                        {current.render()}
                    </View>
                </Main>
            </Content>
        </App>
    )
}
