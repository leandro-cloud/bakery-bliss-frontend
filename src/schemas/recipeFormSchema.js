import { z } from 'zod'

const ingredientSchema = z.object({
  ingredientName: z.string().min(1, 'El ingrediente es requerido').refine(value => value.trim() !== '', { message: 'El ingrediente es requerido' }),
  quantity: z.string().min(1, 'La cantidad es requerida').refine(value => value.trim() !== '', { message: 'La cantidad es requerida'})
})

export const recipeSchema = z.object({
  title: z.string().min(1, 'El título es requerido').refine(value => value.trim() !== '', { message: 'El título no puede ser solo espacios' }),
  ingredients: z.array(ingredientSchema).min(2, 'Debes agregar al menos dos ingredientes'),
  instructions: z.array(z.string().min(1, 'Las instrucciones no pueden estar vacias').refine(value => value.trim() !== '', { message: 'La instruccion no puede ser solo espacios' })).min(1, 'Debes agregar al menos una instrucción'),
  prepTime: z.string(),
  quantity: z.string(),
  category: z.array(z.string()),
  difficulty: z.string(),
  image: z.any()
})