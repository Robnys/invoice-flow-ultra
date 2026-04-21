import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { ArrowRight, Zap, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="border-b border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">InvoiceFlow</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Comenzar</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Cobrar más rápido con{" "}
            <span className="text-blue-600">Inteligencia Artificial</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Automatiza el seguimiento de facturas, predice pagos y optimiza tu flujo de cobro. 
            Reduce tus días de cobro en un 60% con IA.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/dashboard">
                Probar Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Ver Demo
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto">
          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Automatización Inteligente</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-slate-600">
                Envía recordatorios automáticos personalizados basados en el comportamiento de pago de cada cliente.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Predicción de Pagos</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-slate-600">
                Anticipa qué facturas se pagarán tarde y toma acción proactiva con análisis predictivo.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Seguridad Garantizada</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-slate-600">
                Tus datos están protegidos con encriptación de nivel bancario y cumplimiento GDPR.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="mt-24 text-center">
          <div className="inline-flex items-center space-x-8 bg-white rounded-full px-8 py-4 shadow-lg border border-slate-200">
            <div className="text-left">
              <div className="text-3xl font-bold text-slate-900">60%</div>
              <div className="text-sm text-slate-600">Reducción en días de cobro</div>
            </div>
            <div className="w-px h-12 bg-slate-200"></div>
            <div className="text-left">
              <div className="text-3xl font-bold text-slate-900">95%</div>
              <div className="text-sm text-slate-600">Precisión de predicción</div>
            </div>
            <div className="w-px h-12 bg-slate-200"></div>
            <div className="text-left">
              <div className="text-3xl font-bold text-slate-900">24/7</div>
              <div className="text-sm text-slate-600">Automatización continua</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
