#!/bin/bash
# =============================================================
# Portfolio Setup Script
# Run this from the Portfolio directory: bash setup.sh
# =============================================================

set -e

echo "🚀 Setting up Akshat Kumar Mishra Portfolio..."

# 1. Enable Corepack & set Yarn version
echo "📦 Enabling Corepack and preparing Yarn..."
corepack enable
corepack prepare yarn@stable --activate
echo "   Yarn version: $(yarn --version)"

# 2. Install dependencies
echo "📥 Installing dependencies with Yarn..."
yarn install

# 3. Install shadcn UI components
echo "🎨 initializing shadcn/ui & installing components..."
yarn dlx shadcn@latest init
yarn dlx shadcn@latest add --all
echo "✔✔ Initialized shadcn/ui & installed all components"

# 4. Install Framer Motion (animation library)
echo "✨ Installing Framer Motion..."
yarn add framer-motion

echo ""
echo "✅ Setup complete! Run 'yarn dev' to start the dev server."
