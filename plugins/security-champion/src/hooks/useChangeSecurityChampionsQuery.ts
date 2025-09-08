import { useMutation } from "@tanstack/react-query"

import { SecurityChamp } from "../types"
import { post } from "../api/client"
import { getAuthenticationTokens } from "../utils/authenticationUtils"
import { configApiRef, identityApiRef, microsoftAuthApiRef, useApi } from "@backstage/core-plugin-api"
export const useSetSecurityChampionMutation = () => {

    const backendUrl = useApi(configApiRef).getString('backend.baseUrl');
    const backstageAuthApi = useApi(identityApiRef)

    const microsoftAuthApi = useApi(microsoftAuthApiRef)
    const config = useApi(configApiRef)

    return useMutation({
        mutationFn: async (securityChampion : SecurityChamp) => {
            const { entraIdToken, backstageToken } =
                            await getAuthenticationTokens(
                                config,
                                backstageAuthApi,
                                microsoftAuthApi
                            )

            const endpointUrl = backendUrl + "/api/proxy/security-champion-proxy/api/setSecurityChampion"

            return post<{securityChampion : SecurityChamp ;  entraIdToken : string}, string>( endpointUrl, backstageToken,  {securityChampion, entraIdToken})
        },
    })
}
