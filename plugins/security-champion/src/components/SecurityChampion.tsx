import React, { useMemo, useState } from "react"
import { ErrorBanner } from "./ErrorBanner"
import { SecurityChamp } from "../types"
import { SecurityChampionItem } from "./SecurityChampionItem"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import Divider from "@mui/material/Divider"
import CardContent from "@mui/material/CardContent"
import CircularProgress from "@mui/material/CircularProgress"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import { useSecurityChampionsQuery } from "../hooks/useSecurityChampionsQuery"
import UserSearch from "./UserSearch"
import { Button } from "@mui/material"
import { useSetSecurityChampionMutation } from "../hooks/useChangeSecurityChampionsQuery"

const CardWrapper = ({
    title,
    children,
}: {
    title: string
    children: React.ReactNode,
}) => (
    <Card>
        <CardHeader sx={{ mb: 2 }} title={title} />
        
        <Divider />
        <CardContent>{children}</CardContent>
    </Card>
)

interface SecurityChampionProps {
    repositoryNames: string[]
}

export const SecurityChampion = ({
    repositoryNames,
}: SecurityChampionProps) => {
     const { data, isPending, error, refetch } = useSecurityChampionsQuery(repositoryNames)

     const [edit, setEdit] = useState<boolean>(false)
     const [selectedEmail, setSelectedEmail] = useState<string | null | undefined>("");
     const mutation = useSetSecurityChampionMutation()
     const [isMutationError, setIsMutationError] = useState<boolean>(false)

     var isSystem = false

    const groupedChampions: Map<
        string,
        { champ: SecurityChamp; repositoryNames: string[] }
    > = useMemo(() => {
        if (data && data?.length < 2) return new Map() // no need to group
        isSystem = true
        const champMap = new Map<
            string,
            { champ: SecurityChamp; repositoryNames: string[] }
        >()
        data?.forEach((champ) => {
            //use email to avoid using github handle
            const repositories = champMap.get(champ.securityChampionEmail)
            if (repositories) {
                repositories.repositoryNames.push(champ.repositoryName)
            } else {
                champMap.set(champ.securityChampionEmail, {
                    champ,
                    repositoryNames: [champ.repositoryName],
                })
            }
        })
        return champMap
    }, [data])

    const setSecurityChampion = () => {
        if (selectedEmail) {
                const champion : SecurityChamp = {
                repositoryName: repositoryNames[0],
                securityChampionEmail: selectedEmail
            }
            mutation.mutate(champion, {
                onSuccess: () => {
                    refetch();
                    setEdit(false)
                },
                onError: () => {
                    setIsMutationError(true)
                }
            })
        }
    }

    const onEdit = () => {
        setEdit(!edit)
    }

        if (edit) {
        return (
             <CardWrapper
                title={
                    "Edit security champion:"
                }
            >
                <UserSearch
                    selectedEmail={selectedEmail}
                    setSelectedEmail={setSelectedEmail}
                />

                {isMutationError && <ErrorBanner errorMessage="Failed to set security champion"/>}

                {!selectedEmail &&
                <Button style={{ marginTop: 8 }} variant="contained" onClick={setSecurityChampion}  disabled >Change Champion</Button>}
                
                 {selectedEmail &&
                <Button style={{ marginTop: 8 }} variant="contained" onClick={setSecurityChampion}>Change champion</Button>}

            </CardWrapper>
        )
    }

    if (isPending)
        return (
            <CardWrapper title="Security champion: ">
                <CircularProgress />
            </CardWrapper>
        )

    const renderSecurityChampions = () => {
        if (data && data.length < 1) {
            return <Typography>No security champion</Typography>
        }
        if (data && data.length < 2) {
            return <SecurityChampionItem key={0} champion={data[0]} />
        }
        return [...groupedChampions].map((element, index) => (
            <SecurityChampionItem
                key={index}
                champion={element[1].champ}
                repositories={element[1].repositoryNames}
            />
        ))
    }

    if (data) {
        return (
            <CardWrapper
                title={
                    groupedChampions.keys.length > 1
                        ? "Security champions: "
                        : "Security champion: "
                }
            >
                <List>
                    <List>{renderSecurityChampions()}</List>
                </List>
                {!isSystem &&
                <Button onClick={onEdit}>Edit</Button>}
            </CardWrapper>
        )
    }

    return (
        <CardWrapper title="Security champion: ">
            <ErrorBanner errorMessage={error?.message} />
        </CardWrapper>
    )
}
