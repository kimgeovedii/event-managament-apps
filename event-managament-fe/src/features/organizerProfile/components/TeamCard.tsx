import React from "react";
import Link from "next/link";
import { UserGroupIcon, PlusIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Menu, MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Select, Snackbar, Alert, CircularProgress } from "@mui/material";
import { useManageTeam } from "../hooks/useManageTeam";

interface TeamCardProps {
  organizer: any;
  user: any;
  refetch?: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ organizer, user, refetch }) => {
  const apiTeam = organizer?.teams || [];

  const {
    anchorEl,
    selectedMember,
    openMenu,
    handleMenuClick,
    handleCloseMenu,
    deleteModalOpen,
    setDeleteModalOpen,
    onOpenDeleteModal,
    handleRemoveMember,
    editRoleModalOpen,
    setEditRoleModalOpen,
    onOpenEditRoleModal,
    handleEditRole,
    newRole,
    setNewRole,
    isLoadingAction,
    toast,
    handleCloseToast
  } = useManageTeam(organizer, refetch);

  const getRoleColor = (role: string) => {
    switch (role?.toUpperCase()) {
      case "OWNER":
      case "ADMIN":
        return {
          bgColor: "bg-indigo-50 dark:bg-indigo-900/30",
          textColor: "text-indigo-700 dark:text-indigo-400",
        };
      case "EDITOR":
      case "MANAGER":
        return {
          bgColor: "bg-emerald-50 dark:bg-emerald-900/30",
          textColor: "text-emerald-600 dark:text-emerald-400",
        };
      default:
        return {
          bgColor: "bg-gray-100 dark:bg-gray-800",
          textColor: "text-gray-600 dark:text-gray-300",
        };
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // Map backend team members or fallback to an empty UI state. 
  // We use organizer?.owner or standard user obj fallback if owner not fully populated in teams list
  const team = apiTeam.map((memberData: any) => {
    const member = memberData.user;
    const isCurrentUser = user?.id === member?.id;
    const colors = getRoleColor(memberData.role);
    
    return {
      id: member?.id || Math.random().toString(),
      name: member?.name || "Unknown User",
      role: memberData.role || "MARKETING",
      isCurrentUser,
      ...colors,
    };
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-900 dark:text-white">
          <UserGroupIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          <h3 className="text-sm font-bold uppercase tracking-wider">
            The Team
          </h3>
        </div>
        <Link href="/dashboard/profile/team/add" className="size-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-[#3a1d2e] bg-white dark:bg-[#221019] text-gray-500 hover:text-[#4F46E5] hover:border-[#4F46E5] transition-all">
          <PlusIcon className="w-5 h-5" />
        </Link>
      </div>

      <div className="space-y-3">
        {team.map((member: any) => (
          <div
            key={member.id}
            className="bg-white dark:bg-[#221019] border border-gray-200 dark:border-[#3a1d2e] rounded-xl p-3 shadow-sm flex items-center gap-3"
          >
            <div className="size-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-black/30 ring-1 ring-gray-200 dark:ring-[#3a1d2e] flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 font-bold text-sm">
                {getInitials(member.name)}
              </span>
            </div>
            <div className="flex-1 min-w-0 flex items-center gap-3">
              <div>
                <p className="font-semibold text-xs text-gray-900 dark:text-white truncate">
                  {member.name}
                </p>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium mt-1 ${member.bgColor} ${member.textColor}`}
                >
                  {member.role}
                </span>
              {member.isCurrentUser && (
                 <span className="bg-gray-200 ml-1 dark:bg-gray-800 text-gray-600 dark:text-gray-300 inline-flex items-center uppercase px-2 py-0.5 rounded text-[10px] font-medium mt-1">
                   You
                 </span>
              )}
              </div>
            </div>
            <IconButton 
              onClick={(e) => handleMenuClick(e, member)}
              size="small"
              className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <EllipsisHorizontalIcon className="w-5 h-5" />
            </IconButton>
          </div>
        ))}
      </div>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            mt: 1,
            borderRadius: '0.75rem',
            border: '1px solid #e5e7eb',
            p: 0.5,
            minWidth: 150,
          },
          className: "bg-white dark:bg-[#221019] dark:border-[#3a1d2e] dark:text-white",
        }}
      >
        <MenuItem 
          onClick={onOpenEditRoleModal}
          disabled={selectedMember?.role === "OWNER"}
          className="text-sm font-semibold rounded-md hover:bg-gray-50 dark:hover:bg-black/30 disabled:opacity-50"
        >
          Edit Role
        </MenuItem>
        <MenuItem 
          onClick={onOpenDeleteModal}
          disabled={selectedMember?.role === "OWNER" || selectedMember?.isCurrentUser}
          className="text-sm font-semibold text-red-500 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50"
        >
          Remove Member
        </MenuItem>
      </Menu>

      {/* Edit Role Dialog */}
      <Dialog open={editRoleModalOpen} onClose={() => setEditRoleModalOpen(false)}>
        <DialogTitle className="font-bold">Edit Team Member Role</DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-4">
            Change the role for {selectedMember?.name}. Note: Cannot set to Owner.
          </DialogContentText>
          <div className="mt-2">
            <label className="block text-sm font-semibold mb-1.5">New Role</label>
            <Select
              native
              fullWidth
              size="small"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as "ADMIN" | "MARKETING")}
            >
              <option value="MARKETING">Marketing (Limited Access)</option>
              <option value="ADMIN">Admin (Can Manage Team)</option>
            </Select>
          </div>
        </DialogContent>
        <DialogActions className="px-6 pb-4">
          <Button onClick={() => setEditRoleModalOpen(false)} color="inherit" disabled={isLoadingAction}>Cancel</Button>
          <Button onClick={handleEditRole} variant="contained" disabled={isLoadingAction} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            {isLoadingAction ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle className="font-bold text-red-600">Remove Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove <strong>{selectedMember?.name}</strong> from the team? They will lose access to this organizer dashboard.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="px-6 pb-4">
          <Button onClick={() => setDeleteModalOpen(false)} color="inherit" disabled={isLoadingAction}>Cancel</Button>
          <Button onClick={handleRemoveMember} variant="contained" color="error" disabled={isLoadingAction}>
             {isLoadingAction ? <CircularProgress size={24} color="inherit" /> : "Remove"}
          </Button>
        </DialogActions>
      </Dialog>

      <button className="mt-4 w-full py-2.5 border border-gray-200 dark:border-[#3a1d2e] bg-gray-50 dark:bg-[#1a0c13] text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-[#221019] transition-all">
        Manage Team
      </button>

      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseToast} severity={toast.severity} variant="filled" sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TeamCard;
