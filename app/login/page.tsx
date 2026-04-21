"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import AuthForm from "../components/auth/auth-form"

export default function LoginPage() {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        {/* Logo y Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">InvoiceFlow</h1>
          <p className="text-slate-600">Facturación inteligente para profesionales</p>
        </motion.div>

        {/* Formulario de Autenticación */}
        <motion.div variants={itemVariants}>
          <AuthForm />
        </motion.div>

        {/* Footer Links */}
        <motion.div variants={itemVariants} className="text-center mt-8 space-y-2">
          <p className="text-sm text-slate-600">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Regístrate gratis
            </Link>
          </p>
          <Link 
            href="/" 
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors inline-block"
          >
            Volver al inicio
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
