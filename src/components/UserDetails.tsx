import React from "react";
import { useParams } from "react-router-dom";
import { usegetUsers } from "../services/UsersApi";

const UserDetails: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const { data: users } = usegetUsers();

    const user = users?.find((user) => user?.id === parseInt(userId as string));

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="bg-white md:mx-auto rounded shadow-xl w-full md:w-1/2 overflow-hidden">
            <div className="h-[140px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div className="px-5 py-2 flex flex-col gap-3 pb-6">
                <div className="h-[90px] shadow-md w-[90px] rounded-full border-4 overflow-hidden -mt-14 border-white">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="w-full h-full rounded-full object-center object-cover" />
                </div>
                <div>
                    <h3 className="text-xl text-slate-900 relative font-bold leading-6">{user?.name}</h3>
                    <p className="text-sm text-gray-600">@{user?.username}</p>
                </div>

                <h4 className="text-md font-medium leading-3">About</h4>
                <p className="text-sm text-stone-500">
                    Email:   {user?.email}
                </p>
                <p className="text-sm text-stone-500">
                    Phone NO:   {user?.phone}
                </p>
                <p className="text-sm text-stone-500">
                    Website:   {user?.website}
                </p>
                <p className="text-sm text-stone-500">
                    Address:  {user?.address?.suite}{user?.address?.street}Street {user?.address?.city}
                </p>
                <p className="text-sm text-stone-500">
                    ZipCode:   {user?.address.zipcode}
                </p>
                <h4 className="text-md font-medium leading-3">Company</h4>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full">
                        <div className="leading-3">
                            <p className="text-sm font-bold text-slate-700">{user?.company?.name}</p>
                            <span className="text-xs text-slate-600">{user?.company?.catchPhrase}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserDetails;
