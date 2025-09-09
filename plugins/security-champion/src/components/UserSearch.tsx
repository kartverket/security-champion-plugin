import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { UserEntity } from "@backstage/catalog-model"

interface UserSearchProps {
  selectedEmail: string | undefined,
  setSelectedEmail: Dispatch<SetStateAction<string | undefined>>
}

export const UserSearch = ({selectedEmail, setSelectedEmail}: UserSearchProps) => {
    const catalogApi = useApi(catalogApiRef);
    const [emails, setEmails] = useState<(string | undefined)[]>([]);
    

    useEffect(() => {
        const fetchUsers = async () => {
            const results = await catalogApi.getEntities({
                filter: { kind: 'User' }
            })
            //filter to make sure the users have a defined email 
            const emails: (string | undefined)[] = results.items
            .filter(user => (user as UserEntity).spec?.profile?.email !== undefined)
            .map(user_with_email => {
                return (user_with_email as UserEntity).spec?.profile?.email
            })
            setEmails(emails);
        }
        fetchUsers();

    }, [catalogApi]); 


    return (

        <div>

        <Autocomplete
            options={emails}
            value={selectedEmail}
            defaultValue={""}
            onChange={(_, newValue) => setSelectedEmail(newValue)}
            renderInput={(params) => <TextField {...params} label="Select User by Email" />}
      />
        </div>
  );
};

export default UserSearch;

