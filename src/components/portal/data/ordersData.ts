export const myOrders = [
  {
    id: "ORD-2024-001",
    service: "Enterprise Software Development",
    provider: "TechNova Solutions",
    providerLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    orderDate: "2024-11-15",
    deliveryDate: "2025-02-15",
    status: "in_progress",
    amount: "$45,000",
    progress: 65,
    description: "Custom CRM system with integration to existing business processes",
    milestones: [
      { title: "Requirements Analysis", completed: true, date: "2024-11-20" },
      { title: "System Design", completed: true, date: "2024-12-05" },
      { title: "Development Phase 1", completed: false, date: "2024-12-30" },
      { title: "Testing & Deployment", completed: false, date: "2025-02-10" }
    ],
    lastUpdate: "System design completed and approved",
    category: "Technology"
  },
  {
    id: "ORD-2024-002",
    service: "Digital Marketing Campaign",
    provider: "Fatou Diallo",
    providerLogo: "https://images.unsplash.com/photo-1494790108755-2616b012d7c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    orderDate: "2024-12-01",
    deliveryDate: "2024-12-31",
    status: "pending",
    amount: "$7,500",
    progress: 0,
    description: "3-month digital marketing campaign for product launch",
    milestones: [
      { title: "Strategy Development", completed: false, date: "2024-12-05" },
      { title: "Content Creation", completed: false, date: "2024-12-15" },
      { title: "Campaign Launch", completed: false, date: "2024-12-20" },
      { title: "Performance Review", completed: false, date: "2024-12-31" }
    ],
    lastUpdate: "Order confirmed, awaiting project kickoff",
    category: "Marketing"
  },
  {
    id: "ORD-2024-003",
    service: "Organic Vegetables Supply",
    provider: "GreenHarvest Ltd",
    providerLogo: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    orderDate: "2024-11-28",
    deliveryDate: "2024-12-05",
    status: "delivered",
    amount: "$2,300",
    progress: 100,
    description: "Monthly supply of organic vegetables for restaurant chain",
    milestones: [
      { title: "Order Processing", completed: true, date: "2024-11-29" },
      { title: "Harvest & Packaging", completed: true, date: "2024-12-02" },
      { title: "Quality Check", completed: true, date: "2024-12-04" },
      { title: "Delivery", completed: true, date: "2024-12-05" }
    ],
    lastUpdate: "Order delivered successfully, quality confirmed",
    category: "Agriculture"
  }
];

export const sellerOrders = [
  {
    id: "SO-2024-001",
    service: "Business Consulting",
    buyer: "Lagos Tech Hub",
    buyerLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    orderDate: "2024-11-20",
    deliveryDate: "2024-12-20",
    status: "in_progress",
    amount: "$12,000",
    progress: 40,
    description: "Strategic business consulting for expansion into new markets",
    milestones: [
      { title: "Initial Assessment", completed: true, date: "2024-11-25" },
      { title: "Market Analysis", completed: false, date: "2024-12-10" },
      { title: "Strategy Development", completed: false, date: "2024-12-15" },
      { title: "Implementation Plan", completed: false, date: "2024-12-20" }
    ],
    lastUpdate: "Initial assessment completed, market analysis in progress",
    category: "Consulting",
    commission: "$1,200"
  },
  {
    id: "SO-2024-002",
    service: "Agricultural Training Program",
    buyer: "West Africa Farmers Association",
    buyerLogo: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    orderDate: "2024-12-01",
    deliveryDate: "2025-01-31",
    status: "pending",
    amount: "$18,500",
    progress: 0,
    description: "Comprehensive training program on sustainable farming practices",
    milestones: [
      { title: "Curriculum Development", completed: false, date: "2024-12-15" },
      { title: "Material Preparation", completed: false, date: "2025-01-05" },
      { title: "Training Delivery", completed: false, date: "2025-01-25" },
      { title: "Certification", completed: false, date: "2025-01-31" }
    ],
    lastUpdate: "Order received, curriculum development starting soon",
    category: "Training",
    commission: "$1,850"
  },
  {
    id: "SO-2024-003",
    service: "Financial Advisory",
    buyer: "Emerging Ventures Ltd",
    buyerLogo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    orderDate: "2024-10-15",
    deliveryDate: "2024-11-30",
    status: "completed",
    amount: "$8,500",
    progress: 100,
    description: "Financial planning and investment strategy development",
    milestones: [
      { title: "Financial Assessment", completed: true, date: "2024-10-20" },
      { title: "Strategy Development", completed: true, date: "2024-11-05" },
      { title: "Implementation Plan", completed: true, date: "2024-11-20" },
      { title: "Final Report", completed: true, date: "2024-11-30" }
    ],
    lastUpdate: "Project completed successfully, payment received",
    category: "Finance",
    commission: "$850"
  }
];