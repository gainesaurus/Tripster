import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useUserContext } from '../../Contexts/UserContext';
import { getUsers } from '../../services/userService';

export default function SearchBar() {
  const userContext = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);
    userContext.authUser &&
      getUsers(userContext.authUser.token).then((users) => {
        users && setUsers(users.map((user) => user.username));
        setIsLoading(false);
      });
  }, [userContext.authUser]);

  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={users[0]}
        isLoading={isLoading}
        isClearable={true}
        isSearchable={true}
        name="color"
        options={users}
      />

      {/* <div
        style={{
          color: 'hsl(0, 0%, 40%)',
          display: 'inline-block',
          fontSize: 12,
          fontStyle: 'italic',
          marginTop: '1em',
        }}
      >
      </div> */}
    </>
  );
}
