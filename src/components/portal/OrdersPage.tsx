// import { useState } from "react";
// import { Button } from "../ui/button";
// import { Card, CardContent } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { Input } from "../ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Progress } from "../ui/progress";
// import { myOrders, sellerOrders } from "./data/ordersData";
// import { getStatusColor, getStatusIcon } from "./utils/orderUtils";
// import { 
//   Search, 
//   Filter, 
//   Package, 
//   Truck, 
//   DollarSign, 
//   Calendar, 
//   Eye, 
//   MessageSquare, 
//   Download,
//   CheckCircle,
//   RefreshCw,
//   FileText
// } from "lucide-react";

// export function OrdersPage() {
//   const [activeTab, setActiveTab] = useState("my-orders");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [categoryFilter, setCategoryFilter] = useState("all");

//   const currentOrders = activeTab === "my-orders" ? myOrders : sellerOrders;
  
//   const filteredOrders = currentOrders.filter(order => {
//     const matchesSearch = order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          (activeTab === "my-orders" ? order.provider : order.buyer).toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = statusFilter === "all" || order.status === statusFilter;
//     const matchesCategory = categoryFilter === "all" || order.category === categoryFilter;
    
//     return matchesSearch && matchesStatus && matchesCategory;
//   });

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-semibold text-[#333333] mb-2">Orders Management</h1>
//           <p className="text-[#6B7280]">Track and manage your orders and sales on WABLP</p>
//         </div>
//         <div className="flex space-x-2">
//           <Button variant="outline">
//             <Download className="w-4 h-4 mr-2" />
//             Export Orders
//           </Button>
//           <Button className="bg-[#004C97] text-white hover:bg-[#003a75]">
//             <FileText className="w-4 h-4 mr-2" />
//             Generate Report
//           </Button>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                 <Package className="w-6 h-6 text-blue-600" />
//               </div>
//               <div>
//                 <div className="text-2xl font-semibold text-[#333333]">12</div>
//                 <div className="text-sm text-[#6B7280]">Total Orders</div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                 <CheckCircle className="w-6 h-6 text-green-600" />
//               </div>
//               <div>
//                 <div className="text-2xl font-semibold text-[#333333]">8</div>
//                 <div className="text-sm text-[#6B7280]">Completed</div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
//                 <RefreshCw className="w-6 h-6 text-orange-600" />
//               </div>
//               <div>
//                 <div className="text-2xl font-semibold text-[#333333]">3</div>
//                 <div className="text-sm text-[#6B7280]">In Progress</div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-[#D4AF37] bg-opacity-20 rounded-lg flex items-center justify-center">
//                 <DollarSign className="w-6 h-6 text-[#D4AF37]" />
//               </div>
//               <div>
//                 <div className="text-2xl font-semibold text-[#333333]">$89.5K</div>
//                 <div className="text-sm text-[#6B7280]">Total Value</div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Search and Filters */}
//       <Card>
//         <CardContent className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-4 h-4" />
//               <Input
//                 placeholder="Search orders..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 focus:ring-2 focus:ring-[#004C97]"
//               />
//             </div>
            
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="All Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="pending">Pending</SelectItem>
//                 <SelectItem value="in_progress">In Progress</SelectItem>
//                 <SelectItem value="delivered">Delivered</SelectItem>
//                 <SelectItem value="completed">Completed</SelectItem>
//                 <SelectItem value="cancelled">Cancelled</SelectItem>
//               </SelectContent>
//             </Select>
            
//             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="All Categories" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 <SelectItem value="Technology">Technology</SelectItem>
//                 <SelectItem value="Marketing">Marketing</SelectItem>
//                 <SelectItem value="Agriculture">Agriculture</SelectItem>
//                 <SelectItem value="Consulting">Consulting</SelectItem>
//                 <SelectItem value="Training">Training</SelectItem>
//                 <SelectItem value="Finance">Finance</SelectItem>
//               </SelectContent>
//             </Select>
            
//             <Button variant="outline" className="border-[#004C97] text-[#004C97] hover:bg-[#004C97] hover:text-white">
//               <Filter className="w-4 h-4 mr-2" />
//               More Filters
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Tabs */}
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="my-orders" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
//             <Package className="w-4 h-4 mr-2" />
//             My Orders ({myOrders.length})
//           </TabsTrigger>
//           <TabsTrigger value="seller-orders" className="data-[state=active]:bg-[#004C97] data-[state=active]:text-white">
//             <Truck className="w-4 h-4 mr-2" />
//             Seller Orders ({sellerOrders.length})
//           </TabsTrigger>
//         </TabsList>

