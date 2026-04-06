import React, {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {Address, Meter, Records} from "@/types";
import {getUsersMeters} from "@/model/Meters/meterHandling";
import {getAllRecordsOfAMeter} from "@/model/Records/recordHandling";
import {getUsersAddress} from "@/model/Addresses/addressHandling";
import {useAuth} from "@/context/AuthContext";

export type ProfileContextType = {
    meters: Pick<Meter, 'meter_number' | 'location'>[];
    address: Address | null;
    records: Pick<Records, 'created_at' | 'value' | 'meter'>[];
    refetchRecords: () => void;
    loading: boolean;
}

const ProfileContext = createContext<ProfileContextType>({
    meters: [],
    address: null,
    records: [],
    refetchRecords: () => {},
    loading: false,
});

export function ProfileProvider({children}: { children: React.ReactNode }) {
    const {session, hasProfile, loading: authLoading} = useAuth()

    const [meters, setMeters] = useState<Pick<Meter, 'meter_number' | 'location'>[]>([]);
    const [address, setAddress] = useState<Address | null>(null);
    const [records, setRecords] = useState<Pick<Records, 'created_at' | 'value' | 'meter'>[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const hasFetched = useRef(false)
    const isFetchingRecords = useRef(false)
    const metersRef = useRef(meters)

    // keep metersRef in sync without causing dep changes
    useEffect(() => {
        metersRef.current = meters
    }, [meters])

    const fetchProfileData = useCallback(async () => {
        setLoading(true)
        const [met, add] = await Promise.all([
            getUsersMeters(),
            getUsersAddress()
        ])
        setMeters(met)
        setAddress(add)
        setLoading(false)
    }, []) // no deps — stable forever

    const refetchRecords = useCallback(async () => {
        if (isFetchingRecords.current) return
        isFetchingRecords.current = true
        const results = await Promise.all(
            metersRef.current.map(m => getAllRecordsOfAMeter(m.meter_number))
        )
        setRecords(results.flat())
        isFetchingRecords.current = false
    }, []) // no deps — uses ref instead of meters state

    useEffect(() => {
        if (!session || !hasProfile || authLoading) return
        if (hasFetched.current) return
        hasFetched.current = true
        void fetchProfileData()
    }, [session, hasProfile, authLoading, fetchProfileData])

    useEffect(() => {
        if (meters.length === 0) return
        void refetchRecords()
    }, [meters, refetchRecords])

    const memo = useMemo(
        () => ({meters, address, records, refetchRecords, loading}),
        [meters, address, records, refetchRecords, loading]
    );

    return (
        <ProfileContext.Provider value={memo}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => useContext(ProfileContext);