import React from "react";
import { 
  PersonAddIcon, 
  TicketIcon, 
  FireIcon, 
  GiftIcon 
} from "./ReferralIcons";

interface ActivityIconProps {
  type: string;
}

export const ActivityIcon: React.FC<ActivityIconProps> = ({ type }) => {
  switch (type) {
    case "referral":
      return <PersonAddIcon />;
    case "purchase":
      return <TicketIcon />;
    case "streak":
      return <FireIcon />;
    default:
      return <GiftIcon />;
  }
};
