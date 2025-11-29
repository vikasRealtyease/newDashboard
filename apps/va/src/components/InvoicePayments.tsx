import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { Badge } from '@repo/ui';
import { Button } from '@repo/ui';
import { Input } from '@repo/ui';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui';
import { Download, Plus, Search, Filter, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui';

const invoices = [
  {
    id: 'INV-2024-001',
    client: 'TechCorp Inc.',
    amount: 12500,
    status: 'Paid',
    dueDate: '2025-11-15',
    paidDate: '2025-11-14',
    items: 'AI Marketing Campaign - Phase 1',
  },
  {
    id: 'INV-2024-002',
    client: 'ShopPro Ltd.',
    amount: 18400,
    status: 'Pending',
    dueDate: '2025-11-30',
    paidDate: null,
    items: 'E-commerce Platform Development',
  },
  {
    id: 'INV-2024-003',
    client: 'FinanceFlow',
    amount: 25000,
    status: 'Pending',
    dueDate: '2025-12-05',
    paidDate: null,
    items: 'Mobile App Development - Initial Payment',
  },
  {
    id: 'INV-2024-004',
    client: 'DataViz Co.',
    amount: 8200,
    status: 'Paid',
    dueDate: '2025-11-20',
    paidDate: '2025-11-18',
    items: 'Data Analytics Dashboard',
  },
  {
    id: 'INV-2024-005',
    client: 'MediaHub',
    amount: 15600,
    status: 'Overdue',
    dueDate: '2025-11-10',
    paidDate: null,
    items: 'Content Management System',
  },
  {
    id: 'INV-2024-006',
    client: 'Support Plus',
    amount: 9800,
    status: 'Paid',
    dueDate: '2025-11-12',
    paidDate: '2025-11-11',
    items: 'AI Chatbot Integration',
  },
  {
    id: 'INV-2024-007',
    client: 'TechCorp Inc.',
    amount: 16700,
    status: 'Draft',
    dueDate: '2025-12-15',
    paidDate: null,
    items: 'AI Marketing Campaign - Phase 2',
  },
];

const recentPayments = [
  { id: 1, client: 'TechCorp Inc.', amount: 12500, date: '2025-11-14', method: 'Bank Transfer' },
  { id: 2, client: 'DataViz Co.', amount: 8200, date: '2025-11-18', method: 'Credit Card' },
  { id: 3, client: 'Support Plus', amount: 9800, date: '2025-11-11', method: 'PayPal' },
  { id: 4, client: 'Acme Corp', amount: 22000, date: '2025-11-08', method: 'Bank Transfer' },
  { id: 5, client: 'Global Tech', amount: 14300, date: '2025-11-05', method: 'Credit Card' },
];

export function InvoicePayments() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Overdue': return 'bg-red-100 text-red-700 border-red-200';
      case 'Draft': return 'bg-neutral-100 text-neutral-700 border-neutral-200';
      default: return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  const totalRevenue = invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'Pending').reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input placeholder="Search invoices..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Total Revenue</p>
                <p className="text-2xl font-bold mt-1">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Pending</p>
                <p className="text-2xl font-bold mt-1">${pendingAmount.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Overdue</p>
                <p className="text-2xl font-bold mt-1">${overdueAmount.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Total Invoices</p>
                <p className="text-2xl font-bold mt-1">{invoices.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices and Payments Tabs */}
      <Tabs defaultValue="invoices">
        <TabsList>
          <TabsTrigger value="invoices">All Invoices</TabsTrigger>
          <TabsTrigger value="payments">Recent Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell className="max-w-xs truncate">{invoice.items}</TableCell>
                      <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">{payment.client}</p>
                        <p className="text-sm text-neutral-500">{payment.method} • {payment.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">${payment.amount.toLocaleString()}</p>
                      <p className="text-xs text-neutral-500">Completed</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
