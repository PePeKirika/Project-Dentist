'use client'
import DateReserve from "@/components/DateReserve";
import { TextField } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";

export default function Booking() {

    const [name, setName] = useState<string>("")
    const [lastname, setLastname] = useState<string>("")
    const [citizenID, setCitizenID] = useState<string>("")
    const [bookDate, setBookDate] = useState<Dayjs|null>(null)
    const [bookHospital, setBookHospital] = useState<string>("")

    const dispatch = useDispatch<AppDispatch>()

    const makeBooking = () => {
        if (name && lastname && citizenID && bookDate && bookHospital) {
            const item:BookingItem = {
                name : name,
                surname : lastname,
                id : citizenID,
                hospital : bookHospital,
                bookDate : dayjs(bookDate).format('YYYY/MM/DD')
            }
            dispatch(addBooking(item))
        }
    }


    /*const session = await getServerSession(authOptions)

    if (!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)*/

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            
            {/*<div className="bg-slate-400 text-black m-5 p-5 rounded-lg">
                <div className="text-2xl ">{profile.data.name}</div>
                <table className="table-auto border-separate border-spacing-2 border-spacing-x-5">
                    <tbody>
                        <tr>
                            <td>Email</td>
                            <td>{profile.data.email}</td>
                        </tr>
                        <tr>
                            <td>Tel.</td>
                            <td>{profile.data.tel}</td>
                        </tr>
                        <tr>
                            <td>Member Since</td>
                            <td>{createdAt.toString()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>*/}

            <div className="text-xl font-medium">Vaccine Booking</div>   

            

            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-200">Enter your Name</div>
                <div className="w-[100%] bg-slate-400 rounded-lg space-x-5 space-y-2 px-10 py-5 text-black">
                    <TextField fullWidth name="Name" label="Name" variant="standard" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                </div>

                <div className="text-md text-left text-gray-200">Enter your Lastname</div>
                <div className="w-[100%] bg-slate-400 rounded-lg space-x-5 space-y-2 px-10 py-5 text-black">
                    <TextField fullWidth name="Lastname" label="Lastname" variant="standard" value={lastname} onChange={(e)=>{setLastname(e.target.value)}}/>
                </div>

                <div className="text-md text-left text-gray-200">Enter your Citizen ID</div>
                <div className="w-[100%] bg-slate-400 rounded-lg space-x-5 space-y-2 px-10 py-5 text-black">
                    <TextField fullWidth name="Citizen ID" label="Citizen ID" variant="standard" value={citizenID} onChange={(e)=>{setCitizenID(e.target.value)}}/>
                </div>
                
                <div className="text-md text-left text-gray-200">Choose your Vacination date and Hospital</div>
                <DateReserve onDateChange={(value:Dayjs)=>{setBookDate(value)}} onHospitalChange={(value:string)=>setBookHospital(value)}/>
            </div>
            
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm" name="Book Vaccine"
            onClick={makeBooking}>Book Vaccine</button>
        </main>
    );
}