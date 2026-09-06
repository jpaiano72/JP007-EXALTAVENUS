ALTER TABLE public.pedidos ADD COLUMN hora_desconhecida boolean NOT NULL DEFAULT false;
UPDATE public.pedidos SET hora_desconhecida = true WHERE hora IS NULL;