//         {/* Orders Content */}
//         <TabsContent value={activeTab} className="space-y-6">
//           <div className="space-y-6">
//             {filteredOrders.map((order) => {
//               const StatusIcon = getStatusIcon(order.status);
//               return (
//                 <Card key={order.id} className="hover:shadow-lg transition-shadow duration-300">
//                   <CardContent className="p-6">
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex items-start space-x-4">
//                         <Avatar className="w-12 h-12">
//                           <AvatarImage src={activeTab === "my-orders" ? order.providerLogo : order.buyerLogo} />
//                           <AvatarFallback className="bg-[#004C97] text-white">
//                             {(activeTab === "my-orders" ? order.provider : order.buyer).slice(0, 2)}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <div className="flex items-center space-x-2 mb-1">
//                             <h3 className="text-lg font-semibold text-[#333333] hover:text-[#004C97] cursor-pointer">
//                               {order.service}
//                             </h3>
//                             <Badge className={getStatusColor(order.status)}>
//                               <StatusIcon className="w-3 h-3 mr-1" />
//                               {order.status.replace('_', ' ')}
//                             </Badge>
//                           </div>
//                           <p className="text-sm text-[#6B7280] mb-1">
//                             Order #{order.id} • {activeTab === "my-orders" ? `Provider: ${order.provider}` : `Buyer: ${order.buyer}`}
//                           </p>
//                           <Badge variant="outline" className="text-xs">
//                             {order.category}
//                           </Badge>
//                         </div>
//                       </div>
                      
//                       <div className="text-right">
//                         <div className="text-xl font-semibold text-[#333333]">{order.amount}</div>
//                         <div className="text-xs text-[#6B7280]">{activeTab === "my-orders" ? "Total Amount" : "Order Value"}</div>
//                         {activeTab === "seller-orders" && order.commission && (
//                           <>
//                             <div className="text-sm font-medium text-[#D4AF37] mt-1">{order.commission}</div>
//                             <div className="text-xs text-[#6B7280]">Your Commission</div>
//                           </>
//                         )}
//                       </div>
//                     </div>
                    
//                     <p className="text-[#6B7280] text-sm mb-4">
//                       {order.description}
//                     </p>
                    
//                     <div className="grid grid-cols-2 gap-6 mb-4">
//                       <div>
//                         <div className="text-sm text-[#6B7280] mb-1">Order Date</div>
//                         <div className="flex items-center text-sm">
//                           <Calendar className="w-4 h-4 mr-1" />
//                           {new Date(order.orderDate).toLocaleDateString()}
//                         </div>
//                       </div>
//                       <div>
//                         <div className="text-sm text-[#6B7280] mb-1">Expected Delivery</div>
//                         <div className="flex items-center text-sm">
//                           <Truck className="w-4 h-4 mr-1" />
//                           {new Date(order.deliveryDate).toLocaleDateString()}
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="mb-4">
//                       <div className="flex items-center justify-between text-sm mb-2">
//                         <span className="text-[#6B7280]">Progress</span>
//                         <span className="text-[#333333] font-medium">{order.progress}%</span>
//                       </div>
//                       <Progress value={order.progress} className="h-2" />
//                     </div>
                    
//                     <div className="mb-4">
//                       <h4 className="text-sm font-medium text-[#333333] mb-2">Milestones:</h4>
//                       <div className="grid grid-cols-2 gap-2">
//                         {order.milestones.map((milestone, index) => (
//                           <div key={index} className="flex items-center space-x-2">
//                             <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
//                               milestone.completed ? 'bg-green-500' : 'bg-gray-300'
//                             }`}>
//                               {milestone.completed && <CheckCircle className="w-3 h-3 text-white" />}
//                             </div>
//                             <span className={`text-xs ${
//                               milestone.completed ? 'text-[#333333]' : 'text-[#6B7280]'
//                             }`}>
//                               {milestone.title}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                       <div className="text-sm text-[#6B7280]">
//                         Last update: {order.lastUpdate}
//                       </div>
//                       <div className="flex space-x-2">
//                         <Button variant="outline" size="sm">
//                           <Eye className="w-3 h-3 mr-1" />
//                           View Details
//                         </Button>
//                         <Button variant="outline" size="sm">
//                           <MessageSquare className="w-3 h-3 mr-1" />
//                           Message
//                         </Button>
//                         <Button size="sm" className="bg-[#004C97] text-white hover:bg-[#003a75]">
//                           <Download className="w-3 h-3 mr-1" />
//                           Invoice
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }


"Hello "