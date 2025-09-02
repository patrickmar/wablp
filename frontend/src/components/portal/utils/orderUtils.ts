import { 
  Clock, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertCircle 
} from "lucide-react";

export const getStatusColor = (status: string) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-700",
    in_progress: "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    on_hold: "bg-gray-100 text-gray-700"
  };
  return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-700";
};

export const getStatusIcon = (status: string) => {
  const icons = {
    pending: Clock,
    in_progress: RefreshCw,
    delivered: CheckCircle,
    completed: CheckCircle,
    cancelled: XCircle,
    on_hold: AlertCircle
  };
  const Icon = icons[status as keyof typeof icons] || Clock;
  return Icon;
};