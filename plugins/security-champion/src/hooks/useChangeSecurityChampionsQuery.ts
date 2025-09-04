import { useMutation } from "@tanstack/react-query"

import { SecurityChamp } from "../types"
import { post } from "../api/client"
//import { configApiRef, useApi } from "@backstage/core-plugin-api";
export const useSetSecurityChampionMutation = () => {

    const endpointUrl = new URL("http://localhost:8080/api/setSecurityChampion/")
        
    return useMutation({
        mutationFn: async (securityChampion : SecurityChamp) => {
            return post<SecurityChamp, string>( endpointUrl, securityChampion )
        },
    })
}
