import { useState, useMemo, useEffect } from "react";
import { Plus, Search, Eye, Pencil, Mail, Phone, Hash, Calendar } from "lucide-react";
import AddMemberModal from "../components/AddMemberModal";
import UpdateMember from "../components/UpdateMember";
import { getAllMembers } from "../api/memberApi";
import type { Member, MessageType } from "../types/types";
import Message from "../components/Message";

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("");
  const [message, setMessage] = useState<MessageType | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    async function getMembers() {
      try {
        const res = await getAllMembers();
        setMembers(res.data.members);
      } catch (err) {
        console.log(err);
      }
    }
    getMembers();
  }, []);

  function handleOnUpdate(id: number) {
    const member = members.find((m) => m._id === id);
    if (member) {
      setSelectedMember(member);
      setMode("update");
      setOpenModal(true);
    }
  }

  function updateMemberData(data: Member) {
    setMembers((prev) => prev.map((m) => (m._id === data._id ? data : m)));
    setOpenModal(false);
  }

  const filteredMembers = useMemo(() => {
    return members.filter((m) =>
      [m.firstName, m.familyName, m.email].some((field) =>
        (field || "").toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, members]);

  function addMember(data: Member) {
    setMembers((prev) => [...prev, data]);
    setMessage({ type: "success", message: "New Member added successfully" });
    setOpenModal(false);
  }

  function handleModalOpening() {
    if (!openModal) return null;
    switch (mode) {
      case "update":
        return selectedMember && (
          <UpdateMember
            member={selectedMember}
            onClose={() => setOpenModal(false)}
            update={updateMemberData}
          />
        );
      case "add":
        return <AddMemberModal onClose={()=>{setOpenModal(false)}} onAdd={addMember} />;
      default:
        return null;
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {message && Message(message.type, message.message)}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            Members
          </h1>
          <p className="text-gray-500 text-sm">Manage Icode club members</p>
        </div>

        {/* ✅ buttons wrapper */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={() => { setMode("add"); setOpenModal(true); }}
            className="w-full sm:w-auto flex justify-center items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-3 rounded-xl font-semibold shadow-md active:scale-95 transition-all"
          >
            <Plus size={20} /> Add Member
          </button>

          <button
            onClick={() => { window.location.href = "http://localhost:8080/admin/exportList"; }}
            className="w-full sm:w-auto flex justify-center items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-3 rounded-xl font-semibold shadow-md active:scale-95 transition-all"
          >
            <Plus size={20} /> Export List
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-2 md:p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
          />
        </div>
      </div>

      {/* Members List */}
      {filteredMembers.length > 0 ? (
        <>
          {/* MOBILE CARD VIEW (Visible on small screens) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
          {filteredMembers.map((m) => (
            <div key={m._id} className="bg-white p-5 rounded-2xl border border-emerald-50 shadow-sm space-y-4">
              
              {/* Top Section: Name and Action Button */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1"> {/* min-w-0 is crucial for text-truncation/wrapping */}
                  <h3 className="font-bold text-gray-900 text-lg leading-tight truncate">
                    {m.firstName} {m.familyName}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                    <Mail size={14} className="shrink-0" /> 
                    <span className="break-all">{m.email}</span>
                  </div>
                </div>
                
                {/* Action Button: Kept in a shrink-0 container to prevent jumping */}
                <div className="flex shrink-0 gap-2">
                  <button 
                    onClick={() => handleOnUpdate(m._id)} 
                    className="p-2.5 bg-blue-50 text-blue-600 rounded-xl active:bg-blue-100 transition-colors"
                  >
                    <Pencil size={20} />
                  </button>
                </div>
              </div>
      
      {/* Bottom Section: Details Grid */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Phone</p>
          <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
            <Phone size={14} className="text-emerald-500 shrink-0" />
            <span>{m.phoneNumber}</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Apogee</p>
          <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
            <Hash size={14} className="text-emerald-500 shrink-0" />
            <span>{m.apogee}</span>
          </div>
        </div>
      </div>

      {/* Optional: Show joined date in a subtle way */}
      <div className="flex items-center gap-2 text-[11px] text-gray-400 pt-1">
        <Calendar size={12} />
        <span>Joined: {m.createdAt}</span>
      </div>
    </div>
  ))}
</div>

          {/* DESKTOP TABLE VIEW (Hidden on small screens) */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-emerald-50 text-emerald-700">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold">Member</th>
                    <th className="text-left px-6 py-4 font-semibold">Contact</th>
                    <th className="text-left px-6 py-4 font-semibold">Apogee</th>
                    <th className="text-left px-6 py-4 font-semibold">Joined</th>
                    <th className="text-right px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredMembers.map((m) => (
                    <tr key={m._id} className="hover:bg-emerald-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-800">{m.firstName} {m.familyName}</div>
                        <div className="text-xs text-gray-500">{m.email}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{m.phoneNumber}</td>
                      <td className="px-6 py-4 text-gray-600 font-mono">{m.apogee}</td>
                      <td className="px-6 py-4 text-gray-500">{m.createdAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 rounded-lg hover:bg-emerald-100 text-emerald-700 transition-colors">
                            <Eye size={18} />
                          </button>
                          <button onClick={() => handleOnUpdate(m._id)} className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors">
                            <Pencil size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">No members found matching your search.</p>
        </div>
      )}

      {handleModalOpening()}
    </div>
  );
}