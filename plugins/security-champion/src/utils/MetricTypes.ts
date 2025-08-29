/*
MetricTypes er en enum som erstatter hardkodede streng-verdier som brukes i bl.a kall mot router.ts.
*/

export enum MetricTypes {
    metrics = "metrics",
    singleMetrics = "single-metrics",
    securityChampions = "security-champions",
    trends = "trends",
    rosStatus = "ros-status",
    acceptVulnerability = "accept-vulnerability",
}
