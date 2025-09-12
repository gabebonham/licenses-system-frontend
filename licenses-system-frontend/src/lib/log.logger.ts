'use server'
import pretty from 'pino-pretty'
import pino from 'pino'
export const logger = async () => pino(pretty())
