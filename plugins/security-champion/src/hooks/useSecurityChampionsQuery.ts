import { useQuery } from "@tanstack/react-query"

import { SecurityChamp } from "../types"
import { post } from "../api/client"
export const useSecurityChampionsQuery = (repositoryNames: string[]) => {

    const endpointUrl = new URL("http://localhost:8080/api/securityChampion/")
        
    return useQuery<SecurityChamp[], Error>({
        queryKey: ["security-champions", repositoryNames],
        queryFn: async () => {
            return post<{repositoryNames: string[]}, SecurityChamp[]>( endpointUrl, { repositoryNames } )
        },
        enabled: repositoryNames.length !== 0,
        staleTime: 3600000,
    })
}
