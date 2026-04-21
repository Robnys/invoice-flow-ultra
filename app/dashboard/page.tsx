"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Mail, Phone, AlertCircle, Zap, TrendingUp, Users, DollarSign } from "lucide-react"
import Link from "next/link"
import FlashInput from "@/components/invoice/flash-input"
import EmptyState from "@/components/dashboard/empty-state"

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
  const [showFlashMode, setShowFlashMode] = useState(false)
  const [invoices, setInvoices] = useState(mockInvoices)

  const getStatusBadge = (status: string, daysOverdue: number) => {
    if (status === "overdue") {
      return <Badge variant="destructive">Vencida ({daysOverdue} días)</Badge>
    }
    if (status === "paid") {
      return <Badge variant="default">Pagada</Badge>
    }
    return <Badge variant="secondary">Pendiente</Badge>
  }

  const totalPending = invoices
    .filter(inv => inv.status === "pending")
    .reduce((sum, inv) => sum + inv.amount, 0)

  const totalOverdue = invoices
    .filter(inv => inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.amount, 0)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const handleCreateInvoice = (newInvoice: any) => {
    const newId = `INV-${String(invoices.length + 1).padStart(3, '0')}`
    const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    
    setInvoices([...invoices, {
      ...newInvoice,
      id: newId,
      status: "pending" as const,
      days_overdue: 0,
      due_date: dueDate
    }])
    setShowFlashMode(false)
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Link>
              </Button>
              <motion.h1 
                variants={itemVariants}
                className="text-2xl font-bold text-slate-900"
              >
                Dashboard
              </motion.h1>
            </div>
            <motion.div variants={itemVariants}>
              <Button 
                onClick={() => setShowFlashMode(!showFlashMode)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {showFlashMode ? (
                  <>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver al Dashboard
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Modo Flash
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {showFlashMode ? (
            <motion.div
              key="flash-mode"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <FlashInput />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              {invoices.length === 0 ? (
                <EmptyState />
              ) : (
                <>
                  {/* Métricas principales */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <motion.div variants={itemVariants}>
                      <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-blue-100">
                        <CardHeader>
                          <CardTitle className="text-lg text-blue-900 flex items-center">
                            <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                            Pendientes de Cobro
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-blue-600">
                            ${totalPending.toLocaleString('es-ES')}
                          </div>
                          <p className="text-sm text-blue-700 mt-2">
                            {invoices.filter(inv => inv.status === "pending").length} facturas
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-red-50 to-red-100">
                        <CardHeader>
                          <CardTitle className="text-lg text-red-900 flex items-center">
                            <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                            Vencidas
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-red-600">
                            ${totalOverdue.toLocaleString('es-ES')}
                          </div>
                          <p className="text-sm text-red-700 mt-2">
                            {invoices.filter(inv => inv.status === "overdue").length} facturas
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-purple-50 to-purple-100">
                        <CardHeader>
                          <CardTitle className="text-lg text-purple-900 flex items-center">
                            <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                            Predicciones IA
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-purple-600">
                            {aiPredictions.length}
                          </div>
                          <p className="text-sm text-purple-700 mt-2">
                            Facturas con riesgo detectado
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Contenido principal */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    <motion.div variants={itemVariants}>
                      <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-blue-600" />
                            Facturas Pendientes
                          </CardTitle>
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
                              {invoices.map((invoice) => (
                                <TableRow key={invoice.id} className="hover:bg-slate-50 transition-colors">
                                  <TableCell className="font-medium">{invoice.id}</TableCell>
                                  <TableCell>
                                    <div>
                                      <div className="font-medium">{invoice.client_name}</div>
                                      <div className="text-sm text-slate-500">{invoice.client_email}</div>
                                    </div>
                                  </TableCell>
                                  <TableCell className="font-semibold">
                                    ${invoice.amount.toLocaleString('es-ES')}
                                  </TableCell>
                                  <TableCell>{invoice.due_date}</TableCell>
                                  <TableCell>{getStatusBadge(invoice.status, invoice.days_overdue)}</TableCell>
                                  <TableCell>
                                    <div className="flex space-x-2">
                                      <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300 transition-colors">
                                        <Mail className="h-4 w-4" />
                                      </Button>
                                      <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-300 transition-colors">
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
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="border border-slate-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-md transition-all duration-300"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-slate-900">{prediction.invoice_id}</span>
                                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                    {Math.round(prediction.probability * 100)}% riesgo
                                  </Badge>
                                </div>
                                <p className="text-sm text-slate-600 mb-2">{prediction.prediction}</p>
                                <p className="text-sm text-blue-600 font-medium">
                                  {prediction.recommended_action}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  )
}
