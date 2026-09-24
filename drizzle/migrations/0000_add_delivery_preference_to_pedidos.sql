ALTER TABLE public.pedidos
ADD COLUMN preferencia_entrega TEXT;

COMMENT ON COLUMN public.pedidos.genero IS 'DEPRECATED: removido do formulário na versão 1.5.3';