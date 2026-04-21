@echo off
echo Iniciando deployment de InvoiceFlow...

echo 1. Añadiendo todos los archivos al staging...
git add .

echo 2. Creando commit con mensaje...
git commit -m "feat: Sistema de facturación Flash y Auth completado

- Modo Flash con parsing inteligente de lenguaje natural
- Sistema de autenticación completo con Supabase
- Dashboard empresarial con animaciones Framer Motion
- Empty State profesional y micro-interacciones
- Schema SQL completo con RLS y triggers
- Variables de entorno configuradas para producción"

echo 3. Subiendo cambios al repositorio remoto...
git push origin main

echo Deployment completado! InvoiceFlow está ahora en producción.
pause
