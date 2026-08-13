---
description: >
  Prompt quality framework for all agent requests and outputs.
  Enforces RGOGC: Role, Goal, Output, Guardrails, Context.
applyTo: "**"
---

# RGOGC Prompt Framework

Use this framework for every substantial coding or design task.

## R - Role

Define who the AI is acting as.

- Specify domain seniority and specialization.
- Match role to problem type.

## G - Goal

Define exactly what must be achieved.

- Use explicit action verbs.
- Include measurable scope and acceptance target.

## O - Output

Define deliverable shape and format.

- Specify file targets, structure, language, and detail level.
- Require concise summaries plus evidence sections when appropriate.

## G - Guardrails

Define constraints and must-not rules.

- Disallow insecure or out-of-scope technologies when needed.
- Include quality, safety, accessibility, and compatibility constraints.

## C - Context

Provide project and audience background.

- Include environment, existing architecture, and intended audience.
- Include purpose: production, prototype, migration, or training.

## Minimum Task Contract

Before implementation, agent should be able to answer:

1. Role: who am I acting as?
2. Goal: what exact outcome is required?
3. Output: what concrete artifact should be produced?
4. Guardrails: what must be avoided?
5. Context: what project facts change the solution?

## Required Reporting

For substantial tasks, completion summary should include a short RGOGC trace:

- Role used
- Goal completed
- Output produced
- Guardrails enforced
- Context assumptions
