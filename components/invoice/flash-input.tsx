"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Zap, Plus, User, DollarSign, FileText } from 'lucide-react'

interface ParsedInvoice {
  amount: number
  client: string
  description: string
  confidence: number
}

export default function FlashInput() {
  const [input, setInput] = useState('')
  const [parsed, setParsed] = useState<ParsedInvoice | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  // Simulación de parsing inteligente con regex
  const parseInvoiceText = (text: string): ParsedInvoice | null => {
    const patterns = {
      amount: [
        /(\d+(?:\.\d+)?)\s*[eur$USD]/gi,
        /(\d+(?:\.\d+)?)\s*eur/gi,
        /(\d+(?:\.\d+)?)\s*\$/gi,
        /(\d+(?:\.\d+)?)\s*euros?/gi
      ],
      client: [
        /a\s+([A-Z][a-zÀ-ÿ\s]+?)(?:\s+por|\s+para|\s*$)/gi,
        /cliente\s+([A-Z][a-zÀ-ÿ\s]+?)(?:\s+por|\s+para|\s*$)/gi,
        /([A-Z][a-zÀ-ÿ\s]{2,})\s+por/gi
      ],
      description: [
        /por\s+(.+?)(?:\s+\d+|\s*$)/gi,
        /para\s+(.+?)(?:\s+\d+|\s*$)/gi,
        /concepto\s+(.+?)(?:\s+\d+|\s*$)/gi
      ]
    }

    let amount = 0
    let client = ''
    let description = ''
    let confidence = 0

    // Extraer monto
    for (const pattern of patterns.amount) {
      const match = text.match(pattern)
      if (match) {
        amount = parseFloat(match[1])
        confidence += 30
        break
      }
    }

    // Extraer cliente
    for (const pattern of patterns.client) {
      const match = text.match(pattern)
      if (match) {
        client = match[1].trim()
        confidence += 35
        break
      }
    }

    // Extraer descripción
    for (const pattern of patterns.description) {
      const match = text.match(pattern)
      if (match) {
        description = match[1].trim()
        confidence += 35
        break
      }
    }

    // Si no hay descripción, usar el resto del texto
    if (!description && text.length > 10) {
      description = text.replace(/\d+(?:\.\d+)?\s*[eur$USD]/gi, '').trim()
      if (description) confidence += 20
    }

    if (amount > 0 && (client || description)) {
      return {
        amount,
        client: client || 'Cliente sin especificar',
        description: description || 'Servicio profesional',
        confidence: Math.min(confidence, 100)
      }
    }

    return null
  }

  // Generar sugerencias basadas en el input
  const generateSuggestions = (text: string) => {
    if (text.length < 3) {
      setSuggestions([])
      return
    }

    const commonPatterns = [
      "5000eur a Tech Solutions por desarrollo web",
      "1500eur a María García por consultoría",
      "300eur a Juan Pérez por diseño logo",
      "2500eur a Cliente X por marketing digital",
      "800eur a Empresa ABC por mantenimiento"
    ]

    const filtered = commonPatterns.filter(pattern => 
      pattern.toLowerCase().includes(text.toLowerCase())
    ).slice(0, 3)

    setSuggestions(filtered)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.trim()) {
        setIsProcessing(true)
        
        // Simular procesamiento de IA
        setTimeout(() => {
          const result = parseInvoiceText(input)
          setParsed(result)
          setIsProcessing(false)
        }, 300)
      } else {
        setParsed(null)
      }
    }, 500)

    generateSuggestions(input)

    return () => clearTimeout(timer)
  }, [input])

  const handleCreateInvoice = () => {
    if (parsed) {
      console.log('Creando factura:', parsed)
      // Aquí iría la lógica para crear la factura
      setInput('')
      setParsed(null)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto"
    >
      {/* Header del Modo Flash */}
      <motion.div variants={itemVariants} className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full mb-4">
          <Zap className="h-4 w-4" />
          <span className="text-sm font-semibold">Modo Flash</span>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Facturación Instantánea
        </h3>
        <p className="text-slate-600">
          Escribe en lenguaje natural y nuestra IA creará la factura al instante
        </p>
      </motion.div>

      {/* Input Principal */}
      <motion.div variants={itemVariants}>
        <Card className="border-2 border-blue-200 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
          <CardContent className="p-6">
            <div className="relative">
              <div className="absolute left-3 top-3">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ej: 5000eur a Tech Solutions por desarrollo web"
                className="pl-12 pr-4 py-4 text-lg border-blue-300 focus:border-blue-500 focus:ring-blue-200 bg-white/80 backdrop-blur-sm"
              />
              {isProcessing && (
                <div className="absolute right-3 top-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"
                  />
                </div>
              )}
            </div>

            {/* Sugerencias */}
            <AnimatePresence>
              {suggestions.length > 0 && !parsed && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-3 space-y-1"
                >
                  <p className="text-xs text-slate-500 mb-2">Sugerencias:</p>
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-sm text-slate-600 hover:text-blue-600 cursor-pointer p-2 rounded hover:bg-blue-50 transition-colors"
                      onClick={() => setInput(suggestion)}
                    >
                      {suggestion}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Resultado del Parsing */}
      <AnimatePresence>
        {parsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <Card className="border-green-200 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-green-800">
                    Factura Detectada
                  </h4>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {parsed.confidence}% confianza
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Monto</p>
                      <p className="text-xl font-bold text-slate-900">
                        {parsed.amount.toLocaleString('es-ES')} EUR
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <User className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Cliente</p>
                      <p className="text-lg font-semibold text-slate-900">
                        {parsed.client}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Concepto</p>
                      <p className="text-lg font-semibold text-slate-900 truncate">
                        {parsed.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    onClick={handleCreateInvoice}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Factura
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setInput('')
                      setParsed(null)
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ejemplos de uso */}
      <motion.div variants={itemVariants} className="mt-8 text-center">
        <p className="text-sm text-slate-500 mb-3">Prueba con estos ejemplos:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            "1000eur a Juan Pérez por consultoría",
            "2500$ a TechCorp por diseño web",
            "500eur a María García por logo"
          ].map((example, index) => (
            <button
              key={index}
              onClick={() => setInput(example)}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
