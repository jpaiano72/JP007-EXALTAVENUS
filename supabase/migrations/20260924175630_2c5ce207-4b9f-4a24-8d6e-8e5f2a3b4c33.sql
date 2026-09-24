ALTER TABLE public.pedidos ADD COLUMN consentimento boolean NOT NULL DEFAULT false;
ALTER TABLE public.pedidos ALTER COLUMN consentimento DROP DEFAULT;
