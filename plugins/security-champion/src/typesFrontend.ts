export enum Scanner {
    CodeQL = "CodeQL",
    Dependabot = "Dependabot",
    Pharos = "Pharos",
    Sysdig = "Sysdig",
}

export interface Vulnerability {
    scanners: Scanner[]
    id: string | string[]
    summary?: string
    severity: Severity
    date?: Date
    acceptedAt?: Date
    acceptedBy?: string
    comment?: string
    dependabotInfo?: DependabotInfo
    pharosInfo?: PharosInfo
    codeQLInfo?: CodeQLInfo
    sysdigInfo?: SysdigInfo
}

export interface DependabotInfo {
    htmlUrl: URL
}

export interface PharosInfo {
    htmlUrl: URL
    branch: string
    commit: string
}

export interface CodeQLInfo {
    htmlUrl: URL
    branches: string[]
    commits: string[]
    locations: number
}

export interface SysdigInfo {
    container_name: string
    namespace: string
    htmlUrl: URL
    cluster: string[]
    isExploitable: boolean
    packages: string[]
    severityCount: SeverityCount
}

export type SecretAlert = {
    createdAt: string
    summary: string
    secretValue: string
    bypassed: boolean
    bypassedBy?: GithubBypassed
}

export type GithubBypassed = {
    handle: string
    name: string
    email: string
    isRepositoryAdmin: boolean
}

export type CveId = string
export type CweId = string
export type RepositoryName = string

export type Severity =
    | "unknown"
    | "negligible"
    | "low"
    | "medium"
    | "high"
    | "critical"

export type DependabotAlert = {
    summary: string
    cveId: CveId
    severity: Severity
    htmlUrl: string
    createdAt: string
}

export type Dependabot = {
    configured: boolean
    alerts: DependabotAlert[]
}

export type CodeQlOccurences = {
    branch: string
    commits: string[]
    locations: number
}

export type CodeQlVulnerability = {
    summary: string
    cweIds: CweId[]
    severity: Severity
    occurrences: CodeQlOccurences[]
    htmlUrl: string
    createdAt: string
}

export type CodeQl = {
    configured: boolean
    vulnerabilities: CodeQlVulnerability[]
}

export type PharosAlert = {
    summary: string
    ruleId: CveId
    severity: Severity
    branch: string
    commit: string
    htmlUrl: string
    createdAt: string
}

export type Pharos = {
    configured: boolean
    alerts: PharosAlert[]
}

export type SysdigAlertPackage = {
    name: string
    version: string
    type: string
    isRunning: boolean
}

export type SysdigAlert = {
    htmlUrl: string
    cveId: CveId
    severity: Severity
    isExploitable: boolean
    disclosureDate: string
    packages: SysdigAlertPackage[]
}

export type SysdigContainer = {
    name: string
    cluster: string
    namespace: string
    alerts: SysdigAlert[]
    severityCount: SeverityCount
}

export type Sysdig = {
    containers: SysdigContainer[]
}

export type Repository = {
    repositoryName: RepositoryName
    severityCount: SeverityCount
    secrets: { alerts: SecretAlert[] }
    dependabot: Dependabot
    codeQl: CodeQl
    pharos: Pharos
    sysdig: Sysdig
    alertsMetadata: AlertMetadata[]
}

export type RepositorySummary = {
    repositoryName: string
    severityCount: SeverityCount
    secrets: { alerts: SecretAlert[] }
    scannerConfig: ScannerConfig
}

export type ScannerConfig = {
    dependabot: boolean
    codeQl: boolean
    pharos: boolean
    sysdig: boolean
}

export type TrendSeverityCounts = {
    timestamp: string
} & SeverityCount

export type SeverityCount = {
    unknown: number
    negligible: number
    low: number
    medium: number
    high: number
    critical: number
}

export type RepositoryScannerStatusData = {
    repositoryName: RepositoryName
    scannerStatus: ScannerStatus[]
}

export type ScannerStatus = {
    type: Scanner
    on: boolean
}

export interface RepositoryRosStatusData {
    repositoryName: string
    hasRosAsCode: boolean
    status: RosStatus
    lastPublishedRisc: string
    commitsSincePublishedRisc: number
}

export type RosStatus =
    | "Unknown"
    | "VeryOutdated"
    | "Outdated"
    | "SomewhatOutdated"
    | "Recent"

export type AggregatedScannerStatus = {
    scannerName: Scanner
    status: string
    repositoryStatus: RepositoryScannerStatusData[]
}

export type SecurityChamp = {
    repositoryName: string
    securityChampionHandle: string
    securityChampionEmail?: string
}

export type AlertMetadata = {
    vulnerabilityId: string
    dateFirstSeen: Date
    acceptedAt?: Date
    acceptedBy?: string
    comment?: string
}

export type AcceptVulnerabilityRequestBody = {
    repositoryName: string
    vulnerabilityId: string
    comment?: string
    acceptedBy?: string
}

export type SecretsOverview = {
    repositoryName: string
    alerts: SecretAlert[]
}
