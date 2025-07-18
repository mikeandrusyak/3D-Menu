import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  const { restaurant_id } = req.query;
  if (!restaurant_id) {
    return res.status(400).json({ error: 'Missing restaurant_id' });
  }

  // 1. Отримати всі страви ресторану
  const { data: dishes, error: dishesError } = await supabase
    .from('dishes')
    .select('id')
    .eq('restaurant_id', restaurant_id);

  if (dishesError) {
    return res.status(500).json({ error: dishesError.message });
  }
  if (!dishes || dishes.length === 0) {
    return res.status(200).json([]);
  }

  const dishIds = dishes.map(d => d.id);

  // 2. Отримати всі унікальні filter_id для цих страв
  const { data: dishFilters, error: dishFiltersError } = await supabase
    .from('dish_filters')
    .select('filter_id')
    .in('dish_id', dishIds);

  if (dishFiltersError) {
    return res.status(500).json({ error: dishFiltersError.message });
  }
  const uniqueFilterIds = [...new Set(dishFilters.map(df => df.filter_id))];
  if (uniqueFilterIds.length === 0) {
    return res.status(200).json([]);
  }

  // 3. Отримати назви фільтрів
  const { data: filters, error: filtersError } = await supabase
    .from('filters')
    .select('id, name')
    .in('id', uniqueFilterIds);

  if (filtersError) {
    return res.status(500).json({ error: filtersError.message });
  }

  res.status(200).json(filters);
} 