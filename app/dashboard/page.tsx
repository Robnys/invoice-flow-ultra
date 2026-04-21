import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Mail, Phone, AlertCircle } from "lucide-react"
import Link from "next/link"

const mockInvoices = [
  {
    id: "INV-001",
    client_name: "Tech Solutions SA",
    client_email: "contact@techsolutions.com",
    amount: 12500,
    due_date: "2024-04-25",
    status: "pending" as const,
    days_overdue: 0
  },
  {
    id: "INV-002", 
    client_name: "Digital Marketing Pro",
    client_email: "info@digitalmarketing.com",
    amount: 8750,
    due_date: "2024-04-20",
    status: "overdue" as const,
    days_overdue: 5
  },
  {
    id: "INV-003",
    client_name: "Consultoría Integral",
    client_email: "facturacion@consultoria.com",
    amount: 15600,
    due_date: "2024-04-28",
    status: "pending" as const,
    days_overdue: 0
  },
  {
    id: "INV-004",
    client_name: "Software Factory Ltd",
    client_email: "billing@softwarefactory.com",
    amount: 23400,
    due_date: "2024-04-15",
    status: "overdue" as const,
    days_overdue: 10
  },
  {
    id: "INV-005",
    client_name: "E-commerce Plus",
    client_email: "admin@ecommerceplus.com",
    amount: 6200,
    due_date: "2024-04-30",
    status: "pending" as const,
    days_overdue: 0
  }
]

const getStatusBadge = (status: string, daysOverdue: number) => {
  if (status === "overdue") {
    return <Badge variant="destructive">Vencida ({daysOverdue} días)</Badge>
  }
  if (status === "paid") {
    return <Badge variant="default">Pagada</Badge>
  }
  return <Badge variant="secondary">Pendiente</Badge>
}

const totalPending = mockInvoices
  .filter(inv => inv.status === "pending")
  .reduce((sum, inv) => sum + inv.amount, 0)

const totalOverdue = mockInvoices
  .filter(inv => inv.status === "overdue")
  .reduce((sum, inv) => sum + inv.amount, 0)

const aiPredictions = [
  {
    invoice_id: "INV-002",
    prediction: "Alto riesgo de impago",
    probability: 0.85,
    recommended_action: "Enviar recordatorio urgente"
  },
  {
    invoice_id: "INV-004", 
    prediction: "Riesgo medio",
    probability: 0.65,
    recommended_action: "Llamada telefónica recomendada"
  }
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Factura
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pendientes de Cobro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                ${totalPending.toLocaleString('es-ES')}
              </div>
              <p className="text-sm text-slate-600 mt-2">
                {mockInvoices.filter(inv => inv.status === "pending").length} facturas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vencidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                ${totalOverdue.toLocaleString('es-ES')}
              </div>
              <p className="text-sm text-slate-600 mt-2">
                {mockInvoices.filter(inv => inv.status === "overdue").length} facturas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Predicciones IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {aiPredictions.length}
              </div>
              <p className="text-sm text-slate-600 mt-2">
                Facturas con riesgo detectado
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Facturas Pendientes</CardTitle>
              <CardDescription>
                Gestiona y da seguimiento a tus facturas por cobrar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Vencimiento</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{invoice.client_name}</div>
                          <div className="text-sm text-slate-500">{invoice.client_email}</div>
                        </div>
                      </TableCell>
                      <TableCell>${invoice.amount.toLocaleString('es-ES')}</TableCell>
                      <TableCell>{invoice.due_date}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status, invoice.days_overdue)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-purple-600" />
                Alertas de IA
              </CardTitle>
              <CardDescription>
                Predicciones inteligentes sobre riesgos de cobro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiPredictions.map((prediction, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{prediction.invoice_id}</span>
                      <Badge variant="outline">
                        {Math.round(prediction.probability * 100)}% riesgo
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{prediction.prediction}</p>
                    <p className="text-sm text-blue-600 font-medium">
                      {prediction.recommended_action}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
