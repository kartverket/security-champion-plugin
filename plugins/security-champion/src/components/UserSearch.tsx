import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface UserSearchProps {
  selectedEmail: string | null,
  setSelectedEmail: Dispatch<SetStateAction<string | null>>
}

export const UserSearch = ({selectedEmail, setSelectedEmail}: UserSearchProps) => {
    const catalogApi = useApi(catalogApiRef);
    const [emails, setEmails] = useState<string[]>([]);
    

    useEffect(() => {
        const fetchUsers = async () => {
            const results = await catalogApi.getEntities({
                filter: { kind: 'User' }
            })
            const emails: string[] = results.items.map(user => {
              return user.metadata.name
            })
            console.log(results.items)
            setEmails(emails);
        }
        fetchUsers();

    }, [catalogApi]); 


    return (

        <div>

        <Autocomplete
            options={emails}
            value={selectedEmail}
            onChange={(_, newValue) => setSelectedEmail(newValue)}
            renderInput={(params) => <TextField {...params} label="Select User by Email" />}
      />
        </div>
  );
};

export default UserSearch;

