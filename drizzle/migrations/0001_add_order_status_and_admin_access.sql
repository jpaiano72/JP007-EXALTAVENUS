ALTER TABLE public.pedidos
ADD COLUMN status text NOT NULL DEFAULT 'novo';

ALTER TABLE public.pedidos
ADD CONSTRAINT pedidos_status_valido
CHECK (status IN ('novo', 'contatado', 'relatorio_enviado', 'concluido'));

GRANT SELECT, UPDATE, DELETE ON public.pedidos TO authenticated;
GRANT ALL ON public.pedidos TO service_role;

CREATE POLICY "Administradora pode consultar pedidos"
ON public.pedidos
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Administradora pode atualizar pedidos"
ON public.pedidos
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Administradora pode excluir pedidos"
ON public.pedidos
FOR DELETE
TO authenticated
USING (true);