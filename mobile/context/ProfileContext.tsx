import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {Address, Meter, Records} from "@/types";
import {getUsersMeters} from "@/model/Meters/meterHandling";
import {getAllRecordsOfAMeter} from "@/model/Records/recordHandling";
import {getUsersAddress} from "@/model/Addresses/addressHandling";
import {useAuth} from "@/context/AuthContext";


export type ProfileContextType = {
    meters: Pick<Meter, 'meter_number' | 'location'>[];
    address: Address|null;
    records: Pick<Records, 'created_at' | 'value' | 'meter'>[];
}

const ProfileContext = createContext<ProfileContextType>({
    meters: [],
    address: null,
    records: []
});

export function ProfileProvider({ children }: { children: React.ReactNode }) {
    const { session, hasProfile } = useAuth()

    const [meters, setMeters] = useState<Pick<Meter, 'meter_number' | 'location'>[]>([]);
    const [address, setAddress] = useState<Address|null>(null);
    const [records, setRecords] = useState<Pick<Records, 'created_at' | 'value' | 'meter'>[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!session || !hasProfile) return
        setLoading(true)
        Promise.all([
            getUsersMeters(),
            getUsersAddress()
        ]).then(([met, add]) => {
            setMeters(met)
            setAddress(add)
            setLoading(false)
        })
    }, [session, hasProfile]);

    useEffect(() => {
        setLoading(true)
        Promise.all(
            meters.map(m =>
                getAllRecordsOfAMeter(m.meter_number)
            )
        ).then(results => {
            setRecords(results.flat());
        });
    }, [meters]);

    const memo = useMemo(
        () => ({ meters, address, records, loading }),
        [meters, address, records, loading]
    );

    return (
        <ProfileContext.Provider value={memo}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => useContext(ProfileContext);