import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ITripItem } from '../../Types';
import { getAllTrips } from '../services/tripService';
import { useUserContext } from './UserContext';

const TripsContext = createContext<Context | undefined>(undefined);

export function useTripsContext() {
  const context = useContext(TripsContext);
  if (context) return context;
  else throw new Error('useTripsContext was used outside of its Provider');
}

export function TripsProvider({ children }: { children: ReactNode }) {
  const [currentTrips, setCurrentTrips] = useState<ITripItem[]>([]);
  const [upcomingTrips, setUpcomingTrips] = useState<ITripItem[]>([]);
  const [pastTrips, setPastTrips] = useState<ITripItem[]>([]);
  const userContext = useUserContext();
  const [tripAdded, setTripAdded] = useState(false);

  const value = {
    currentTrips,
    upcomingTrips,
    pastTrips,
    setTripAdded,
  };

  useEffect(() => {
    if (userContext.authUser && userContext.authUser?.token !== '') {
      getAllTrips(userContext.authUser.token).then((tripItems) => {
        if (tripItems) {
          const currentTrips = tripItems.filter(
            (item) => getTripStatus(item.startDate, item.endDate) === 'current',
          ) as ITripItem[];
          setCurrentTrips(currentTrips);
          const upcomingTrips = tripItems.filter(
            (item) =>
              getTripStatus(item.startDate, item.endDate) === 'upcoming',
          ) as ITripItem[];
          setUpcomingTrips(upcomingTrips);
          const pastTrips = tripItems.filter(
            (item) =>
              getTripStatus(item.startDate, item.endDate) === 'memories',
          ) as ITripItem[];
          setPastTrips(pastTrips);
        }
      });
    }
    setTripAdded(false);
  }, [userContext.authUser, tripAdded]);

  function getTripStatus(startDate: string, endDate: string) {
    const currentDate = Date.now();
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    let tripDirectory;
    if (currentDate > start && currentDate < end) tripDirectory = 'current';
    if (currentDate < start) tripDirectory = 'upcoming';
    if (currentDate > end) tripDirectory = 'memories';
    return tripDirectory;
  }

  return (
    <TripsContext.Provider value={value}>{children}</TripsContext.Provider>
  );
}

type Context = {
  currentTrips: ITripItem[];
  upcomingTrips: ITripItem[];
  pastTrips: ITripItem[];
  setTripAdded: React.Dispatch<React.SetStateAction<boolean>>;
};
