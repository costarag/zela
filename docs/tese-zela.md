# Tese — Zela

## Problema

Famílias que precisam de cuidado para idosos enfrentam um processo fragmentado, demorado e inseguro:

- Dificuldade para identificar cuidadores realmente confiáveis
- Pouca transparência sobre experiência, disponibilidade e preço
- Alto desgaste emocional e risco de decisão errada
- Falta de acompanhamento após a contratação (não basta encontrar — é preciso manter qualidade)

No Brasil, o envelhecimento populacional acelera a demanda por cuidado domiciliar: são mais de 32 milhões de idosos hoje, com projeção de 70 milhões até 2050. A jornada de contratação ainda é manual, via indicação informal e sem padronização — um mercado de R$12B+ sem plataforma de referência.

## Ideia

Construir a **Zela**, uma plataforma digital premium que conecta famílias a cuidadores de idosos com foco em:

- **Confiança** — perfis qualificados, verificação de antecedentes, avaliações reais
- **Velocidade de match** — filtros e recomendação baseados na necessidade real da família
- **Continuidade de cuidado** — mensagens, entrevistas e acompanhamento do progresso

A proposta central: transformar uma busca estressante em uma decisão segura, guiada e eficiente — o que o mercado imobiliário fez com a compra de imóveis, a Zela faz com o cuidado de idosos.

## Produto

Marketplace SaaS com fluxo completo em três camadas:

**1. Landing** — posicionamento de marca, prova social e conversão com CTA direto ao onboarding.

**2. Onboarding inteligente** — coleta de rotina, necessidades específicas, horários disponíveis e orçamento familiar.

**3. Dashboard operacional**:
- Cuidadores recomendados com filtros avançados (especialidade, disponibilidade, avaliação, distância)
- Mensagens e agendamento de entrevistas
- Painel de progresso do cuidado com indicadores (humor, mobilidade, medicação, sono)
- Assistente IA em pt-BR para orientação prática do dia a dia

**Roadmap de fases**:

| Fase | Foco | Infraestrutura |
|------|------|---------------|
| 1 | Validação de proposta e UX | Dados mock, sem banco |
| 2 | Produto real | Supabase (auth, banco, chat persistente, realtime) |
| 3 | Escala e confiança | Verificação de antecedentes, scoring de qualidade, integrações B2B |

## Modelo de Negócio

Modelo híbrido (recorrência + transação):

**Famílias — Assinaturas:**

| Plano | Preço | Inclui |
|-------|-------|--------|
| Plus | R$149 / mês | Busca ilimitada, mensagens, entrevistas |
| Premium | R$249 / mês | Tudo do Plus + Match Concierge + garantia de reposição |
| Família Plus | R$349 / mês | Multi-idoso, dashboard avançado, relatórios de cuidado |

**Taxa de sucesso na contratação:**

| Perfil Cuidador | Taxa |
|-----------------|------|
| Cuidador Básico | R$299 por contratação confirmada |
| Cuidador Especializado | R$590 por contratação confirmada |
| Cuidador Residencial (live-in) | R$1.290 por contratação confirmada |

**Cuidadores — Plano Pro:**
- Destaque nos resultados de busca
- Analytics de visualizações de perfil
- Maior exposição a famílias Premium

**Monetização futura B2B:**
- Licenciamento para residenciais sênior, operadoras e redes de saúde
- Cobrança por assento/unidade + módulo de operação de cuidado

**Saída estratégica:**

### Opção A — Venda (M&A estratégico)

Alvos: operadoras de saúde, redes hospitalares, plataformas de home care, grupos de assistência familiar com capilaridade nacional.

Tese de aquisição: reduzir CAC, ampliar oferta de cuidado domiciliar e aumentar receita de serviços de cuidado contínuo.

### Opção B — Escala nacional

Meta em 3–5 anos:
- Presença nas principais regiões metropolitanas
- 100k+ famílias cadastradas
- 25k+ cuidadores ativos
- 10k+ contratações/mês processadas via plataforma
- Receita recorrente robusta com margem crescente por serviços premium

A Zela como a infraestrutura digital de confiança para cuidado de idosos no Brasil.
