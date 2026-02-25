
export default function Message(type: string, message: string) {
    if (!message) return null;

    const isSuccess = type === "success";

    return (
      <div
        className={`w-full rounded-2xl border px-4 py-3 text-sm font-medium shadow-sm transition-all
          ${
            isSuccess
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">
            {isSuccess ? "✅" : "❌"}
          </span>
          <p className="break-words">{message}</p>
        </div>
      </div>
    );
  }