import { useEffect, useState } from "react";
import { useChatStore } from "../store/ChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/AuthStore";

const Sidebar = () => {
  const { users, getUser, isUsersLoading, selectedUser, setSelectedUser } =
    useChatStore();
  const { OnlineUsers } = useAuthStore();
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const filteredUsers = showOnlineUsers
    ? users.filter((user) => OnlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5 ">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block"> Contacts</span>
        </div>
        {/* Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={showOnlineUsers}
              onChange={(e) => setShowOnlineUsers(e.target.checked)}
            />
            <span className="text-sm">Show Online Users</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({OnlineUsers.length - 1} online)
          </span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
              selectedUser?._id === user._id
                ? "bg-base-300 ring-1 ring-base-300"
                : ""
            }`}
            key={user.id}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.picture || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {OnlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.name}</div>
              <div className="text-sm text-zinc-400">
                {OnlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No Online Users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
