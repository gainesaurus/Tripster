import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Select, { components, OptionProps, StylesConfig } from 'react-select';
import { useUserContext } from '../../Contexts/UserContext';
import { getUsers } from '../../services/userService';

import styles from './SearchBar.module.css';

interface SearchBarProps {
  attendees?: string[];
  invites?: string[];
  setNewAttendees: Dispatch<SetStateAction<string[]>>;
}

export default function SearchBar({
  attendees,
  invites,
  setNewAttendees,
}: SearchBarProps) {
  const userContext = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    setIsLoading(true);
    userContext.authUser &&
      getUsers(userContext.authUser.token).then((users) => {
        users &&
          setUsers(
            users
              .filter((user) => !attendees?.includes(user.uid))
              .map((user) => ({ value: user.uid, label: user.username })),
          );
        setIsLoading(false);
      });
  }, [userContext.authUser, attendees]);

  const colourStyles: StylesConfig<{ value: string; label: string }, true> = {
    option: (styles, { data }) => {
      if (!invites) return { ...styles };
      const isAttendee = invites.includes(data.value);
      return {
        ...styles,
        color: isAttendee ? '#5b9c41' : styles.color,
      };
    },
  };

  const Option = (
    props: OptionProps<{ value: string; label: string }, true>,
  ) => {
    const isAttendee =
      invites !== undefined && invites.includes(props.data.value);
    console.log(props.data.value, isAttendee);
    return (
      <components.Option {...props}>
        <div className={styles.option}>
          <div>{props.data.label}</div>
          {isAttendee && <CheckCircleIcon />}
        </div>
      </components.Option>
    );
  };

  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        isMulti
        isLoading={isLoading}
        isClearable={true}
        isSearchable={true}
        name="color"
        options={users}
        styles={colourStyles}
        components={{ Option }}
        onChange={(newAttendees) =>
          setNewAttendees([
            ...newAttendees.map((newAttendee) => newAttendee.value),
          ])
        }
      />
    </>
  );
}
