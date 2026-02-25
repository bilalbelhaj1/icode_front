import { useState } from "react"
import type { Member } from "../types/types"
import { updateMember } from "../api/memberApi"

interface Props {
    update: (data:Member) => void,
    member: Member,
    onClose: () => void
}

function UpdateMember({update, member, onClose}:Props) {
    const [form, setForm] = useState(member);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleUpdate = async (e: any) => {
        console.log(form)
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const res = await updateMember(form, member._id);
            const data = res.data;
            update(data);
        } catch (err: any) {
            console.log(err)
            setError(err?.response?.data?.message || `Something went wrong could not update ${form.firstName} informations, please contact the developer`)
        } finally {
            setIsSubmitting(false)
        }
    }
    
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in">
        {
        error && (
          <div className="w-full mb-4">
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 shadow-sm">
              <svg
                className="mt-0.5 h-5 w-5 text-red-600 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z" />
              </svg>

              <p className="text-sm font-medium text-red-700 break-words">
                {error}
              </p>
            </div>
          </div>
        )
      }
        <h2 className="text-xl font-bold text-gray-800 mb-4">Update Member {form.firstName} {form.familyName} </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <input
              required
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <input
              required
              value={form.familyName}
              onChange={(e) => setForm({ ...form, familyName: e.target.value })}
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              required
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Apogee</label>
            <input
              type="text"
              required
              value={form.apogee}
              onChange={(e) => setForm({ ...form, apogee: e.target.value })}
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                px-4 py-2 rounded-xl text-white font-semibold transition
                ${isSubmitting
                  ? "bg-emerald-400 cursor-not-allowed"
                  : "bg-linear-to-r from-emerald-500 to-green-500 hover:opacity-90"}
              `}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update Member"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateMember