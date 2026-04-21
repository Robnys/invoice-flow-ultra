"use client"

import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { FileText, Plus, Zap, TrendingUp, Users, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function EmptyState() {
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

  const floatingVariants = {
    floating: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto text-center py-12"
    >
      {/* Icono Principal con Animación */}
      <motion.div
        variants={floatingVariants}
        animate="floating"
        className="mb-8"
      >
        <div className="h-24 w-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
          <FileText className="h-12 w-12 text-white" />
        </div>
      </motion.div>

      {/* Título y Descripción */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Tu libro de facturas está vacío
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-2">
          Comienza a crear facturas profesionales en segundos con nuestro Modo Flash
        </p>
        <p className="text-slate-500 max-w-xl mx-auto">
          Solo describe lo que necesitas facturar y nuestra IA se encargará del resto
        </p>
      </motion.div>

      {/* Botón Principal de Acción */}
      <motion.div variants={itemVariants} className="mb-12">
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="h-5 w-5 mr-2" />
          Crear tu primera factura
        </Button>
      </motion.div>

      {/* Características Destacadas */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
          className="group"
        >
          <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-blue-900 mb-2">Modo Flash</h3>
              <p className="text-blue-700 text-sm">
                Escribe en lenguaje natural y crea facturas al instante
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
          className="group"
        >
          <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="h-12 w-12 bg-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-green-900 mb-2">Análisis Inteligente</h3>
              <p className="text-green-700 text-sm">
                Predicciones de pago y gestión automática de recordatorios
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
          className="group"
        >
          <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="h-12 w-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-purple-900 mb-2">Gestión de Clientes</h3>
              <p className="text-purple-700 text-sm">
                Organiza tu cartera de clientes y su historial de pagos
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Ejemplos Rápidos */}
      <motion.div variants={itemVariants} className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">
          Prueba estos ejemplos con Modo Flash:
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "5000eur a TechCorp por desarrollo web",
            "1500eur a María García por consultoría SEO",
            "800eur a Juan Pérez por diseño de logo",
            "2500eur a StartupX por marketing digital"
          ].map((example, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-4 py-2 rounded-full border border-slate-300 hover:border-blue-300 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
            >
              {example}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Estadísticas Motivacionales */}
      <motion.div 
        variants={itemVariants}
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {[
          { icon: FileText, label: "Facturas Creadas", value: "0", color: "blue" },
          { icon: TrendingUp, label: "Ingresos Totales", value: "0 EUR", color: "green" },
          { icon: Users, label: "Clientes Activos", value: "0", color: "purple" },
          { icon: Clock, label: "Tiempo Ahorrado", value: "0 min", color: "orange" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <div className={`h-12 w-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mx-auto mb-3`}>
              <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
            </div>
            <p className={`text-2xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</p>
            <p className="text-sm text-slate-600">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Mensaje de Bienvenida Final */}
      <motion.div 
        variants={itemVariants}
        className="mt-12 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white"
      >
        <h3 className="text-xl font-bold mb-3">
          ¡Bienvenido a InvoiceFlow! 
        </h3>
        <p className="text-blue-100 max-w-2xl mx-auto">
          Estás a punto de transformar la forma en que gestionas tus facturas. 
          Comienza ahora y experimenta la facturación más rápida e inteligente del mercado.
        </p>
      </motion.div>
    </motion.div>
  )
}
