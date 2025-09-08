import { useQuery } from "@tanstack/react-query"

import { SecurityChamp } from "../types"
import { post } from "../api/client"
import { configApiRef, identityApiRef, microsoftAuthApiRef, useApi } from "@backstage/core-plugin-api"
import { getAuthenticationTokens } from "../utils/authenticationUtils"

export const useSecurityChampionsQuery = (repositoryNames: string[]) => {
    const backendUrl = useApi(configApiRef).getString('backend.baseUrl');
    const backstageAuthApi = useApi(identityApiRef)

    const microsoftAuthApi = useApi(microsoftAuthApiRef)
    const config = useApi(configApiRef)
        
    return useQuery<SecurityChamp[], Error>({
        queryKey: ["security-champions", repositoryNames],
        queryFn: async () => {

            const { entraIdToken, backstageToken } =
                await getAuthenticationTokens(
                    config,
                    backstageAuthApi,
                    microsoftAuthApi
                )
            
            const endpointUrl = backendUrl + "/api/proxy/security-champion-proxy/api/securityChampion"
            return post<{repositoryNames: string[]; entraIdToken:string }, SecurityChamp[]>(endpointUrl, backstageToken, { repositoryNames, entraIdToken } )
        },
        enabled: repositoryNames.length !== 0,
        staleTime: 3600000,
    })
}
